import { useEffect, useState } from "react";

const BannerSlider = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full mx-auto overflow-hidden max-w-8xl bg-gray-200 h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No banner images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden max-w-8xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            loading="lazy"
            alt={`slide-${index}`}
            className="w-full flex-shrink-0 h-[400px] object-cover border"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x400?text=Banner+Image";
            }}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute z-10 flex items-center justify-center w-10 h-10 transition -translate-y-1/2 rounded-full shadow-md left-3 top-1/2 bg-white/80 hover:bg-white"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        className="absolute z-10 flex items-center justify-center w-10 h-10 transition -translate-y-1/2 rounded-full shadow-md right-3 top-1/2 bg-white/80 hover:bg-white"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-3 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
