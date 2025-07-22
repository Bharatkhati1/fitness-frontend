import React from "react";
import Ckeditor from "../CkEditor/Ckeditor";
import ImageDimensionNote from "../../../../utils/ImageDimensionNote";

const Variants = ({ isEdit, packageVariants, setPackageVariants }) => {
  const removeVariant = (index) => {
    const updatedVariants = packageVariants.filter((_, idx) => idx !== index);
    setPackageVariants(updatedVariants);
  };

  return (
    <>
      {packageVariants.map((variant, index) => (
        <div className="gray-box mb-2" key={variant.id || index}>
          <div className="border-bottom mb-2 py-2">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <h4 className="mb-0">Package Variant {index + 1}</h4>
              </div>
              <div className="col-auto">
                {/* {packageVariants.length > 1 && index !== 0 && ( */}
                <button
                  className="remove-btn-inclusion"
                  onClick={() => removeVariant(index)}
                >
                  -
                </button>
                {/* )} */}
              </div>
            </div>
          </div>

          <div className="row g-2">
            {/* Variant Image */}
            <div className="col-lg-6">
              <label className="form-label" htmlFor={`variants-image-${index}`}>
                Image {isEdit && ` : ${variant.image}`}
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                id={`variants-image-${index}`}
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setPackageVariants((prev) =>
                    prev.map((item, idx) =>
                      idx === index ? { ...item, image: file } : item
                    )
                  );
                }}
              />
                 <ImageDimensionNote type="variant" />
            </div>

            {/* Variant Price */}
            <div className="col-lg-6">
              <label className="form-label" htmlFor={`variants-price-${index}`}>
                Price
              </label>
              <input
                type="number"
                id={`variants-price-${index}`}
                value={variant.price}
                placeholder="Enter price"
                className="form-control"
                onChange={(e) => {
                  const price = e.target.value.replace(/[^0-9]/g, "");
                  setPackageVariants((prev) =>
                    prev.map((item, idx) =>
                      idx === index ? { ...item, price } : item
                    )
                  );
                }}
              />
            </div>

            {/* Variant Duration */}
            <div className="col-lg-6">
              <label
                className="form-label"
                htmlFor={`variants-duration-${index}`}
              >
                Duration (in months)
              </label>
              <input
                type="number"
                id={`variants-duration-${index}`}
                className="form-control"
                value={variant.duration}
                max={12}
                min={1}
                onChange={(e) => {
                  let duration = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
                  if (duration > 12) duration = 12;
                  if (duration < 1 || isNaN(duration)) duration = "";
                  setPackageVariants((prev) =>
                    prev.map((item, idx) =>
                      idx === index ? { ...item, duration } : item
                    )
                  );
                }}
                placeholder="Enter duration (max 12)"
              />
            </div>

            {/* Variant Description */}
            <div className="col-lg-12">
              <label
                className="form-label"
                htmlFor={`variants-description-${index}`}
              >
                Description
              </label>
              <Ckeditor
                text={variant.description}
                setText={(value) => {
                  setPackageVariants((prev) =>
                    prev.map((item, idx) =>
                      idx === index ? { ...item, description: value } : item
                    )
                  );
                }}
                limit={320}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Variants;
