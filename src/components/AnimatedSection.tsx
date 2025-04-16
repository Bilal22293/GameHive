"use client"
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useInView, useMotionValue, useTransform, AnimatePresence, Variant, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants | null;
}

export const AnimatedSection = ({ 
  children, 
  delay = 0, 
  className = "", 
  variants = null 
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  const sectionVariants = variants || defaultVariants;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};