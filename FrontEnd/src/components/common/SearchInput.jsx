const SearchInput = ({ value, onChange, placeholder = "Search...", className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-black ${className}`}
    />
  );
};

export default SearchInput;
