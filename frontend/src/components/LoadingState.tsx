import React from "react";
import { motion } from "framer-motion";

const LoadingState: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
    >
      {/* Outer Gradient Spinner */}
      <motion.div
        className="w-32 h-32 rounded-full shadow-lg"
        style={{
          background: "linear-gradient(135deg, #142c3a, #1f3c4e, #1e2a35)", // Darker colors
        }}
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          borderRadius: ["50%", "30%", "50%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Inner Gradient Spinner */}
      <motion.div
        className="absolute w-24 h-24 rounded-full shadow-lg"
        style={{
          background: "linear-gradient(135deg, #1f3c4e, #172c40, #141b20)", // Darker colors
        }}
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -360], // Rotate in the opposite direction
          borderRadius: ["50%", "30%", "50%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </motion.div>
  );
};

export default LoadingState;
