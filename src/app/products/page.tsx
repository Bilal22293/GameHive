"use client";

import { useState, useEffect, useRef } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SortingDropdown } from '@/components/SortingDropdown';
import { ProductType, FilterOptionsType } from '@/types';
import { fetchProducts } from '@/lib/api';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptionsType>({
    categories: category ? [category] : [],
    priceRange: [0, 1000],
    ratings: [],
    brands: []
  });
  const [sortOption, setSortOption] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const initialRenderRef = useRef(true);

  // Update filters when category URL param changes
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      categories: category ? [category] : prevFilters.categories
    }));
  }, [category]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        
        // Initialize filtered products with the same filter logic
        let initialFiltered = [...data];

        if (search && search.trim()) {
          const searchLower = search.toLowerCase().trim();
          initialFiltered = initialFiltered.filter(product => 
            product.name.toLowerCase().includes(searchLower) || 
            product.description.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            product.brand.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters.categories.length > 0) {
          initialFiltered = initialFiltered.filter(product => 
            filters.categories.includes(product.category)
          );
        }
        
        setFilteredProducts(initialFiltered);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
    
    // Initialize parallax effect
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filters.categories]); // Re-fetch when category filter changes

  useEffect(() => {
    // Skip the first render as we handle initial filtering in the data fetch
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }
    
    let result = [...products];
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    if (filters.brands.length > 0) {
      result = result.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    if (filters.ratings.length > 0) {
      result = result.filter(product => 
        filters.ratings.includes(Math.floor(product.rating))
      );
    }

    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result);
  }, [products, filters, sortOption]);

  const handleFilterChange = (newFilters: FilterOptionsType) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  // Card stagger animation for grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275]
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 70%, #141414 100%)" }}>
      {/* Animated grid background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(91, 227, 183, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 227, 183, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center center"
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-[var(--primary)] text-center text-glow animate-fadeIn">
          All Products
        </h1>
        <div className="section-divider mb-8 animate-fadeIn"></div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter dialog */}
          <button
            type="button"
            className="md:hidden inline-flex items-center px-4 py-2 border border-muted rounded-md bg-card text-foreground mb-4 hover:bg-muted transition-all duration-300 cta-glow animate-fadeIn"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <span className="mr-2">Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>

          {/* Sidebar with filters */}
          <aside 
            className={`md:block ${mobileFiltersOpen ? 'block animate-slideInLeft' : 'hidden'} md:w-64 w-full`}
          >
            <div className="glass-card rounded-lg p-4 border border-border animate-fadeIn">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 animate-fadeIn">
            <div className="flex justify-between items-center mb-6 glass-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground">
                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> results
              </p>
              <SortingDropdown value={sortOption} onChange={handleSortChange} />
            </div>

            {isLoading ? (
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
            ) : filteredProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                ref={gridRef}
                initial="hidden"
                animate="show"
                variants={container}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    className="product-card"
                    variants={item}
                    custom={index}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="glass-card text-center py-12 rounded-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-medium text-foreground">No products found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => {window.location.href = `/products`;}}
                  className="mt-4 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-all btn-primary cta-glow"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}