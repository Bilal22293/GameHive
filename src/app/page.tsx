"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesShowcase } from "@/components/CategoriesShowcase";
import { Newsletter } from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import { GlitchText } from "@/components/GlitchText";
import { CyberButton } from "@/components/CyberButton";
import { NeoGrid } from "@/components/NeoGrid";
import { AnimatedSection } from "@/components/AnimatedSection";
import {  HexGrid } from "@/components/Hex";
import HeroSection from "@/components/HeroSection";

interface JobImage {
  src: string;
  alt: string;
}

const jobImages: JobImage[] = [
  {
    src: '/img.png',
    alt: 'Job opportunity 1',
  },
  {
    src: '/video.mp4', // This will be detected as a video
    alt: 'Job opportunity video',
  },
  {
    src: '/img2.png',
    alt: 'Job opportunity 2',
  },
];

export default function Home() {
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const scrollToCategories = () => {
    categoryRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Custom cursor effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // Parallax effect for mouse movement
  const calcParallax = (x: number, y: number, element: HTMLElement | null) => {
    if (!element) return { x: 0, y: 0 };
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (x - centerX) / 30;
    const moveY = (y - centerY) / 30;

    return { x: moveX, y: moveY };
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden perspective-1000">
      <HeroSection scrollToCategories={scrollToCategories}/>

      {/* Featured Products Section */}
      <AnimatedSection
        className="md:py-24 lg:py-24 pt-18 relative"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <HexGrid />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 cyberpunk-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GlitchText text="FEATURED PRODUCTS" />
          </motion.h2>

          <FeaturedProducts />
        </div>
      </AnimatedSection>

      {/* Tech line divider */}
      <div className="relative py-8">
        <motion.div
          className="tech-circle"
          animate={{
            boxShadow: [
              "0 0 10px rgba(255,206,61,0.7)",
              "0 0 20px rgba(255,206,61,0.9)",
              "0 0 10px rgba(255,206,61,0.7)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* Categories Showcase */}
      <AnimatedSection
        delay={0.2}
        className="py-6 relative bg-gradient-radial from-transparent to-background/80"
      >
        <NeoGrid className="opacity-10" />

        <div className="container mx-auto px-4 relative z-10" ref={categoryRef}>
          <motion.h2
            className="text-3xl md:text-4xl font-bold  mb-4 cyberpunk-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GlitchText text="SHOP BY CATEGORY" />
          </motion.h2>

          <CategoriesShowcase />
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection
        delay={0.4}
        className="py-24 relative"
        variants={{
          hidden: { opacity: 0, scale: 0.98 },
          visible: { opacity: 1, scale: 1 },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold  cyberpunk-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GlitchText text="WHAT GAMERS SAY" />
          </motion.h2>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 rounded-xl blur-lg"></div>
            <Testimonials />
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection
        delay={0.5}
        className="py-24 relative"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <NeoGrid className="opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-lg"></div>
            <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>

              <Newsletter />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer Call to Action */}
      <AnimatedSection
        delay={0.6}
        className="py-16 relative"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="container mx-auto px-4  relative z-10">
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-6 text-glow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to elevate your gaming experience?
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <CyberButton
              href="/products"
              className="px-8 py-4 mt-4 text-lg cta-glow"
            >
              Explore Our Collection
            </CyberButton>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
}