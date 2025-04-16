// File: src/components/ProductCard.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartType } from '@/types';


interface ProductCardProps {
  product: CartType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCardClick = () => {
    router.push(`/item?id=${product.id}`);
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Moving border container - uses CSS animations defined in global.css */}
      {isHovered && (
        <div className="absolute inset-0 z-0 rounded-lg border-2 border-[--primary] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-[--secondary] after:absolute after:inset-0 after:rounded-lg after:border-2 after:border-[var(--chart-1)]" 
          style={{
            borderRadius: 'var(--radius)',
            animation: 'borderMove 2s linear infinite',
          }}
        />
      )}

      {/* Card content */}
      <div className="bg-[--card] rounded-lg shadow-md n transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 relative z-10">
        <div className="relative h-48 bg-gray-100">
          <img
            src={product.images[0] || "/console.png"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.label && (
  <div className="absolute top-2 right-2 z-10">
    <div className="relative">
      {/* Glowing backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded blur-sm opacity-70"></div>
      
      {/* Label content with tech style */}
      <span className="relative flex items-center bg-card/80 backdrop-blur-sm border border-primary/50 text-primary font-mono text-xs font-bold px-3 py-1 rounded-md">
        <span className="mr-1.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
        {product.label}
      </span>
    </div>
  </div>
)}
        </div>
        <div className="p-4">
          <h3 className="text-white font-medium mb-1 truncate">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-[--primary] text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-[--primary]" : "text-[--muted]"}>★</span>
              ))}
            </div>
            <span className="text-xs text-[--muted-foreground] ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-[--muted-foreground] line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global.css file */}
      <style jsx>{`
        @keyframes borderMove {
          0% {
            clip-path: inset(0 98% 98% 0);
          }
          25% {
            clip-path: inset(0 0 98% 0);
          }
          50% {
            clip-path: inset(0 0 0 98%);
          }
          75% {
            clip-path: inset(98% 0 0 0);
          }
          100% {
            clip-path: inset(0 98% 98% 0);
          }
        }
      `}</style>
    </div>
  );
};