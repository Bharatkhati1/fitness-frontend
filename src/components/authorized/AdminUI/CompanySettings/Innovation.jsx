import React, { useState, useEffect } from "react";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EditModal from "./Modals/EditModal";

const Innovation = () => {
  const [innovationSliders, setinnovationSliders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);

  const fetchAllSliders = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_sliders("innovation-page")
      );
      setinnovationSliders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      toast.error(error.response?.data?.message || "Error fetching sliders");
    }
  };

  useEffect(() => {
    fetchAllSliders();
  }, []);

  const handleEditClick = (slider) => {
    setSelectedSlider(slider);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedSlider(null);
  };

  const handleModalUpdate = async (updatedData) => {
    // You can send the updated data to backend here
    const formData = new FormData();
    formData.append("name", "name");
    formData.append("heading", updatedData.heading);
    formData.append("subHeading", "sh");
    formData.append("isActive", true);
    formData.append("slug", "innovation-page");
    updatedData.image && formData.append("slider_image", updatedData.image);

    try {
      let url = adminApiRoutes.update_slider(updatedData.id);
      let response;

      response = await adminAxios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
      fetchAllSliders();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create slider.${error.response.data.message}`);
    }
    setIsModalOpen(false);
    setSelectedSlider(null);
  };

  const handleSetPrimary = async (id) => {
    try {
      await adminAxios.put(adminApiRoutes.set_primary_slider(id));
      fetchAllSliders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <EditModal
        isOpen={isModalOpen}
        onCancel={handleModalCancel}
        onUpdate={handleModalUpdate}
        initialData={selectedSlider}
      />
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Images</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Heading</th>
                      <th>Set Primary</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {innovationSliders.length > 0 ? (
                      innovationSliders.map((slider, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={slider.image_url}>
                              <img
                                crossOrigin="anonymous"
                                src={slider.image_url}
                                alt="Slider"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                  border: "1px solid #eee",
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </Link>
                          </td>
                          <td>{slider.heading}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={slider.isPrimary || false}
                              onChange={() => handleSetPrimary(slider.id)}
                            />
                          </td>

                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => handleEditClick(slider)}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No sliders found.
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

export default Innovation;
