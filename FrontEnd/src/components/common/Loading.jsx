const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="border-4 border-blue-500 rounded-full h-7 w-7 border-t-transparent animate-spin"></div>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
