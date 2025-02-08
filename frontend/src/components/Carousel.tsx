import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel: React.FC = () => {
  const images = ["Img/1.jpg", "Img/2.jpg", "Img/3.jpg", "Img/4.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full py-8">
      <div className="relative w-full h-[15rem] md:h-96 lg:h-[450px] rounded-xl shadow-2xl overflow-hidden group">
        {/* Background Image Animation */}
        <div
          key={currentIndex}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            direction === 1 ? "animate-slide-in-right" : "animate-slide-in-left"
          }`}
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
        </div>

        {/* Animated Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Carousel ${currentIndex + 1}`}
            className={`w-full h-full object-contain transition-all duration-700 ease-in-out ${
              direction === 1 ? "animate-fade-in-right" : "animate-fade-in-left"
            }`}
          />
        </div>

        {/* Left Chevron */}
        <button
          onClick={prevImage}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Chevron */}
        <button
          onClick={nextImage}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3 ">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-blue-500"
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
