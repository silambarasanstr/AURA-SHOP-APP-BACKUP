import { Grid2X2, List } from "lucide-react";

const ViewToggle = ({ viewMode, onChange }) => {
  return (
    <div className="flex overflow-hidden border border-gray-200 rounded-lg">
      <button
        onClick={() => onChange("grid")}
        className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
        aria-label="Grid view"
      >
        <Grid2X2 size={20} className="text-gray-500" />
      </button>

      <button
        onClick={() => onChange("list")}
        className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
        aria-label="List view"
      >
        <List size={20} className="text-gray-500" />
      </button>
    </div>
  );
};

export default ViewToggle;
