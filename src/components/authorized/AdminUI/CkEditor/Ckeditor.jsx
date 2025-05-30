import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";

import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";

const Ckeditor = ({ text, setText }) => {
  const onChange = (content) => {
    setText(content);
  };
  const handleImageUpload = async (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await adminAxios.post(adminApiRoutes.upload_image, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.url; 
      ReactSummernote.insertImage(imageUrl, file.name);
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Upload error:", error);
    }
  };
  return (
    <ReactSummernote
      options={{
        disableDragAndDrop: true,
        height: 200,
        toolbar: [
          ["style", ["style"]],
          ["font", ["bold", "underline", "clear"]],
          ["fontname", ["fontname"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["table", ["table"]],
          ["insert", ["link", "picture", "video"]],
          ["view", ["fullscreen", "codeview"]],
        ],
      }}
      value={text}
      defaultValue={text} 
      onChange={onChange}
      onImageUpload={handleImageUpload}
    />
  );
};

export default Ckeditor;
