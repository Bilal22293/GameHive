// Neon underline component
import { motion, useAnimation, useScroll, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export const NeonUnderline = ({ width = 24, color = "primary", className = "" }) => {
  const colorMap = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    blue: "bg-neon-blue",
    purple: "bg-neon-purple",
    red: "bg-neon-red"
  };
  
  return (
    <motion.div 
      className={`h-1 ${colorMap[color]} mx-auto rounded-full relative ${className}`}
      initial={{ width: 0 }}
      whileInView={{ width }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className={`absolute inset-0 ${colorMap[color]} rounded-full blur-md opacity-70`}></div>
    </motion.div>
  );
};

// Cyberpunk-style HexGrid for backgrounds
export const HexGrid = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 hex-grid opacity-10 pointer-events-none ${className}`}>
      <div className="h-full w-full" />
    </div>
  );
};
