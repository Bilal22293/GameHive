// File: src/components/FilterSidebar.tsx
import { useState, useEffect } from 'react';
import { FilterOptionsType } from '@/types';
import { fetchCategories, fetchBrands } from '@/lib/api';

interface FilterSidebarProps {
  filters: FilterOptionsType;
  onFilterChange: (filters: FilterOptionsType) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const loadFilterOptions = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, brandsData] = await Promise.all([
          fetchCategories(),
          fetchBrands()
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleBrandChange = (brandId: string) => {
    const updatedBrands = filters.brands.includes(brandId)
      ? filters.brands.filter(id => id !== brandId)
      : [...filters.brands, brandId];
    
    onFilterChange({
      ...filters,
      brands: updatedBrands
    });
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    
    onFilterChange({
      ...filters,
      ratings: updatedRatings
    });
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const applyPriceRange = () => {
    onFilterChange({
      ...filters,
      priceRange
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      ratings: [],
      priceRange: [0, 1000]
    });
    setPriceRange([0, 1000]);
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-lg p-4 animate-pulse">
        <div className="h-6 bg-muted rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded w-3/4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-lg p-5 border border-muted transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-foreground animate-fadeIn">
          <span className="text-glow">Filters</span>
        </h3>
        <button 
          onClick={clearAllFilters}
          className="text-sm text-primary hover:text-secondary transition-colors duration-300 animate-fadeIn flex items-center gap-1"
        >
          <span>Clear All</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 6L5 20M5 6l14 14"/>
          </svg>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="mb-8 animate-slideInLeft delay-100">
        <h4 className="font-medium text-foreground mb-3 border-b border-muted pb-2">Categories</h4>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={category.id} className={`flex items-center transition-all duration-300 hover:translate-x-1`} style={{animationDelay: `${100 + index * 40}ms`}}>
              <div className="relative">
                <input
                  id={`category-${category.id}`}
                  type="checkbox"
                  className="peer h-4 w-4 opacity-0 absolute"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <div className={`h-5 w-5 border ${filters.categories.includes(category.id) ? 'border-primary bg-primary/20' : 'border-muted'} rounded-sm transition-all duration-300 flex items-center justify-center`}>
                  {filters.categories.includes(category.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
              <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-foreground hover:text-primary transition-colors duration-300">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="mb-8 animate-slideInLeft delay-200">
        <h4 className="font-medium text-foreground mb-3 border-b border-muted pb-2">Brands</h4>
        <div className="space-y-3">
          {brands.map((brand, index) => (
            <div key={brand.id} className={`flex items-center transition-all duration-300 hover:translate-x-1`} style={{animationDelay: `${200 + index * 40}ms`}}>
              <div className="relative">
                <input
                  id={`brand-${brand.id}`}
                  type="checkbox"
                  className="peer h-4 w-4 opacity-0 absolute"
                  checked={filters.brands.includes(brand.id)}
                  onChange={() => handleBrandChange(brand.id)}
                />
                <div className={`h-5 w-5 border ${filters.brands.includes(brand.id) ? 'border-primary bg-primary/20' : 'border-muted'} rounded-sm transition-all duration-300 flex items-center justify-center`}>
                  {filters.brands.includes(brand.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
              <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm text-foreground hover:text-primary transition-colors duration-300">
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8 animate-slideInLeft delay-300">
        <h4 className="font-medium text-foreground mb-3 border-b border-muted pb-2">Price Range</h4>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-secondary">${priceRange[0]}</span>
            <span className="text-sm text-secondary">${priceRange[1]}</span>
          </div>
          <div className="flex space-x-4 py-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          <button
            onClick={applyPriceRange}
            className="w-full bg-primary  text-black cta-glow py-2 px-4 rounded-md text-sm transition-all duration-300 border border-primary/30  font-medium"
          >
            Apply Price Range
          </button>
        </div>
      </div>

      {/* Ratings Filter */}
      <div className="animate-slideInLeft delay-400">
        <h4 className="font-medium text-foreground mb-3 border-b border-muted pb-2">Customer Ratings</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className={`flex items-center transition-all duration-300 hover:translate-x-1`} style={{animationDelay: `${300 + index * 40}ms`}}>
              <div className="relative">
                <input
                  id={`rating-${rating}`}
                  type="checkbox"
                  className="peer h-4 w-4 opacity-0 absolute"
                  checked={filters.ratings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
                <div className={`h-5 w-5 border ${filters.ratings.includes(rating) ? 'border-primary bg-primary/20' : 'border-muted'} rounded-sm transition-all duration-300 flex items-center justify-center`}>
                  {filters.ratings.includes(rating) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
              <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center text-sm text-foreground hover:text-primary transition-colors duration-300">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`${i < rating ? "text-primary" : "text-muted"} transition-colors duration-300`}>★</span>
                ))}
                <span className="ml-1">& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};