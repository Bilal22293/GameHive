// src/app/products/[id]/ProductSkeleton.tsx
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

export default function ProductSkeleton() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-card rounded-lg shadow-md p-4 h-80 animate-pulse border border-border"
          variants={item}
        >
          <div className="bg-muted h-40 rounded-md mb-4"></div>
          <div className="bg-muted h-6 rounded-md mb-2 w-3/4"></div>
          <div className="bg-muted h-4 rounded-md mb-2 w-1/2"></div>
          <div className="bg-muted h-6 rounded-md w-1/4"></div>
        </motion.div>
      ))}
    </motion.div>
  );
}
