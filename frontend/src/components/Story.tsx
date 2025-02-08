import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Story: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const updateChevrons = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setShowNext(scrollLeft < maxScroll);
    setShowPrev(scrollLeft > 0);
  };

  useEffect(() => {
    updateChevrons();
    window.addEventListener("resize", updateChevrons);
    return () => window.removeEventListener("resize", updateChevrons);
  }, []);

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(updateChevrons, 300);
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(updateChevrons, 300);
    }
  };

  return (
    <div dir="LTR" className="relative w-full ">
      {showPrev && (
        <button
          onClick={scrollPrev}
          className="bg-gray-900/40 hover:bg-gray-900/50 absolute left-0 top-1/2 -translate-y-1/2  p-1 shadow-md z-10 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <div
        ref={containerRef}
        className="flex gap-2 overflow-hidden whitespace-nowrap"
        onScroll={updateChevrons}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <img
            className="size-16 rounded-full"
            key={index}
            src="https://plus.unsplash.com/premium_photo-1738604141757-e0447f101dad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        ))}
      </div>

      {showNext && (
        <button
          onClick={scrollNext}
          className="bg-gray-900/40 hover:bg-gray-900/50 absolute right-0 top-1/2 -translate-y-1/2 p-1 shadow-md z-10 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Story;
