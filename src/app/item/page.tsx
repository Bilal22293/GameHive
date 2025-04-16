// File: src/app/products/[id]/page.tsx (Product Detail Page)
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductType } from "@/types";
import { fetchProductById, addToCart } from "@/lib/api";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ProductReviews } from "@/components/ProductReviews";
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from "@/context/GlobalStateContext";
import { X, Check } from "lucide-react";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";


export default function ProductDetailPage() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  console.log(id);
  const productId = id as string;

  const IsRegistered = localStorage.getItem("IsRegistered");
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
        setSelectedImage(0);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
        // Trigger animations after content loads
        setTimeout(() => setAnimationStarted(true), 100);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    // Implement add to cart functionality
    if (IsRegistered) {
      addToCart(productId, quantity);
      console.log("Adding to cart:", product?.id, "quantity:", quantity);
      setShowToast(true);
    }
    else{
      setShowToast(true);
    }
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    setShowToast(false);
  }, 3000);
  };

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="glass-card rounded-lg p-6 animate-pulse"
          style={{ background: "var(--card)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted h-96 rounded-md"></div>
            <div>
              <div className="bg-muted h-8 rounded-md mb-4 w-3/4"></div>
              <div className="bg-muted h-6 rounded-md mb-4 w-1/4"></div>
              <div className="bg-muted h-4 rounded-md mb-6 w-full"></div>
              <div className="bg-muted h-12 rounded-md mb-4 w-1/3"></div>
              <div className="bg-muted h-12 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">
          Product not found
        </h1>
        <p className="mb-6 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="btn-primary px-6 py-3 rounded-md font-medium"
        >
          Return to Products
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{ background: "var(--background)" }}
    >
      <div className="container mx-auto px-4">
        {/* Product Details Section */}
        <div
          className={`glass-card rounded-lg shadow-md p-6 mb-8 ${
            animationStarted ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div
              className={`${
                animationStarted ? "animate-slideInLeft" : "opacity-0"
              }`}
            >
              <div className="relative h-96 mb-4 bg-card rounded-lg overflow-hidden group">
                <Image
                  src={
                    product.images[selectedImage] || "/api/placeholder/600/600"
                  }
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-24 bg-card rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 
                    ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    } hover:border-primary hover:shadow-md`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/api/placeholder/150/150"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div
              className={`${
                animationStarted ? "animate-slideInRight" : "opacity-0"
              }`}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex text-primary mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-primary"
                          : "text-muted"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-xl font-bold text-foreground mb-4">
                <span className="text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm line-through text-muted-foreground">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </p>

              <p className="text-muted-foreground mb-6">
                {product.shortDescription}
              </p>

              {/* Color and Size Options (if applicable) */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Color
                  </h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="h-8 w-8 rounded-full border border-muted cursor-pointer hover:shadow-glow transition-all duration-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="px-3 py-1 border border-muted rounded-md hover:border-primary hover:text-primary transition-colors duration-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Quantity
                </h3>
                <div className="flex items-center border border-muted rounded-md w-32 overflow-hidden">
                  <button
                    className="px-3 py-1 text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-foreground">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-1 text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="disabled:opacity-50 disabled:text-muted hover:cta-glow hover:-translate-y-1 w-full bg-primary text-black py-3 px-6 rounded-md font-medium transition-all duration-300 relative overflow-hidden"
                onClick={handleAddToCart}
                disabled={product.stockQuantity <= 0}
              >
                Add to Cart
              </button>

              {/* Product Metadata */}
              <div className="mt-6 border-t border-muted pt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>SKU: {product.sku}</span>
                  <span>
                    In Stock:{" "}
                    <span
                      className={
                        product.stockQuantity > 0
                          ? "text-secondary"
                          : "text-destructive"
                      }
                    >
                      {product.stockQuantity > 0 ? "Yes" : "No"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div
          className={`glass-card rounded-lg shadow-md mb-8 ${
            animationStarted ? "animate-scaleIn delay-200" : "opacity-0"
          }`}
        >
          <div className="border-b border-muted">
            <nav
              className="flex  overflow-x-auto scrollbar-hide"
              style={{
                overflowX: "scroll",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none; /* Chrome, Safari, Opera */
                }
              `}</style>
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-6 text-center border-b-2  text-xs transition-all duration-300 ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="animate-fadeIn">
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Product Description
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <p>{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="animate-fadeIn">
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Product Specifications
                </h2>
                <table className="min-w-full divide-y divide-muted">
                  <tbody className="divide-y divide-muted">
                    {product.specifications?.map((spec, index) => (
                      <tr
                        key={index}
                        className="hover:bg-muted/20 transition-colors duration-200"
                      >
                        <td className="py-3 text-sm font-medium text-foreground w-1/3">
                          {spec.name}
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="animate-fadeIn">
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Customer Reviews
                </h2>
                <ProductReviews productId={product.id} />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div
          className={`mb-8 ${
            animationStarted ? "animate-slideUp delay-300" : "opacity-0"
          }`}
        >
          <div className="flex items-center mb-6 ">
            <div className="h-px bg-muted flex-grow"></div>
            <h2 className="text-2xl font-bold px-4 text-glow  text-foreground">
              You May Also Like
            </h2>
            <div className="h-px bg-muted flex-grow"></div>
          </div>
          <RelatedProducts
            currentProductId={product.id}
            categoryId={product.category}
          />
        </div>
      </div>
      <AnimatePresence>
  {showToast && (
    <motion.div
      initial={{ opacity: 0, y: 20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-1/2 cta-glow bg-primary text-primary-foreground px-4 py-3 w-80 rounded-lg shadow-lg z-50 flex items-center"
    >
      {IsRegistered ? (
        <Check className="mr-2" size={20} color="black" />
      ) : (
        <X className="mr-2" size={20} color="black" />
      )}
      {IsRegistered ?`Item added to cart` : `Please login to add items to cart`}
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
