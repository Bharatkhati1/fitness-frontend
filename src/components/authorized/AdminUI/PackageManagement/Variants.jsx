import React from "react";

const Variants = ({isEdit, packageVariants, setPackageVariants }) => {
  const allValues = [
    { value: 3, name: "3 Months" },
    { value: 6, name: "6 Months" },
    { value: 9, name: "9 Months" },
    { value: 12, name: "12 Months" },
  ];

  return (
    <>
      {packageVariants.map((inclusion, index) => (
        <>
          <div className="gray-box  mb-2">
            <div className="border-bottom mb-2 py-2">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h4 className="mb-0">Package Variants {index + 1}</h4>
                </div>
                <div className="col-auto">
                  {packageVariants.length > 1 && index !== 0 && <button className="remove-btn-inclusion">-</button>}
                </div>
              </div>
            </div>
            <div className="row g-2" key={index}>
              {/* Variant Name */}
              <div className="col-lg-6">
                <div className="">
                  <label htmlFor={`variants-name-${index}`} className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id={`variants-name-${index}`}
                    className="form-control"
                    placeholder="Enter name"
                    value={inclusion.name}
                    onChange={(e) => {
                      const newVariants = [...packageVariants];
                      newVariants[index].name = e.target.value;
                      setPackageVariants(newVariants);
                    }}
                  />
                </div>
              </div>

              {/* Variant Image */}
              <div className="col-lg-6">
                <div className="">
                  <label htmlFor={`variants-image-${index}`} className="form-label">
                    Image {isEdit && ` : ${inclusion.image}`}
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                    id={`variants-image-${index}`}
                    className="form-control"
                    onChange={(e) => {
                      const newVariants = [...packageVariants];
                      newVariants[index].image = e.target.files[0];
                      setPackageVariants(newVariants);
                    }}
                  />
                </div>
              </div>

              {/* Variant Price */}
              <div className="col-lg-6">
                <div className="">
                  <label htmlFor={`variants-price-${index}`} className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id={`variants-price-${index}`}
                    value={inclusion.price}
                    placeholder="Enter price"
                    className="form-control"
                    onChange={(e) => {
                      const newVariants = [...packageVariants];
                      newVariants[index].price = e.target.value;
                      setPackageVariants(newVariants);
                    }}
                  />
                </div>
              </div>

              {/* Variant Duration */}
              <div className="col-lg-6">
                <div className="">
                  <label htmlFor={`variants-duration-${index}`} className="form-label">
                    Duration
                  </label>
                  <select
                    id={`variants-duration-${index}`}
                    className="form-select"
                    value={inclusion.duration}
                    onChange={(e) => {
                      const newVariants = [...packageVariants];
                      newVariants[index].duration = e.target.value;
                      setPackageVariants(newVariants);
                    }}
                  >
                    <option value="">Select type</option>
                    {allValues.map((val) => (
                      <option key={val.value} value={val.value}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Variant Description */}
              <div className="col-lg-12">
                <div className="">
                  <label htmlFor={`variants-description-${index}`} className="form-label">
                    Description
                  </label>
                  <textarea
                    id={`variants-description-${index}`}
                    className="form-control"
                    style={{ resize: "vertical", minHeight: "100px" }}
                    placeholder="Enter description"
                    value={inclusion.description}
                    onChange={(e) => {
                      const newVariants = [...packageVariants];
                      newVariants[index].description = e.target.value;
                      setPackageVariants(newVariants);
                    }}
                  />
                </div>
              </div>

              {/* Remove Button */}
              {/* {packageVariants.length > 1 && (
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      const newVariants = packageVariants.filter((_, i) => i !== index);
                      setPackageVariants(newVariants);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Variants;
