import React, { useEffect, useRef, useState } from "react";
import ReactSummernote from "react-summernote";

import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "react-summernote/dist/react-summernote.css";

import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";

const Ckeditor = ({ text, setText }) => {
  const editorRef = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Set initial value only once
  useEffect(() => {
    if (!hasInitialized && editorRef.current && window.$) {
      window.$(editorRef.current.editor).summernote("code", text || "");
      setHasInitialized(true);
    }
  }, [text, hasInitialized]);

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
      window
        .$(editorRef.current.editor)
        .summernote("insertImage", imageUrl, function ($image) {
          $image.attr("alt", file.name);
          $image.attr("crossOrigin", "anonymous");
        });
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Upload error:", error);
    }
  };

  return (
    <ReactSummernote
      ref={editorRef}
      options={{
        height: 400,
        dialogsInBody: true,
        toolbar: [
          ["style", ["style"]],
          ["font", ["bold", "italic", "underline", "clear"]],
          ["fontname", ["fontname"]],
          ["fontsize", ["fontsize"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["table", ["table"]],
          ["insert", ["link", "picture", "video"]],
          ["view", ["fullscreen", "codeview", "help"]],
        ],
      }}
      value={text}
      onChange={onChange}
      onImageUpload={handleImageUpload}
    />
  );
};

export default Ckeditor;
