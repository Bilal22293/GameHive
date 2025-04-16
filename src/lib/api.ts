// File: src/lib/api.ts
// Mock API functions for demonstration purposes
// In a real app, these would connect to your backend API

import { ProductType, CartType } from '@/types';
import { products, cart } from './mockData';

const sampleCart: CartType[] = cart;


// Sample data
const sampleProducts: ProductType[] = products

// Categories
const categories = [
  { id: 'console', name: 'Consoles', image: '/console.png' },
  { id: 'gear', name: 'Retro Gears', image: '/retro.png' },
  { id: 'games', name: 'Games', image: '/game.png' },
  { id: 'accessories', name: 'Accessories', image: '/accessories.png' },
  { id: 'pc', name: 'Gaming Laptops', image: '/laptop.png' },
  { id: 'merch', name: 'Merch', image: '/merch.png' },
];

// Brands
const brands = [
  { id: 'sony', name: 'Sony' },
  { id: 'xbox', name: 'Xbox' },
  { id: 'nintendo', name: 'Nintendo' },
  { id: 'asus', name: 'Asus' },
  { id: 'logitech', name: 'Logitech' },
  { id: 'hp', name: 'HP' },
  { id: 'lenovo', name: 'Lenovo' },
];

// Reviews
const reviews = [
  {
    id: '101',
    productId: '1',
    userName: 'John D.',
    rating: 5,
    date: '2023-12-01',
    title: 'Amazing sound quality!',
    comment: 'These headphones have incredible sound clarity and the noise cancellation is top-notch. Battery life is exactly as advertised.'
  },
  {
    id: '102',
    productId: '1',
    userName: 'Sarah M.',
    rating: 4,
    date: '2023-11-15',
    title: 'Great headphones, but a bit pricey',
    comment: 'The sound quality and noise cancellation are excellent, but I wish they were a bit more affordable. Still, a good investment for music lovers.'
  },
  {
    id: '103',
    productId: '1',
    userName: 'Mike T.',
    rating: 5,
    date: '2023-10-22',
    title: 'Perfect for travel',
    comment: 'Used these on a long flight and they were perfect. Comfortable to wear for hours and the noise cancellation made the journey so much more pleasant.'
  }
];


export const fetchCart = async (): Promise<CartType[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return sampleCart;
}

export const addToCart = async (id: string, quantity: number): Promise<void> =>{
  await new Promise(resolve => setTimeout(resolve, 800));
  const product = sampleProducts.find(p => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  const existingItem = sampleCart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 0) + (quantity || 1);
    console.log('Item quantity updated:', existingItem);
    return;
  }
  const newItem: CartType = {
    id: product.id,
    name: product.name,
    images: product.images,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    onSale: product.onSale,
    quantity: quantity || 1,
  };
  sampleCart.push(newItem);
  console.log('Item added to cart:', newItem);
}

// API functions
export const fetchProducts = async (): Promise<ProductType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return sampleProducts;
};

export const fetchProductById = async (id: string): Promise<ProductType> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = sampleProducts.find(p => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const fetchFeaturedProducts = async (): Promise<ProductType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  // Return a subset of products marked as featured
  return sampleProducts.filter((_, index) => index < 4);
};

export const fetchCategories = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return categories;
};

export const fetchBrands = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return brands;
};

export const fetchRelatedProducts = async (currentProductId: string, categoryId: string): Promise<ProductType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  // Return other products in the same category
  return sampleProducts
    .filter(p => p.category === categoryId && p.id !== currentProductId)
    .slice(0, 4);
};

export const fetchProductReviews = async (productId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return reviews.filter(review => review.productId === productId);
};