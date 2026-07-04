const Button = ({
  children,
  type = "button",
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
