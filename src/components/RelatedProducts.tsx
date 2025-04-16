// File: src/components/RelatedProducts.tsx
"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductType } from '@/types';
import { fetchRelatedProducts } from '@/lib/api';

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, categoryId }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRelatedProducts(currentProductId, categoryId);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentProductId, categoryId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="glass-card rounded-lg shadow-md p-4 h-64 animate-pulse">
            <div className="bg-muted h-40 rounded-md mb-4"></div>
            <div className="bg-muted h-6 rounded-md mb-2"></div>
            <div className="bg-muted h-4 rounded-md w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};