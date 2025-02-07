import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel: React.FC = () => {
  const images = [
    "Img/1.jpg",
    "Img/2.jpg",
    "Img/3.jpg",
    "Img/4.jpg",
    "Img/5.jpg",
    "Img/6.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto py-8">
      <div className="relative w-full h-80 md:h-96 lg:h-[450px] rounded-xl shadow-2xl overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500">
        <img
          src={images[currentIndex]}
          alt={`Carousel ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out opacity-90 hover:opacity-100"
        />

        {/* Left Chevron */}
        <button
          onClick={prevImage}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-300"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Chevron */}
        <button
          onClick={nextImage}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-300"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots Indicator (centered at the bottom) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
