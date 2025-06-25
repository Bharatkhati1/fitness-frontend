import React, { useEffect, useRef, useState } from "react";
import ReactSummernote from "react-summernote";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-summernote/dist/react-summernote.css";
import adminAxios from "../../../../utils/Api/adminAxios";
import { toast } from "react-toastify";

const Ckeditor = ({ text, setText, limit }) => {
  const editorRef = useRef(null);
  const [max, setMax] = useState(limit);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Helper function to extract text content from HTML
  const getTextContent = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Helper function to get text length
  const getTextContentLength = (html) => {
    return getTextContent(html).length;
  };

  // Update character count
  const updateCharCount = (content) => {
    const count = getTextContentLength(content);
    setCharCount(count);
    setIsLimitReached(count >= max);
    return count;
  };

  useEffect(() => {
    setMax(limit);
  }, [limit]);
  // Initialize editor with text and count
  useEffect(() => {
    if (!hasInitialized && editorRef.current && window.$) {
      const initialContent = text || "";
      window.$(editorRef.current.editor).summernote("code", initialContent);
      updateCharCount(initialContent);
      setHasInitialized(true);
    }
  }, [text, hasInitialized]);

  // Handle content changes with limit enforcement
  const onChange = (content) => {
    if (!max) {
      setText(content);
      updateCharCount(content);
      return;
    }

    const currentLength = getTextContentLength(content);

    if (currentLength > max) {
      // Completely prevent the change
      return;
    }

    setText(content);
    updateCharCount(content);
  };

  // Handle image upload with limit check
  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await adminAxios.post(
        "/ckeditor-image-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.data.url;
  
      const customImageHTML = `
        <img 
          src="${imageUrl}" 
          alt="partner" 
          crossOrigin="anonymous"
        />
      `;
  
      const currentHTML = window.$(editorRef.current.editor).summernote("code");
      const newHTML = currentHTML + customImageHTML;
  
      window.$(editorRef.current.editor).summernote("code", newHTML);
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Upload error:", error);
    }
  };

  // Add event listeners to prevent input when limit is reached
  useEffect(() => {
    if (!editorRef.current || !window.$) return;

    const editor = window.$(editorRef.current.editor);
    const editable = editor.next().find(".note-editable");

    const handleKeyDown = (e) => {
      if (isLimitReached && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
        e.preventDefault();
        toast.warn(`Character limit of ${max} reached`);
      }
    };

    const handlePaste = (e) => {
      if (isLimitReached) {
        e.preventDefault();
        toast.warn(`Cannot paste - character limit of ${max} reached`);
      }
    };

    editable.on("keydown", handleKeyDown);
    editable.on("paste", handlePaste);

    return () => {
      editable.off("keydown", handleKeyDown);
      editable.off("paste", handlePaste);
    };
  }, [isLimitReached, max]);

  return (
    <div className="summernote-wrapper">
      <ReactSummernote
        ref={editorRef}
        options={{
          height: 230,
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
          fontSizes: [
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "24",
            "26",
            "28",
            "30",
            "32",
            "34",
            "36",
          ],
        }}
        value={text}
        onChange={onChange}
        onImageUpload={handleImageUpload}
      />
      {limit && (
        <div className="char-counter mt-2 text-end">
          {charCount}/{limit} characters
          {charCount > limit * 0.9 && charCount < limit && (
            <span className="text-warning"> (Approaching limit)</span>
          )}
          {isLimitReached && (
            <span className="text-danger"> (Limit reached)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Ckeditor;
