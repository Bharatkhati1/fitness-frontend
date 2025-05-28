import React from "react";

const Inclusions = ({ packageInclusions, setPackageInclusions }) => {
  return (
    <>
      {packageInclusions.map((inclusion, index) => (
        <>
          <div className="col-lg-6">
            <div className="gray-box">
              <div className="border-bottom mb-2 py-2">
                <div className="row justify-content-between align-items-center">
                  <div className="col-auto">
                    <h4 className="mb-0">Package Inclusion {index + 1}</h4>

                  </div>
                  <div className="col-auto">
                    {packageInclusions.length > 1 && index !== 0 && <button className="remove-btn-inclusion">-</button>}

                  </div>
                </div>
              </div>
              <div className="row g-2" key={index}>
                {/* Inclusion Name */}
                <div className="col-lg-6">
                  <div className="">
                    <label htmlFor={`inclusion-name-${index}`} className="form-label">
                      Package inclusion name
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
                  <div className="">
                    <label
                      htmlFor={`inclusion-image-${index}`}
                      className="form-label"
                    >
                      Inclusion image
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
                </div >

                {/* Inclusion Description */}
                < div className="col-lg-12" >
                  <div className="">
                    <label
                      htmlFor={`inclusion-description-${index}`}
                      className="form-label"
                    >
                      Inclusion Description
                    </label >
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
                  </div >
                </div >

                {/* Inclusion Status */}
                <div className="col-lg-6" >
                  <p>Package Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`service-status-${index}`}
                        id={`status-active-${index}`}
                        value={true}
                        checked={inclusion.is_active === true}
                        onChange={() => {
                          const newInclusions = [...packageInclusions];
                          newInclusions[index].is_active = true;
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
                        checked={inclusion.is_active === false}
                        onChange={() => {
                          const newInclusions = [...packageInclusions];
                          newInclusions[index].is_active = false;
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

              </div >
            </div >
          </div >
        </>
      ))}
    </>
  );
};

export default Inclusions;
