import React from "react";

const ImageDimension = {
  innerBanner: { width: 1920, height: 470 },
  sliderImage: { width: 400, height: 600 },
  variant: { width: 300, height: 235 },
  inclusion: { width: 415, height: 315 },
  service: { width: 415, height: 350 },
  storyImage:{ width: 1900, height: 390 },
  packages: { width: 420, height: 420 },
  blogImage: { width: 615, height: 480 },
  successStory: { width: 190, height: 240 },
  teamAbout: { width: 275, height: 275 },
  teamMessage: { width: 90, height: 90 },
  manageConsultant: { width: 540, height: 520 },
  smartKitchen: { width: 240, height: 165 },
  smartCategory: { width: 120, height: 120 },
  partners: { width: 370, height: 180 },
  event: { width: 590, height: 315 },
  eventType: { width: 425, height: 590 },
  newsAndMedia: { width: 615, height: 480 },
  careers: { width: 635, height: 335 },
  innovationPrimary: { width: 755, height: 465 },
  innovationSecondary: { width: 265, height: 230 },
  innovationManage: { width: 525, height: 390 },
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
