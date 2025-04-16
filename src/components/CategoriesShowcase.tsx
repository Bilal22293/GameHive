// File: src/components/CategoriesShowcase.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategories } from '@/lib/api';

interface Category {
  id: string;
  name: string;
  image: string;
}

export const CategoriesShowcase: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    // Rotate active category every 3 seconds
    if (categories.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % categories.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [categories.length]);

  useEffect(() => {
    // Intersection Observer to trigger visibility
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-8">
      {/* Horizontal Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {categories.map((category, index) => (
          <Link
            key={`card-${category.id}`}
            href={`/products?category=${category.id}`}
            className={`
              group relative h-40 sm:h-48 md:h-40 rounded-lg overflow-hidden transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ 
              height: '300px',
              transitionDelay: `${index * 0.1}s`,
              // background: 'var(--card)',
            }}
          >
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={category.image || `/api/placeholder/400/200`}
                alt={category.name}
                fill
                className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 "></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-6">
              <h3 className="text-3xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm  mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Discover our {category.name.toLowerCase()} collection
              </p>
            </div>
            
            {/* Arrow indicator */}
            <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};