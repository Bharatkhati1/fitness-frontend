import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";

const Careers = () => {
  const [formData, setFormData] = useState({
    title: "",
    employmentType: "",
    WorkPreference: "",
    description: "",
  });
  const [careers, setCareers] = useState([]);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const selectedIdref = useRef(null);
  const [selectedId, setSelectedId] = useState("")

  const fetchCareers = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_careers);
      setCareers(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch careers");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title, employmentType, WorkPreference, description } = formData;
    if (!title || !employmentType || !WorkPreference || !description) {
      toast.warning("All fields are required.");
      return;
    }

    const loadingToast = toast.loading(isEdit ? "Updating..." : "Creating...");

    try {
      const url = isEdit
        ? adminApiRoutes.update_career(selectedCareerId)
        : adminApiRoutes.create_career;

      const method = isEdit ? "put" : "post";
      const res = await adminAxios[method](url, formData);

      toast.update(loadingToast, {
        render: res.data.message || "Success",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchCareers();
      handleCancel();
    } catch (error) {
      toast.update(loadingToast, {
        render: error?.response?.data?.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (career) => {
    setFormData({
      title: career.title,
      employmentType: career.employmentType,
      WorkPreference: career.WorkPreference,
      description: career.description,
    });
    setIsEdit(true);
    setSelectedCareerId(career.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async () => {
    try {
      const idToDelete = selectedIdref.current || selectedId;
      await adminAxios.delete(adminApiRoutes.delete_career(idToDelete));
      toast.success("Deleted successfully");
      fetchCareers();
      setSelectedId("")
    } catch (error) {
      toast.error("Failed to delete career");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setSelectedCareerId(null);
    setSelectedId("")
    setFormData({
      title: "",
      employmentType: "",
      WorkPreference: "",
      description: "",
    });
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">{isEdit ? "Edit Career" : "Create Career"}</h4>
          {isEdit && <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel Edit</button>}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Work Preference</label>
              <select
                name="WorkPreference"
                value={formData.WorkPreference}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="Work From Home">Work From Home</option>
                <option value="Work From Office">Work From Office</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="col-lg-12 mb-3">
              <label className="form-label">Description</label>
              <Ckeditor
                text={formData.description}
                setText={(val) => setFormData((prev) => ({ ...prev, description: val }))}
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? "Update Career" : "Create Career"}
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h4 className="card-title">All Careers</h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="bg-light">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Employment Type</th>
                  <th>Work Preference</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {careers.length > 0 ? (
                  careers.map((career, index) => (
                    <tr key={career.id}>
                      <td>{index + 1}</td>
                      <td>{career.title}</td>
                      <td>{career.employmentType}</td>
                      <td>{career.WorkPreference}</td>
                      <td>{career.description?.replace(/<[^>]+>/g, "").slice(0, 80)}...</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-soft-primary"
                            onClick={() => handleEdit(career)}
                          >
                            <iconify-icon icon="solar:pen-2-broken" />
                          </button>
                          <ConfirmationPopup
                            title="Delete Job Posting"
                            bodyText="Are you sure you want to delete this job posting?"
                            onOk={handleDelete}
                            buttonText={
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                onClick={() =>
                                  {
                                    selectedIdref.current = career.id;
                                    setSelectedId(career.id);
                                    
                                  }
                                }
                              />
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No careers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
