import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";

const EditModal = ({ isOpen, onCancel, onUpdate, initialData = {} }) => {
  const [formData, setFormData] = useState({
    id:"",
    heading: "",
    image_url: null,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        id:initialData.id,
        heading: initialData.heading || "",
        image_url: null,
      });
      setPreview(initialData.image_url || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <Modal
      open={isOpen}
      title="Edit Details"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Update
        </Button>,
      ]}
    >
      <div className="mb-3">
        <label>Heading</label>
        <Input
          placeholder="Enter heading"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Preview"
               crossOrigin="anonymous"
              style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditModal;
