const ProductSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />

      <div className="p-4 space-y-3">
        <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />

        <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />

        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default ProductSkeleton;