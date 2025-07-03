import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const defaultAvailability = {
  Sunday: { available: false, startTime: "", endTime: "" },
  Monday: { available: false, startTime: "", endTime: "" },
  Tuesday: { available: false, startTime: "", endTime: "" },
  Wednesday: { available: false, startTime: "", endTime: "" },
  Thursday: { available: false, startTime: "", endTime: "" },
  Friday: { available: false, startTime: "", endTime: "" },
  Saturday: { available: false, startTime: "", endTime: "" },
};

const AvailibilityModal = ({
  isModalOpen,
  setIsModalOpen,
  consultant,
  fetchAllConsultants,
}) => {
  const [availability, setAvailability] = useState(defaultAvailability);

  useEffect(() => {
    if (consultant && consultant.ConsultantAvailabilities) {
      const updatedAvailability = { ...defaultAvailability };

      consultant.ConsultantAvailabilities.forEach((entry) => {
        updatedAvailability[entry.day] = {
          available: true,
          startTime: entry.startTime,
          endTime: entry.endTime,
        };
      });

      setAvailability(updatedAvailability);
    }
  }, [consultant, isModalOpen]);

  const handleToggle = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available,
        ...(prev[day].available ? { startTime: "", endTime: "" } : {}),
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleOk = async () => {
    const availabilityPayload = [];

    for (const [day, data] of Object.entries(availability)) {
      if (data.available) {
        const { startTime, endTime } = data;

        if (!startTime || !endTime) {
          toast.error(`${day}: Start time and End time are required.`);
          return;
        }

        if (startTime >= endTime) {
          toast.error(`${day}: Start time must be less than End time.`);
          return;
        }

        availabilityPayload.push({
          consultantId: consultant.id,
          day,
          startTime,
          endTime,
        });
      }
    }

    try {
      await adminAxios.put(adminApiRoutes.update_availibility(consultant.id), {
        availability: availabilityPayload,
      });
      fetchAllConsultants();
      toast.success("Availability updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Server Error!");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Weekly Availability"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <div className="col-lg-12">
        <div className="mb-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Day</th>
                <th>Available</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(availability).map((day) => {
                const { available, startTime, endTime } = availability[day];
                const isInvalidTime =
                  available && startTime && endTime && startTime >= endTime;
                const isMissingTime = available && (!startTime || !endTime);

                return (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={available}
                        onChange={() => handleToggle(day)}
                      />
                    </td>
                    <td>
                      {available && (
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) =>
                            handleTimeChange(day, "startTime", e.target.value)
                          }
                          className={`form-control ${
                            isMissingTime && !startTime ? "is-invalid" : ""
                          }`}
                        />
                      )}
                    </td>
                    <td>
                      {available && (
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) =>
                            handleTimeChange(day, "endTime", e.target.value)
                          }
                          className={`form-control ${
                            isMissingTime && !endTime
                              ? "is-invalid"
                              : isInvalidTime
                              ? "is-invalid"
                              : ""
                          }`}
                          min={startTime || undefined}
                          disabled={!startTime}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default AvailibilityModal;
