import React, { useState, useEffect } from 'react';
import adminApiRoutes from '../../../../utils/Api/Routes/adminApiRoutes';
import adminAxios from '../../../../utils/Api/adminAxios';
import { toast } from 'react-toastify';

const Header = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    const payload = new FormData();

    // Append all regular fields
    Object.entries(formData).forEach(([key, val]) => {
      if (key !== "optional_image" && val !== null && val !== undefined) {
        payload.append(key, val);
      }
    });

    // optionally send IDs of deleted images (if needed on backend)
    const loadingToastId = toast.loading("Updating header...");
    try {
      const url = adminApiRoutes.update_policy(formData.id);
      const method = adminAxios.put;

      const response = await method(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchPPDetails();
      toast.update(loadingToastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.update(loadingToastId, {
        render: `Failed to submit: ${error.response?.data?.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };


  const fetchPPDetails = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_policy_details("event")
      );
      setFormData((prev) => ({
        ...prev,
        ...res.data.data,
      }));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchPPDetails();
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Event Header Section</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Header
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
