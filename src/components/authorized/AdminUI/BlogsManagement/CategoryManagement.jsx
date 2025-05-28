import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const CategoryManagement = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setcategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_categories);
      setcategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch blog categories:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    const body ={name:"", isActive: true};
    body.name = name;
    body.isActive = status;

    try {
      let url = isEdit
        ? adminApiRoutes.update_category(selectedId)
        : adminApiRoutes.create_category;

      let response;
      if (isEdit) {
        response = await adminAxios.put(url, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await adminAxios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      if (response.status == 200) {
        fetchAllCategories();
        onCancelEdit();
        toast.success(response.data.message);
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(
        `Failed to create blog category.${error.response.data.message}`
      );
    }
  };

  const deleteCategory = async () => {
    try {
      await adminAxios.delete(adminApiRoutes.delete_category(selectedId));
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
    setName("");
    setStatus(true);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  console.log(status)
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Blog` : `Create Blog`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            {/* Category title */}
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="category-name" className="form-label">
                      Category title
                    </label>
                    <input
                      type="text"
                      id="category-name"
                      className="form-control"
                      placeholder="Enter title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Status */}
                <div className="col-lg-6">
                  <p>Category Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value={1}
                        checked={status == 1}
                        onChange={() => setStatus(1)}
                        id="status-sactive"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-sactive"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="service-status"
                        value={0}
                        checked={status == 0}
                        onChange={() => setStatus(0)}
                        id="status-sinactive"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-sinactive"
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
                                  setName(item.name);
                                  setStatus(item.isActive);
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
                                    onClick={() => setSelectedId(item.id)}
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

export default CategoryManagement;
