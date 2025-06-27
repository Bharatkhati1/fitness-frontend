import React from "react";

const ImageDimension = {
  innerBanner: { width: 1920, height: 468 },
  sliderImage: { width: 400, height: 600 },
  service: { width: 416, height: 350 },
  storyImage:{ width: 1900, height: 390 },
  inclusion:{width:416, height:311},
  packages: { width: 419, height: 419 },
  blogImage: { width: 612, height: 481 },
  successStory: { width: 191, height: 239 },
  teamAbout: { width: 275, height: 275 },
  teamMessage: { width: 90, height: 90 },
  manageConsultant: { width: 538, height: 520 },
  smartKitchen: { width: 240, height: 165 },
  smartCategory: { width: 119, height: 119 },
  partners: { width: 371, height: 180 },
  event: { width: 591, height: 314 },
  eventType: { width: 423, height: 589 },
  newsAndMedia: { width: 612, height: 481 },
  careers: { width: 633, height: 335 },
  innovationPrimary: { width: 754, height: 465 },
  innovationSecondary: { width: 265, height: 230 },
  innovationManage: { width: 526, height: 391 },
};

const ImageDimensionNote = ({ type, variant }) => {
  if (!type) return null;

  const dimension = ImageDimension[type];

  if (!dimension) return null;

  if (
    typeof dimension.width !== "number" ||
    typeof dimension.height !== "number"
  ) {
    const selected = variant || "primary";
    const nested = dimension[selected];
    if (!nested) return null;

    return (
      <p className="text-muted">
        Note: Image size - {nested.width} x {nested.height}px
      </p>
    );
  }

  return (
    <p className="text-muted">
      Note: Image size - {dimension.width} x {dimension.height}px
    </p>
  );
};

export default ImageDimensionNote;
