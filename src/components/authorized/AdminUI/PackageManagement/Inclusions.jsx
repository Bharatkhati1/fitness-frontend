import React from "react";

const Inclusions = ({ packageInclusions, setPackageInclusions }) => {
  return (
    <>
      {packageInclusions.map((inclusion, index) => (
        <div className="row mb-3" key={index}>
          {/* Inclusion Name */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor={`inclusion-name-${index}`} className="form-label">
                Name
              </label>
              <input
                type="text"
                id={`inclusion-name-${index}`}
                className="form-control"
                placeholder="Enter name"
                value={inclusion.name}
                onChange={(e) => {
                  const newInclusions = [...packageInclusions];
                  newInclusions[index].name = e.target.value;
                  setPackageInclusions(newInclusions);
                }}
              />
            </div>
          </div>

          {/* Package Image */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label
                htmlFor={`inclusion-image-${index}`}
                className="form-label"
              >
                Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                id={`inclusion-image-${index}`}
                className="form-control"
                onChange={(e) => {
                  const newInclusions = [...packageInclusions];
                  newInclusions[index].image = e.target.files[0];
                  setPackageInclusions(newInclusions);
                }}
              />
            </div>
          </div>

          {/* Inclusion Description */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label
                htmlFor={`inclusion-description-${index}`}
                className="form-label"
              >
                Description
              </label>
              <textarea
                id={`inclusion-description-${index}`}
                className="form-control"
                placeholder="Enter description"
                style={{ resize: "vertical", minHeight: "100px" }}
                value={inclusion.description}
                onChange={(e) => {
                  const newInclusions = [...packageInclusions];
                  newInclusions[index].description = e.target.value;
                  setPackageInclusions(newInclusions);
                }}
              />
            </div>
          </div>

          {/* Inclusion Status */}
          <div className="col-lg-6">
            <p>Status</p>
            <div className="d-flex gap-2 align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`service-status-${index}`}
                  id={`status-active-${index}`}
                  value={true}
                  checked={inclusion.status === true}
                  onChange={() => {
                    const newInclusions = [...packageInclusions];
                    newInclusions[index].status = true;
                    setPackageInclusions(newInclusions);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`status-active-${index}`}
                >
                  Active
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`service-status-${index}`}
                  id={`status-inactive-${index}`}
                  value={false}
                  checked={inclusion.status === false}
                  onChange={() => {
                    const newInclusions = [...packageInclusions];
                    newInclusions[index].status = false;
                    setPackageInclusions(newInclusions);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`status-inactive-${index}`}
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>

         {packageInclusions.length>1&& <button className="remove-btn-inclusion">Remove</button>}
        </div>
      ))}
    </>
  );
};

export default Inclusions;
