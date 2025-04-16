// File: src/types/index.ts
export interface ProductType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  sku: string;
  stockQuantity: number;
  onSale: boolean;
  createdAt: string;
  specifications?: Array<{ name: string; value: string }>;
  colors?: string[];
  sizes?: string[];
  label?: string;
}

export interface FilterOptionsType {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  ratings: number[];
}

export interface CartType {
  id: string;
  name: string;
  images: string[];
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  onSale: boolean;
  quantity?: number | null;
  label?: string;
}

export interface AddressProps {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  recipientName?: string;
}
