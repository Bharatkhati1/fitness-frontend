import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Select } from "antd";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote.jsx";

const Recepies = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    recipe: null,
    image: null,
    type: null,
    categoryId: null,
    tagId: null,
    isActive: true,
  });

  const [allReceipes, setAllReceipes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedReciepeID, setSelectedReciepeID] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedPdfName, setSelectedPdfname] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const selectedIdref = useRef(null);

  const fetchAllReciepe = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_recipies);
      setAllReceipes(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_sk_categories);
      setAllCategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      // Check for PDF file if the input name is "recipe"
      if (name === "recipe") {
        if (file.type !== "application/pdf") {
          e.target.value = "";
          return;
        }
      }

      setFormData((prev) => ({ ...prev, [name]: file }));
      setSelectedFileName(file.name || "");
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchAllTags = async () => {
    try {
      const res = await adminAxios.get(
        adminApiRoutes.get_master_category("tags")
      );
      setTags(res.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(error.response?.data?.message || "Fetch error");
    }
  };

  const handleSubmit = async () => {
    if (!formData.image && !isEdit) {
      toast.warning("Please select an image.");
      return;
    }

    setLoading(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== undefined) payload.append(key, val);
    });

    try {
      const toastId = toast.loading("Submitting...");
      const url = isEdit
        ? adminApiRoutes.update_recipe(selectedReciepeID)
        : adminApiRoutes.create_recipe;
      const method = isEdit ? adminAxios.put : adminAxios.post;

      const response = await method(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchAllReciepe();
      onCancelEdit();
    } catch (error) {
      console.log(error);
      toast.error(`Failed to submit: ${error.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteReceipe = async () => {
    try {
      const idToDelete = selectedIdref.current;
      await adminAxios.delete(adminApiRoutes.delete_recipe(idToDelete));
      toast.success("Deleted successfully");
      fetchAllReciepe();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedReciepeID(null);
    setSelectedFileName("");
    setFormData({
      name: "",
      description: "",
      recipe: "",
      image: null,
      isActive: true,
      categoryId: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAllReciepe();
    fetchAllCategories();
    fetchAllTags();
  }, []);
  return (
    <>
      {/* Form Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit ? "editing" : ""}`}>
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">
                {isEdit ? "Edit Recepie" : "Add Recepie"}
              </h4>
              {isEdit && <button onClick={onCancelEdit}>Cancel Edit</button>}
            </div>
            <div className="card-body">
              <div className="row">
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Description", name: "description", type: "text" },
                ].map(({ label, name, type }) => (
                  <div className="col-lg-4" key={name}>
                    <div className="mb-3">
                      <label htmlFor={`receipe-${name}`} className="form-label">
                        {label}
                      </label>
                      <input
                        id={`receipe-${name}`}
                        name={name}
                        type={type}
                        className="form-control"
                        placeholder={`Enter ${label.toLowerCase()}`}
                        value={formData[name]}
                        onChange={handleFormDataChange}
                      />
                    </div>
                  </div>
                ))}

                {/* Image Upload */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label htmlFor="receipe-image" className="form-label">
                      Image{" "}
                      {isEdit && !formData?.image && `: ${selectedFileName}`}
                    </label>
                    <input
                      id="receipe-image"
                      name="image"
                      type="file"
                      ref={fileInputRef}
                      className="form-control"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      onChange={handleFormDataChange}
                    />
                    <ImageDimensionNote type="smartKitchen" />
                  </div>
                </div>

                {/* Category */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <Select
                      allowClear
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select Category"
                      value={formData.categoryId}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, categoryId: value }))
                      }
                    >
                      {allCategories.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Tags */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">Tags</label>
                    <Select
                      allowClear
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select Category"
                      value={formData.tagId}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, tagId: value }))
                      }
                    >
                      {tags.map((tg) => (
                        <Option key={tg.id} value={tg.id}>
                          {tg.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* type  */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">Recipe Type</label>
                    <Select
                      allowClear
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select type"
                      value={formData.type}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <Option value="veg">Veg</Option>
                      <Option value="non-veg">Non veg</Option>
                    </Select>
                  </div>
                </div>

                {/* Recipe  */}
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label htmlFor="receipe-image" className="form-label">
                      Recipe {isEdit && `: ${selectedPdfName}`}
                    </label>
                    <input
                      id="receipe"
                      name="recipe"
                      type="file"
                      ref={pdfInputRef}
                      className="form-control"
                      accept="application/pdf"
                      onChange={handleFormDataChange}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-4">
                  <label className="form-label d-block">Status</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        id="receipe-status-active"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={true}
                        checked={formData.isActive === true}
                        onChange={handleFormDataChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="receipe-status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="receipe-status-inactive"
                        className="form-check-input"
                        type="radio"
                        name="isActive"
                        value={false}
                        checked={formData.isActive === false}
                        onChange={handleFormDataChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="receipe-status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer border-top">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Recipe"
                  : "Save Recipe"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Recipies</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Recipe type</th>
                      <th>Category</th>
                      <th>Tag</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allReceipes.length ? (
                      allReceipes.map((recipe, index) => (
                        <tr key={recipe.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={recipe.image_url} target="_blank">
                              <img
                                src={recipe.image_url}
                                crossorigin="anonymous"
                                alt="recipe"
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
                          <td>{recipe.name}</td>
                          <td>{recipe.type}</td>
                          <td>{recipe.ItemCategory.name}</td>
                          <td>{recipe?.Master?.name||'-'}</td>
                          <td>{recipe.description}</td>
                          <td>
                            <span
                              className={`badge ${
                                recipe.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {recipe.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedReciepeID(recipe.id);
                                  setFormData({
                                    name: recipe.name,
                                    description: recipe.description,
                                    image: null,
                                    type: recipe.type,
                                    categoryId: recipe.categoryId,
                                    recipe: null,
                                    tagId:recipe.tagId,
                                    isActive: recipe.isActive,
                                  });
                                  setSelectedPdfname(recipe.recipe);
                                  setSelectedFileName(recipe.image);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="fs-18"
                                />
                              </button>
                              <ConfirmationPopup
                                title="Delete Consultant"
                                bodyText="Are you sure you want to delete this consultant?"
                                onOk={deleteReceipe}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="fs-18"
                                    onClick={() =>
                                      (selectedIdref.current = recipe.id)
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
                        <td colSpan="11" className="text-center">
                          No recipe found.
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

export default Recepies;
