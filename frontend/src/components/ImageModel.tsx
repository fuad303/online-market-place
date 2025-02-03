import React, { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
}) => {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <button
          className="fixed top-2 right-2 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Full view"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal;
