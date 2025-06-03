import React from "react";
import ReactSummernote from "react-summernote";


import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "react-summernote/dist/react-summernote.css";


import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const Ckeditor = ({ text, setText }) => {
  const onChange = (content) => {
    setText(content);
  };
  const handleImageUpload = async (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await adminAxios.post("/ckeditor-image-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.data.url; 
      ReactSummernote.insertImage(imageUrl, function ($image) {
        $image.attr("alt", file.name);
        $image.attr("crossorigin", "anonymous"); 
      });
      
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Upload error:", error);
    }
  };

  
  return (
    <ReactSummernote
    options={{
      height: 200,
      dialogsInBody: true,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "clear"]],
        ["fontname", ["fontname"]],
        ["fontsize", ["fontsize"]], // add this for font size
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]], // ensure this is here
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview", "help"]],
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
