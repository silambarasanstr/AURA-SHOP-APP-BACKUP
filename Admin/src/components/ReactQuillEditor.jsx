import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillEditor = ({ value = "", onChange }) => {
  // ✅ prevent re-creation every render
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="w-full">
      <label className="block mb-4 text-lg font-bold text-gray-900">
        Description
      </label>

      <div className="overflow-hidden bg-white">
        <ReactQuill
          theme="snow"
          value={value || ""} // ✅ IMPORTANT FIX
          onChange={(content) => onChange?.(content)} // ✅ SAFE CALL
          modules={modules}
          className="min-h-[150px] [&_.ql-editor]:min-h-[150px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ReactQuillEditor;