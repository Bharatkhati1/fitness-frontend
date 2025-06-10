import React, { useState } from 'react';

const Header = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = formData;

    if (!title || !description) {
      alert('Please fill in both title and description.');
      return;
    }

    console.log('Submitted:', formData);

    // Reset form
    setFormData({ title: '', description: '' });
  };

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
            Save Header
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
