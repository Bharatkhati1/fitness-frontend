import React, { useState, useEffect, useRef } from "react";
import { TimePicker, DatePicker } from "antd";
import dayjs from "dayjs";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import { toast } from "react-toastify";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { Select } from "antd";
const { Option } = Select;

const ConsultantLeaves = () => {
  const [formData, setFormData] = useState({
    consultantId: "",
    date: null,
    startTime: "",
    endTime: "",
    reason: "",
  });
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [allConsultants, setAllConsultants] = useState([]);
  const [allLeaves, setAllLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedIdref = useRef(null);

  const fetchAllConsultants = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_consultants);
      setAllConsultants(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch consultants");
    }
  };

  const fetchAllLeaves = async (selectedConsultant) => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_consultant_leaves(selectedConsultant)
      );
      setAllLeaves(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch leave records");
    }
  };

  const deleteLeave = async (id) => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(
        adminApiRoutes.delete_consultant_leave(idToDelete)
      );
      toast.success("Leave deleted");
      fetchAllLeaves();
    } catch (error) {
      toast.error("Failed to delete leave");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { consultantId, date, startTime, endTime, reason } = formData;

    const payload = {
      consultantId,
      date: date.format("YYYY-MM-DD"),
      startTime: startTime,
      endTime: endTime,
      reason,
    };

    const loadingToastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} leave...`
    );
    setLoading(true);

    try {
      let response;
      if (isEdit) {
        // PUT request to update
        response = await adminAxios.put(
          adminApiRoutes.update_consultant_leave(selectedIdref.current),
          payload
        );
      } else {
        // POST request to create
        response = await adminAxios.post(
          adminApiRoutes.create_consultant_leave,
          payload
        );
      }

      if (response.status === 200) {
        toast.update(loadingToastId, {
          render:
            response.data.message ||
            `${isEdit ? "Updated" : "Created"} successfully`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchAllLeaves();
        onCancelEdit();
      } else {
        toast.update(loadingToastId, {
          render: response.data.message || "Operation failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: `Failed to ${isEdit ? "update" : "create"} leave. ${
          error?.response?.data?.message || error.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "-";

    const pad = (n) => (n < 10 ? "0" + n : n);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    selectedIdref.current = null;
    setFormData({
      consultantId: "",
      date: null,
      startTime: "",
      endTime: "",
      reason: "",
    });
  };

  useEffect(() => {
    fetchAllConsultants();
    fetchAllLeaves();
  }, []);

  useEffect(() => {
    fetchAllLeaves(selectedConsultant);
  }, [selectedConsultant]);
  return (
    <>
      {/* Form Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Update Leave" : "Add Leave"}
              </h4>
              {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Consultant Dropdown */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Consultant</label>
                  <Select
                    value={formData.consultantId || undefined}
                    onChange={(val) => handleChange("consultantId", val)}
                    placeholder="Select Consultant"
                    className="w-100"
                    options={allConsultants.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    size="large"
                  />
                </div>

                {/* Date Picker */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Date</label>
                  <DatePicker
                    className="w-100"
                    value={formData.date}
                    onChange={(date) => handleChange("date", date)}
                    format="YYYY-MM-DD"
                    size="large"
                  />
                </div>

                {/* Start Time */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Start Time</label>
                  <TimePicker
                    className="w-100"
                    format="HH:mm"
                    value={
                      formData.startTime
                        ? dayjs(formData.startTime, "HH:mm:ss")
                        : null
                    }
                    onChange={(time) =>
                      handleChange(
                        "startTime",
                        time ? time.format("HH:mm:ss") : ""
                      )
                    }
                    minuteStep={15}
                    size="large"
                  />
                </div>

                {/* End Time */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">End Time</label>
                  <TimePicker
                    className="w-100"
                    format="HH:mm"
                    value={
                      formData.endTime
                        ? dayjs(formData.endTime, "HH:mm:ss")
                        : null
                    }
                    onChange={(time) =>
                      handleChange(
                        "endTime",
                        time ? time.format("HH:mm:ss") : ""
                      )
                    }
                    minuteStep={15}
                    size="large"
                  />
                </div>

                {/* Reason */}
                <div className="col-12 mb-3">
                  <label className="form-label">Reason (optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.reason}
                    onChange={(e) => handleChange("reason", e.target.value)}
                    placeholder="Enter leave reason..."
                  />
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : isEdit ? "Update Leave" : "Save Leave"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row mt-4">
        <p>Select consultant to filter:</p>
        <div className="mb-3">
          <Select
            placeholder="Select Consultant"
            style={{ width: 300 }}
            allowClear
            onChange={(value) => {
              setSelectedConsultant(value); // state to track selected consultant
              fetchLeavesByConsultant(value);
            }}
            value={selectedConsultant}
          >
            {allConsultants.map((consultant) => (
              <Option key={consultant.id} value={consultant.id}>
                {consultant.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Leaves</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Consultant</th>
                      <th>email</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLeaves.length ? (
                      allLeaves.map((leave, index) => (
                        <tr key={leave.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span>{leave.Consultant?.name || "N/A"}</span>
                            </div>
                          </td>
                          <td>{leave.Consultant?.email || "-"}</td>
                          <td>
                            {leave.leaveStart
                              ? formatDateTime(leave.leaveStart)
                              : "-"}
                          </td>
                          <td>
                            {leave.leaveEnd
                              ? formatDateTime(leave.leaveEnd)
                              : "-"}
                          </td>
                          <td>
                            {new Date(leave.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  selectedIdref.current = leave.id;

                                  const [leaveDate, leaveStartTime] =
                                    leave.leaveStart?.split(" ") || [];
                                  const [, leaveEndTime] =
                                    leave.leaveEnd?.split(" ") || [];

                                  setFormData({
                                    consultantId: leave.consultantId,
                                    date: leaveDate
                                      ? dayjs(leaveDate, "YYYY-MM-DD")
                                      : null,
                                    startTime: leaveStartTime || "",
                                    endTime: leaveEndTime || "",
                                    reason: leave.reason || "",
                                  });
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                title="Delete Leave"
                                bodyText="Are you sure you want to delete this leave?"
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="fs-18"
                                    onClick={() =>
                                      (selectedIdref.current = leave.id)
                                    }
                                  />
                                }
                                onOk={deleteLeave}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No leave records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultantLeaves;
