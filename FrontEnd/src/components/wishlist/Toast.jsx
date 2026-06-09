import React from "react";
import { Check } from "lucide-react";
const Toast = ({ message, visible }) => {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <Check size={15} />
      {message}
    </div>
  );
};

export default Toast;
