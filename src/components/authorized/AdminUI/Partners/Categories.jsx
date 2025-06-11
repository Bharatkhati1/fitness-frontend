import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import ConfirmationPopup from "../Popups/ConfirmationPopup";
import { Link } from "react-router-dom";

const Categories = () => {
  const [formData, setFormData] = useState({name:"", image:null, isActive:true})
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("")
  const [categories, setcategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const fileInputRef = useRef()
    const selectedIdref = useRef(null)

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_partners_category);
      setcategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.warning("Please enter a name.");
      return;
    }
  
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("isActive", formData.isActive);
    if (formData.image) {
      formPayload.append("image", formData.image);
    }
    const toastId = toast.loading("Submitting...");
    try {
      const url = isEdit
        ? adminApiRoutes.update_sk_category(selectedId)
        : adminApiRoutes.create_sk_category;
  
      const method = isEdit ? adminAxios.put : adminAxios.post;
  
      const response = await method(url, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        fetchAllCategories();
        onCancelEdit();
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        
      } else {
        toast.update(toastId, {
          render: error.response?.data?.message || "Submission failed.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to submit. ${error.response?.data?.message || ""}`);
    }
  };
  

  const deleteCategory = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(adminApiRoutes.delete_sk_category(idToDelete));
      toast.success("Deleted Successfully");
      fetchAllCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedId(null);
    setFormData({name:"", image:null, isActive:true})
  };

  const handleFormDataChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Category` : `Create Category`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            
            <div className="card-body">
              <div className="row">

                {/* Title  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="category-name" className="form-label">
                      Category Title
                    </label>
                    <input
                      type="text"
                      id="category-name"
                      className="form-control"
                      name="name"
                      placeholder="Enter title"
                      value={formData.name}
                      onChange={handleFormDataChange}
                    />
                  </div>
                </div>

                {/* image  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="consultant-image" className="form-label">
                     Category Image {isEdit && `: ${selectedFileName}`}
                    </label>
                    <input
                      id="consultant-image"
                      name="image"
                      type="file"
                      ref={fileInputRef}
                      className="form-control"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      onChange={handleFormDataChange}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <label className="form-label d-block">Status</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        id="consultant-status-active"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={true}
                        checked={formData.isActive == true}
                        onChange={handleFormDataChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="consultant-status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="consultant-status-inactive"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={false}
                        checked={formData.isActive == false}
                        onChange={handleFormDataChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="consultant-status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEdit ? `Update Changes` : `Save Change`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Categories</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((item, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>
                            <Link to={item.image_url} target="_blank">
                              <img
                                src={item.image_url}
                                crossorigin="anonymous"
                                alt="Consultant"
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "contain",
                                  border: "1px solid #ccc",
                                }}
                                onError={() =>
                                  console.error("Image load failed")
                                }
                              />
                            </Link>
                          </td>
                          <td>{item?.name}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.isActive == "1" ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {item.isActive == "1" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button
                                class="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setIsEdit(true);
                                  setSelectedId(item.id);
                                  setFormData({
                                    name:item.name,
                                    image:null,
                                    isActive:item.isActive,
                                  })
                                  setSelectedFileName(item.image)
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this Category ?"
                                title="Delete Category"
                                onOk={() => deleteCategory()}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() =>
                                      (selectedIdref.current = item.id)
                                    }
                                  ></iconify-icon>
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No categories found.
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

export default Categories;
