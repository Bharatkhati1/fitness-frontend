import React, { useState, useRef, useEffect } from 'react';
import adminAxios from '../../../../utils/Api/adminAxios';
import adminApiRoutes from '../../../../utils/Api/Routes/adminApiRoutes';
import { toast } from 'react-toastify';

const ContactDetails = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    twitter: '',
  });

  const onCancelEdit = () => {
    setIsEdit(false);
    setFormData({
      email: 'example@gmail.com',
      phone: '1234567890',
      address: 'jaipur update',
      instagram: 'insta',
      facebook: 'facebook',
      linkedin: 'linkedin',
      twitter: 'twitter',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    if (isEdit) {
      const response = await adminAxios.post(adminApiRoutes.update_contact_details, formData)
      toast.success(response.data.message)
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  const fetchContactDetails = async()=>{
    try {
        const res = await adminAxios.get(adminApiRoutes.get_contact_details);
        setFormData(res.data.data);
    } catch (error) {
         console.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    fetchContactDetails()
  },[])
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`card ${isEdit ? 'editing' : ''}`}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">
              {isEdit ? 'Edit Contact Details' : 'Contact Details'}
            </h4>
            {isEdit && (
              <button onClick={onCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="card-body">
            <div className="row">
              {/* Email */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={!isEdit}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    readOnly={!isEdit}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly={!isEdit}
                  />
                </div>
              </div>

              {/* Social Media */}
              {['instagram', 'facebook', 'linkedin', 'twitter'].map((platform) => (
                <div className="col-lg-6" key={platform}>
                  <div className="mb-3">
                    <label htmlFor={platform} className="form-label">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                    <input
                      type="text"
                      id={platform}
                      name={platform}
                      className="form-control"
                      value={formData[platform]}
                      onChange={handleChange}
                      readOnly={!isEdit}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-footer border-top text-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {isEdit ? 'Update Changes' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
