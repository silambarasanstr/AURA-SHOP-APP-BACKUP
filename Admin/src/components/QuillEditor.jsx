import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // ✅ Initialize Quill
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write description...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      // ✅ Handle change
      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        onChange(html);
      });
    }
  }, [onChange]);

  // ✅ Set initial value (VERY IMPORTANT)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="w-full">
      <label className="block mb-4 text-lg font-bold text-gray-900">
        Product Description
      </label>

      <div className="overflow-hidden bg-white ">
        <div
          ref={editorRef}
          className="min-h-[150px] [&_.ql-editor]:min-h-[150px] px-4 py-3 placeholder-gray-400 transition-all border border-gray-300  resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default QuillEditor;
