import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CyberButton } from "./CyberButton";

interface HeroSectionProps {
  scrollToCategories: () => void;
}

const HeroSection = ({ scrollToCategories }: HeroSectionProps) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideDuration = 5000;
  
  // Swipe functionality
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50;

  const heroSlides = [
    {
      id: 1,
      heading: "NEXT-GEN CONSOLES",
      subheading: "Experience gaming like never before with cutting-edge technology",
      image: "/console2.png", 
      video: "/videos/console-reveal.mp4", 
      useVideo: true,
    },
    {
      id: 2,
      heading: "PREMIUM CONTROLLERS",
      subheading: "Precision engineered for the ultimate gaming performance",
      image: "/c.png",
      video: "/videos/controller-showcase.mp4",
      useVideo: true,
    },
    {
      id: 3,
      heading: "GAMING LAPTOPS",
      subheading: "Complete your setup with our high-quality laptops",
      image: "/pc.png",
      video: "/videos/accessories-showcase.mp4",
      useVideo: false,
    },
  ];

  // Handle swipe start
  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle swipe move
  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle swipe end
  const handleTouchEnd = () => {
    if (!isAnimating && touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) {
        // Swipe left
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
      
      if (distance < -minSwipeDistance) {
        // Swipe right
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
      }
    }
    
    // Reset touch points
    setTouchStart(0);
    setTouchEnd(0);
  };

  // For mouse drag (desktop swipe alternative)
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);
  
  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };
  
  const handleMouseMove = (e: any) => {
    if (isDragging) {
      setDragEnd(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    if (isDragging && dragStart && dragEnd) {
      const distance = dragStart - dragEnd;
      if (distance > minSwipeDistance && !isAnimating) {
        // Drag left
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
      
      if (distance < -minSwipeDistance && !isAnimating) {
        // Drag right
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
      }
    }
    
    // Reset drag state
    setIsDragging(false);
    setDragStart(0);
    setDragEnd(0);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, slideDuration);
    
    return () => clearTimeout(timer);
  }, [currentSlide, isAnimating, heroSlides.length]);

  // Handle manual navigation
  const goToSlide = (index: any) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
    }
  };

  // Reset animation state after transitions
  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <motion.div
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: "100vh" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        {heroSlides.map((slide, index) => (
          currentSlide === index && (
            <motion.div 
              key={slide.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onAnimationComplete={handleAnimationComplete}
            >
              {slide.useVideo ? (
                <div className="absolute inset-0 w-full h-full">
                  <video
                    className="object-cover w-full h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={slide.video}
                    poster={slide.image}
                  />
                </div>
              ) : (
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              )}
              
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Swipe indicator overlay - shows briefly on initial load */}
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center opacity-0 animate-fadeOut">
        <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-white/80 text-lg font-light">Swipe to navigate</div>
        </div>
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-1" />

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4">
        <div className="flex flex-col justify-center h-full pt-16 md:pt-0 md:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              {/* Dynamic heading */}
              <motion.div 
                className="text-5xl md:text-7xl font-bold mb-4 text-glow"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {heroSlides[currentSlide].heading}
              </motion.div>
              
              {/* Dynamic subheading */}
              <motion.p
                className="text-lg md:text-xl opacity-80 text-[--popover-foreground] mb-8 font-light leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {heroSlides[currentSlide].subheading}
              </motion.p>
              
              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <CyberButton
                  href="/products"
                  className="cta-glow relative overflow-hidden group"
                  hoverEffect={true}
                >
                  <span className="relative z-10">Shop Now</span>
                  <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </CyberButton>

                <CyberButton
                  onClick={scrollToCategories}
                  className="border-white/30 text-white hover:border-secondary/50 transition-colors duration-300"
                >
                  Browse Categories
                </CyberButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>


      {/* Fixed and properly centered slide navigation dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-primary w-10" 
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced gradient fade to content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent"
        style={{ opacity: scrollYProgress }}
      />
    </motion.div>
  );
};

export default HeroSection;