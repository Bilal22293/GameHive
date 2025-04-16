// File: src/components/FeaturedProducts.tsx
"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductType } from '@/types';
import { fetchFeaturedProducts } from '@/lib/api';

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-[#121212] rounded-lg shadow-md p-4 h-64 animate-pulse">
            <div className="bg-[#2E2E2E] h-40 rounded-md mb-4"></div>
            <div className="bg-[#2E2E2E] h-6 rounded-md mb-2"></div>
            <div className="bg-[#2E2E2E] h-4 rounded-md w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.slice(0, 4).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};