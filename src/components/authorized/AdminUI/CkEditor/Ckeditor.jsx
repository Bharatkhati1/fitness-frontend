import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  CodeBlock,
  Heading,
  BlockQuote,
  List,
  Table,
  TableToolbar,
  MediaEmbed,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
const Ckeditor = ({text, setText}) => {
    console.log({text, setText})
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey:
            "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDg0NzY3OTksImp0aSI6IjJmM2YzYzQ0LTdkZDktNGNjMy05YTI0LTEzNmE2NjUwMTk1YSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImJlM2MxZDg5In0.5MQ_HUdZu43w0fmLj9-MYPqijOSfi6UxImUEFsUCZI9FhuNpQLkoYLBJnXm9oOtV-B8AqMFWRwzCBdTBXNzsFw",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            CodeBlock,
            Heading,
            BlockQuote,
            List,
            Table,
            TableToolbar,
            MediaEmbed,
          ],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "code",
            "codeBlock",
            "|",
            "link",
            "blockQuote",
            "bulletedList",
            "numberedList",
            "|",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        }}
        data={text}
        onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
      />
    </div>
  );
};

export default Ckeditor;
