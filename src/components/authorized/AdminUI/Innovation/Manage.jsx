import React, { useState, useRef } from "react";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import { toast } from "react-toastify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import { Placeholder } from "react-bootstrap";

const Manage = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    author: "",
    categoryId: "",
  });
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) data.append("image", image);

    const toastId = toast.loading(
      `${isEdit ? "Updating" : "Creating"} item...`
    );
    try {
      const url = isEdit
        ? adminApiRoutes.update_manage_item(selectedId)
        : adminApiRoutes.create_manage_item;

      const method = isEdit ? "put" : "post";
      const res = await adminAxios[method](url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.update(toastId, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onCancelEdit();
    } catch (error) {
      toast.update(toastId, {
        render: `Failed to ${isEdit ? "update" : "create"} item. ${
          error?.response?.data?.message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const onCancelEdit = () => {
    setFormData({
      title: "",
      shortDescription: "",
      longDescription: "",
      author: "",
      categoryId: "",
    });
    setImage(null);
    setSelectedId(null);
    setIsEdit(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Edit Item" : "Create Item"}
              </h4>
              {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {[
                  { label: "Title", name: "title", Placeholder: "Enter title" },
                  {
                    label: "Author",
                    name: "author",
                    Placeholder: "Enter author name",
                  },
                  {
                    label: "Short Description",
                    name: "shortDescription",
                    Placeholder: "Enter short description",
                  },
                ].map(({ label, name, Placeholder }) => (
                  <div className="col-lg-6" key={name}>
                    <div className="mb-3">
                      <label className="form-label">{label}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={name}
                        placeholder={Placeholder}
                        value={formData[name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ))}

                {/* Image  */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Select Category</label>
                    <select
                      className="form-select"
                      value={formData.categoryId}
                      onChange={(e) =>
                        handleChange("categoryId", e.target.value)
                      }
                    >
                      <option value="">Select category</option>
                      {allCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Long Description</label>
                    <Ckeditor
                      text={formData.longDescription}
                      setText={(text) =>
                        setFormData((prev) => ({
                          ...prev,
                          longDescription: text,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
            {/* Table */}
            <div className="row mt-4">
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
                    {categories.length > 0 ? (
                      categories.map((item, index) => (
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

export default Manage;
