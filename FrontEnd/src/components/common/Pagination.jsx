const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1.5 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 text-sm border rounded-md transition ${
            page === p ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1.5 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;