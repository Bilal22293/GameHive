"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { useGlobalState } from "@/context/GlobalStateContext";
import { CartType } from "@/types";
import { fetchCart } from "@/lib/api";
import { relatedCart } from "@/lib/mockData";

const CartPage: React.FC = () => {
  const IsRegistered = true;
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const router = useRouter();

  // Mock loading cart items from storage/API
  useEffect(() => {
    const fetchCartItems = async () => {
      // Simulate API fetch delay
      // await new Promise(resolve => setTimeout(resolve, 800));
      try {
        const mockCartItems: CartType[] = await fetchCart();
        console.log(mockCartItems);
        setCartItems(mockCartItems);
      } catch {
        alert("Error Occured!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    // if (promoCode.toUpperCase() === 'HIVE25') {
    //   setPromoApplied(true);
    //   setDiscount(0.25); // 25% discount
    // } else {
    //   alert('Invalid promo code');
    //   setPromoApplied(false);
    //   setDiscount(0);
    // }
    setPromoApplied(true);
    setDiscount(0.25);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = promoApplied ? subtotal * discount : 0;
    return subtotal - discountAmount;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-glow">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Loading Pulse Animation */}
            <div className="lg:col-span-8">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg mb-4 overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="grid grid-cols-12 p-4">
                    <div className="col-span-12 sm:col-span-3 mb-4 sm:mb-0">
                      <div className="relative h-32 rounded-md bg-muted"></div>
                    </div>

                    <div className="col-span-12 sm:col-span-9 pl-0 sm:pl-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-5 w-5 bg-muted rounded-full"></div>
                        </div>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className="h-4 w-4 bg-muted rounded-full mr-1"
                              ></div>
                            ))}
                            <div className="ml-1 h-4 w-10 bg-muted rounded"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-end mt-4">
                        <div className="flex items-center">
                          <div className="bg-muted w-8 h-8 rounded-md"></div>
                          <div className="mx-3 h-6 w-6 bg-muted rounded"></div>
                          <div className="bg-muted w-8 h-8 rounded-md"></div>
                        </div>

                        <div className="mt-2 sm:mt-0">
                          <div className="h-6 w-16 bg-muted rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Loading */}
            <div className="lg:col-span-4">
              <div className="glass-card p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>

                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                    </div>
                  ))}

                  <div className="border-t border-border pt-4 flex justify-between">
                    <div className="h-6 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-1/4"></div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>

                <div className="h-12 bg-muted rounded w-full mb-4"></div>
                <div className="h-3 bg-muted rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-glow">Your Cart</h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 rounded-lg text-center"
          >
            <h2 className="text-xl mb-4">Your cart is empty</h2>
            <p className="mb-6 text-muted-foreground">
              Looks like you haven't added any products yet.
            </p>
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium"
            >
              Browse Products
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <AnimatePresence>
                {cartItems.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-lg mb-4 overflow-hidden shadow-lg relative group"
                  >

                    <div className="grid grid-cols-12 p-4">
                      {/* Image section with click handler and visual indicator */}
                      <div
                        className="col-span-12 sm:col-span-3 mb-4 sm:mb-0 cursor-pointer relative overflow-hidden"
                        onClick={() => router.push(`/item?id=${product.id}`)}
                      >
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                          <span className="bg-primary/80 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            View Details
                          </span>
                        </div>
                        <div className="relative h-32 overflow-hidden rounded-md">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                          />
                        </div>
                      </div>

                      <div className="col-span-12 sm:col-span-9 pl-0 sm:pl-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            {/* Product name with click handler and visual indicator */}
                            <div className="flex items-center">
                              <h3
                                className="text-lg font-medium mb-1 cursor-pointer hover:text-primary transition-colors flex items-center"
                                onClick={() =>
                                  router.push(`/item?id=${product.id}`)
                                }
                              >
                                {product.name}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 ml-2 text-primary opacity-70"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </h3>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(product.id);
                              }}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center mb-2">
                            <div className="flex items-center text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-primary"
                                      : "text-muted"
                                  }`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-sm text-muted-foreground">
                                ({product.reviewCount})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-end mt-4">
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(
                                  product.id,
                                  (product.quantity || 1) - 1
                                );
                              }}
                              className="bg-muted text-foreground w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              -
                            </button>
                            <span className="mx-3">{product.quantity}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(
                                  product.id,
                                  (product.quantity || 1) + 1
                                );
                              }}
                              className="bg-muted text-foreground w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="mt-2 sm:mt-0">
                            {product.originalPrice && (
                              <span className="text-muted-foreground line-through mr-2">
                                ${parseFloat(product.originalPrice.toFixed(2)) * (product.quantity ?? 1)}
                              </span>
                            )}
                            <span className="text-lg font-semibold text-glow">
                              ${parseFloat(product.price.toFixed(2)) * (product.quantity ?? 1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-6 rounded-lg sticky top-24"
              >
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount (25%)</span>
                      <span>
                        -${(calculateSubtotal() * discount).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-glow">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium mb-2"
                  >
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full bg-muted text-foreground px-4 py-2 rounded-md focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-secondary mt-2">
                      Promo code applied successfully!
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/buy")}
                  className="w-full btn-primary bg-primary text-primary-foreground py-3 rounded-md font-medium relative overflow-hidden"
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Secure checkout powered by GameHive Payment Systems
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-5 bg-muted rounded"></div>
                  <div className="w-8 h-5 bg-muted rounded"></div>
                  <div className="w-8 h-5 bg-muted rounded"></div>
                  <div className="w-8 h-5 bg-muted rounded"></div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCart.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
