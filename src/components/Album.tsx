import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface AlbumCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
  showControls?: boolean;
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({
  images,
  interval = 1000,
  showControls = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [goToNext, interval, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative md:w-200 h-100 md:h-150 lg:h-150"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Controls */}
      {showControls && (
        <>
          <button
            onClick={goToPrev}
            className="absolute bottom-0 right-1/2 z-20 transform -translate-y-1/2 bg-opacity-70 bg-gray-500 text-gray-800 p-2 rounded-lg shadow-md transition-all"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute  bottom-0 left-1/2 z-20 transform bg-opacity-80 translate-x-3 -translate-y-1/2 bg-opacity-70 bg-gray-500 hover:bg-opacity-100 text-gray-800 p-2 rounded-lg shadow-md transition-all"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Stacked Images */}
      {images.map((image, index) => {
        const stackPosition = (index - currentIndex + images.length) % images.length;
        
        return (
          <div
            key={index}
            className={`hover:scale-105 absolute transition-all duration-500 ease-in-out rounded-lg shadow-lg overflow-hidden cursor-pointer ${
              stackPosition === 0 ? 'z-10' : 'z-0'
            }`}
            style={{
              width: '80%',
              height: '80%',
              left: `${10 + stackPosition * 5}%`,
              top: `${10 + stackPosition * 5}%`,
              transform: `scale(${1 - stackPosition * 0.05}) rotate(${stackPosition * 2}deg)`,
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={stackPosition === 0}
            />
          </div>
        );
      })}

    </div>
  );
};

export default AlbumCarousel;