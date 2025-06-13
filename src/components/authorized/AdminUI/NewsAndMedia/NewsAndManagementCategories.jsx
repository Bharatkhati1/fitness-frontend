import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const NewsAndMediaManagementCategories = () => {
  const [formData, setFormData] = useState({ name: "", isActive: 1 });
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filterCategories,setFilterCategories] = useState([])
  const selectedIdRef = useRef();

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_master_category("news-media"));
      setCategories(res.data.data);
      setFilterCategories(res.data.data)
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(error.response?.data?.message || "Fetch error");
    }
  };

  const handleSubmit = async () => {
    try {
      const body = {
        name: formData.name,
        isActive: formData.isActive,
        slug:"news-media"
      };

      const url = isEdit
        ? adminApiRoutes.update_master_category(selectedId)
        : adminApiRoutes.create_master_category;

      const response = isEdit
        ? await adminAxios.put(url, body)
        : await adminAxios.post(url, body);

      if (response.status === 200) {
        fetchAllCategories();
        onCancelEdit();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        `Failed to ${
          isEdit ? "update" : "create"
        } category. ${error.response?.data?.message || ""}`
      );
    }
  };

  const deleteCategory = async () => {
    try {
      const idToDelete = selectedIdRef.current;
      await adminAxios.delete(adminApiRoutes.delete_category(idToDelete));
      toast.success("Deleted Successfully");
      fetchAllCategories();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedId(null);
    setFormData({ name: "", isActive: 1 });
  };

  const handleSearch = (search) => {
    if (search.length > 0) {
      const filterValue = categories.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterCategories(filterValue);
    } else {
      setFilterCategories(categories);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">
                {isEdit ? "Edit Category" : "Create Category"}
              </h4>
              {isEdit && (
                <button className="btn btn-sm btn-danger" onClick={onCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="card-body">
              <div className="row">
                {/* Category Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="category-name" className="form-label">
                      Category Title
                    </label>
                    <input
                      type="text"
                      id="category-name"
                      className="form-control"
                      placeholder="Enter category title"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Category Status */}
                <div className="col-lg-6">
                  <p>Category Status</p>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category-status"
                        value={1}
                        checked={formData.isActive === 1}
                        onChange={() =>
                          setFormData({ ...formData, isActive: 1 })
                        }
                        id="status-active"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category-status"
                        value={0}
                        checked={formData.isActive === 0}
                        onChange={() =>
                          setFormData({ ...formData, isActive: 0 })
                        }
                        id="status-inactive"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEdit ? "Update Category" : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Categories Table */}
      <div className="row mt-4">
      <div className="d-flex justify-content-end mb-3">
          <input
            className="w-50" 
            placeholder="Search here"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginLeft: "20px" }}
          />
        </div>
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All News/Media Categories</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterCategories.length > 0 ? (
                      filterCategories.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.isActive == "1"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {item.isActive == "1" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedId(item.id);
                                  setFormData({
                                    name: item.name,
                                    isActive: Number(item.isActive),
                                  });
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this category?"
                                title="Delete Category"
                                onOk={deleteCategory}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() =>
                                      (selectedIdRef.current = item.id)
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
                        <td colSpan="4" className="text-center">
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

export default NewsAndMediaManagementCategories;
