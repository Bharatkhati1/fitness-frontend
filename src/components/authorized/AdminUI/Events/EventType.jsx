import React, { useRef, useState } from 'react';

const EventType = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    description: '',
  });

  const [preview, setPreview] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const fileInputRef = useRef();

  const isEdit = editIndex !== null;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, image } = formData;

    if (!title || !description || !image) {
      alert('Please fill in all fields.');
      return;
    }

    const newEvent = {
      ...formData,
      image_url: image instanceof File ? URL.createObjectURL(image) : image,
    };

    if (isEdit) {
      const updated = [...eventTypes];
      updated[editIndex] = newEvent;
      setEventTypes(updated);
      setEditIndex(null);
    } else {
      setEventTypes([...eventTypes, newEvent]);
    }

    setFormData({ image: null, title: '', description: '' });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (index) => {
    const data = eventTypes[index];
    setFormData({
      title: data.title,
      description: data.description,
      image: data.image,
    });
    setPreview(data.image_url);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = eventTypes.filter((_, i) => i !== index);
    setEventTypes(filtered);
    if (editIndex === index) {
      setFormData({ image: null, title: '', description: '' });
      setPreview(null);
      setEditIndex(null);
    }
  };

  const onCancelEdit = () => {
    setEditIndex(null);
    setFormData({ image: null, title: '', description: '' });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`card ${isEdit ? "editing" : ""}`}>
          <div className="card-header d-flex justify-content-between">
            <h4 className="card-title">
              {isEdit ? "Edit Event Type" : "Create Event Type"}
            </h4>
            {isEdit && (
              <button className="btn btn-warning" onClick={onCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              {/* Title */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: 80, marginTop: 10 }}
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="col-lg-12">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer border-top">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isEdit ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>

      {/* Event Table */}
      <div className="col-xl-12 mt-4">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">All Events</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0 table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eventTypes.length > 0 ? (
                    eventTypes.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image_url}
                            alt="event"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              border: "1px solid #ddd",
                            }}
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No events found.
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
  );
};

export default EventType;
