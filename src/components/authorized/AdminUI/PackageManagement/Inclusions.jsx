import React from "react";
import Ckeditor from "../CkEditor/Ckeditor";

const Inclusions = ({ isEdit, packageInclusions, setPackageInclusions }) => {
  const removeInclusion = (index) => {
    const updatedInclusions = packageInclusions.filter((_, idx) => idx !== index);
    setPackageInclusions(updatedInclusions);
  };

  return (
    <>
      {packageInclusions.map((inclusion, index) => (
        <div className="col-lg-6" key={inclusion.id || index}>
          <div className="gray-box">
            <div className="border-bottom mb-2 py-2">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h4 className="mb-0">Package Inclusion {index + 1}</h4>
                </div>
                <div className="col-auto">
                  {packageInclusions.length > 1 && index !== 0 && (
                    <button
                      className="remove-btn-inclusion"
                      onClick={() => removeInclusion(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="row g-2">
              {/* Inclusion Name */}
              <div className="col-lg-6">
                <label className="form-label">Package inclusion name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={inclusion.name}
                  onChange={(e) => {
                    setPackageInclusions((prev) =>
                      prev.map((item, idx) =>
                        idx === index ? { ...item, name: e.target.value } : item
                      )
                    );
                  }}
                />
              </div>

              {/* Inclusion Image */}
              <div className="col-lg-6">
                <label className="form-label">
                  Inclusion image {isEdit && ` : ${inclusion.image}`}
                </label>
                <input
                  type="file"
                   accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                  className="form-control"
                  onChange={(e) => {
                    setPackageInclusions((prev) =>
                      prev.map((item, idx) =>
                        idx === index ? { ...item, image: e.target.files[0] } : item
                      )
                    );
                  }}
                />
              </div>

              {/* Inclusion Description */}
              <div className="col-lg-12">
                <label className="form-label">Inclusion Description</label>
                <Ckeditor
                  text={inclusion.description}
                  setText={(value) => {
                    setPackageInclusions((prev) =>
                      prev.map((item, idx) =>
                        idx === index ? { ...item, description: value } : item
                      )
                    );
                  }}
                />
              </div>

              {/* Status */}
              <div className="col-lg-6">
                <p>Package Status</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`service-status-${index}`}
                      id={`status-active-${index}`}
                      checked={inclusion.is_active === true}
                      onChange={() => {
                        setPackageInclusions((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, is_active: true } : item
                          )
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor={`status-active-${index}`}>
                      Active
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`service-status-${index}`}
                      id={`status-inactive-${index}`}
                      checked={inclusion.is_active === false}
                      onChange={() => {
                        setPackageInclusions((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, is_active: false } : item
                          )
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor={`status-inactive-${index}`}>
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Inclusions;
