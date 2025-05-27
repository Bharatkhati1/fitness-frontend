import React from "react";

const Variants = ({ packageVariants, setPackageVariants }) => {
  const allValues = [
    { value: 3, name: "3 Months" },
    { value: 6, name: "6 Months" },
    { value: 9, name: "9 Months" },
    { value: 12, name: "12 Months" },
  ];
  return (
    <>
      {packageVariants.map((inclusion, index) => (
        <div className="row mb-3" key={index}>
          {/* Inclusion Name*/}
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="inclusion-name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="inclusion-name"
                className="form-control"
                placeholder="Enter name"
                value={inclusion.name}
                onChange={(e) => {
                  const newInclusions = [...packageVariants];
                  newInclusions[index].name = e.target.value;
                  setPackageVariants(newInclusions);
                }}
              />
            </div>
          </div>

          {/* Inclusion Image */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="service-image" className="form-label">
                Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                id="service-image"
                value={inclusion.image}
                className="form-control"
                onChange={(e) => {
                  const newInclusions = [...packageVariants];
                  newInclusions[index].image = e.target.files[0];
                  setPackageVariants(newInclusions);
                }}
              />
            </div>
          </div>

          {/* Package Image */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={inclusion.price}
                placeholder="Enter price"
                className="form-control"
                onChange={(e) => {
                  const newInclusions = [...packageVariants];
                  newInclusions[index].price = e.target.value;
                  setPackageVariants(newInclusions);
                }}
              />
            </div>
          </div>

          {/* duration */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="package-type" className="form-label">
                Duration
              </label>
              <select
                id="package-type"
                className="form-select"
                value={inclusion.duration}
                onChange={(e) => {
                  const newInclusions = [...packageVariants];
                  newInclusions[index].duration = e.target.value;
                  setPackageVariants(newInclusions);
                }}
              >
                <option value="">Select type</option>
                {allValues?.map((val) => (
                  <option value={val.value}>{val.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Inclusion Description */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="inclusion-description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                style={{ resize: "vertical", minHeight: "100px" }}
                id="inclusion-description"
                className="form-control"
                placeholder="Enter description"
                value={inclusion.description}
                onChange={(e) => {
                  const newInclusions = [...packageVariants];
                  newInclusions[index].description = e.target.value;
                  setPackageVariants(newInclusions);
                }}
              />
            </div>
          </div>
          {packageVariants.length > 1 && (
            <button className="remove-btn-inclusion">Remove</button>
          )}
        </div>
      ))}
    </>
  );
};

export default Variants;
