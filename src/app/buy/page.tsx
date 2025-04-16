// Checkout page with NextJS, TypeScript, and Tailwind CSS
// File: pages/checkout.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  Check, 
  CreditCard, 
  Truck, 
  ShoppingBag, 
  Package, 
  ArrowLeft,
  MapPin,
  Plus,
  Minus,
} from 'lucide-react';
import {CartType, AddressProps} from '@/types';
import { cart } from '@/lib/mockData'; // Mock data import

type PaymentMethod = 'credit-card' | 'paypal' | 'crypto';
type ShippingMethod = 'standard' | 'express' | 'overnight';

const addresses: AddressProps[] = [
  {
    id: "addr1",
    name: "Home",
    recipientName: "Alex Morgan",
    street: "123 Cyber Street",
    city: "Neo City",
    state: "CA",
    zipCode: "90210",
    country: "USA",
    isDefault: true
  },
  {
    id: "addr2",
    name: "Work",
    recipientName: "Alex Morgan",
    street: "456 Digital Avenue",
    city: "Neo City",
    state: "CA",
    zipCode: "90211",
    country: "USA",
    isDefault: false
  }
];

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 7.99, estimatedDays: '3-5 days' },
  { id: 'express', name: 'Express Shipping', price: 14.99, estimatedDays: '2-3 days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, estimatedDays: '1 day' }
];

// Checkout steps
const STEPS = [
  { id: 'info', label: 'Information' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        {STEPS.map((step, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <motion.div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep > index
                  ? 'bg-primary text-primary-foreground'
                  : currentStep === index
                    ? 'bg-primary/70 text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'bg-muted text-muted-foreground'
              }`}
              initial={{ scale: 0.8 }}
              animate={{
                scale: currentStep === index ? 1.1 : 1,
                backgroundColor: currentStep > index ? 'var(--primary)' : currentStep === index ? 'var(--primary)' : 'var(--muted)'
              }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > index ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>
            <span className={`text-sm font-medium ${currentStep >= index ? 'text-primary' : 'text-muted-foreground'}`}>
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <motion.div 
                className="h-px w-16 bg-muted"
                animate={{ 
                  backgroundColor: currentStep > index ? 'var(--primary)' : 'var(--muted)',
                  opacity: currentStep > index ? 1 : 0 
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Cart summary component
const CartSummary: React.FC<{ 
  cartItems: CartType[], 
  shippingCost: number,
  showDetails: boolean,
  onQuantityChange?: (id: string, newQuantity: number) => void
}> = ({ cartItems, shippingCost, showDetails, onQuantityChange }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax + shippingCost;
  
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className={`p-4 border-b border-border ${showDetails ? '' : 'cursor-pointer'}`}>
        <h3 className="font-medium text-lg mb-2">Order Summary</h3>
        
        {showDetails && (
          <div className="space-y-4 mt-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <div className="flex items-center text-sm mt-1">
                    <span className={`${item.onSale && item.originalPrice ? 'text-secondary' : ''}`}>
                      ${item.price.toFixed(2)}
                    </span>
                    {item.onSale && item.originalPrice && (
                      <span className="ml-2 text-xs line-through text-muted-foreground">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                
                {onQuantityChange && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onQuantityChange(item.id, Math.max(1,(item.quantity || 1) - 1))}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(item.id, (item.quantity || 1) + 1)}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                )}
                
                {!onQuantityChange && (
                  <div className="text-sm">
                    x{item.quantity}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-border my-2"></div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary"
          >
            ${total.toFixed(2)}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

// Address card component
const AddressCard: React.FC<{ 
  address: AddressProps, 
  isSelected: boolean,
  onSelect: () => void
}> = ({ address, isSelected, onSelect }) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
          : 'border-border hover:border-primary/40'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <h3 className="font-medium">{address.name}</h3>
          {address.isDefault && (
            <span className="ml-2 text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">
              Default
            </span>
          )}
        </div>
        <div className="w-5 h-5 rounded-full border flex items-center justify-center">
          {isSelected && <div className="w-3 h-3 rounded-full bg-primary"></div>}
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <p className="text-muted-foreground">{address.recipientName}</p>
        <p>{address.street}</p>
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p>{address.country}</p>
      </div>
    </div>
  );
};

// Shipping method component
const ShippingMethodCard: React.FC<{
  method: { id: string; name: string; price: number; estimatedDays: string; },
  isSelected: boolean,
  onSelect: () => void
}> = ({ method, isSelected, onSelect }) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
          : 'border-border hover:border-primary/40'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{method.name}</h3>
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {method.estimatedDays}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Estimated delivery time after shipping
          </p>
        </div>
        
        <div className="flex items-center">
          <span className="mr-3 font-medium">${method.price.toFixed(2)}</span>
          <div className="w-5 h-5 rounded-full border flex items-center justify-center">
            {isSelected && <div className="w-3 h-3 rounded-full bg-primary"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment method component
const PaymentMethodCard: React.FC<{
  method: PaymentMethod,
  label: string,
  isSelected: boolean,
  icon: React.ReactNode,
  onSelect: () => void
}> = ({ method, label, isSelected, icon, onSelect }) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
          : 'border-border hover:border-primary/40'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 text-primary">
            {icon}
          </div>
          <h3 className="font-medium">{label}</h3>
        </div>
        
        <div className="w-5 h-5 rounded-full border flex items-center justify-center">
          {isSelected && <div className="w-3 h-3 rounded-full bg-primary"></div>}
        </div>
      </div>
    </div>
  );
};

// Checkout page component
const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState<CartType[]>(cart);
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses.find(a => a.isDefault)?.id || '');
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>('standard');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit-card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Get current shipping cost based on selected shipping method
  const getShippingCost = () => {
    const method = shippingOptions.find(opt => opt.id === selectedShipping);
    return method ? method.price : shippingOptions[0].price;
  };
  
  // Handle quantity changes
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Handle continue to next step
  const handleContinue = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Process order
      setIsProcessing(true);
      
      // Simulate order processing
      setTimeout(() => {
        setIsProcessing(false);
        setOrderComplete(true);
      }, 2000);
    }
  };
  
  // Handle back to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle card input changes
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ') || '';
  };
  
  // Format expiry date
  const formatExpiry = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/\//g, '')
      .replace(/^(.{2})(.+)$/, '$1/$2');
  };
  
  // Order completion screen
  if (orderComplete) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200, 
                damping: 10,
                delay: 0.2 
              }}
            >
              <Check size={48} className="text-primary" />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-2">Order Completed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. We've sent a confirmation to your email.
            </p>
            
            <div className="mt-8 space-y-2">
              <motion.div
                className="bg-card p-4 rounded-lg max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-medium">#ORD-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">
                    {new Date(Date.now() + 86400000 * 3).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => router.push('/products')}
                className="btn-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-8 py-3 rounded-lg"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-glow">Checkout</h1>
          <div className="section-divider" />
        </motion.div>
        
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Step 1: Information */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MapPin className="mr-2 text-primary" size={24} />
                  Shipping Address
                </h2>
                
                <div className="grid gap-4">
                  {addresses.map(address => (
                    <AddressCard 
                      key={address.id}
                      address={address}
                      isSelected={selectedAddress === address.id}
                      onSelect={() => setSelectedAddress(address.id)}
                    />
                  ))}
                  
                  <button 
                    className="border border-dashed border-border rounded-lg p-4 flex items-center justify-center hover:border-primary/40 transition-colors"
                  >
                    <Plus size={18} className="mr-2" />
                    <span>Add New Address</span>
                  </button>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleContinue}
                    disabled={!selectedAddress}
                    className="btn-primary px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Continue to Shipping
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Shipping */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Truck className="mr-2 text-primary" size={24} />
                  Shipping Method
                </h2>
                
                <div className="space-y-4">
                  {shippingOptions.map(method => (
                    <ShippingMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedShipping === method.id}
                      onSelect={() => setSelectedShipping(method.id as ShippingMethod)}
                    />
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleContinue}
                    className="btn-primary px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
                  >
                    Continue to Payment
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Payment */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="mr-2 text-primary" size={24} />
                  Payment Method
                </h2>
                
                <div className="space-y-4 mb-8">
                  <PaymentMethodCard
                    method="credit-card"
                    label="Credit / Debit Card"
                    isSelected={selectedPayment === 'credit-card'}
                    icon={<CreditCard size={20} />}
                    onSelect={() => setSelectedPayment('credit-card')}
                  />
                  
                  <PaymentMethodCard
                    method="paypal"
                    label="PayPal"
                    isSelected={selectedPayment === 'paypal'}
                    icon={<div className="text-blue-500 font-bold">P</div>}
                    onSelect={() => setSelectedPayment('paypal')}
                  />
                  
                  <PaymentMethodCard
                    method="crypto"
                    label="Cryptocurrency"
                    isSelected={selectedPayment === 'crypto'}
                    icon={<div className="text-yellow-500 font-bold">₿</div>}
                    onSelect={() => setSelectedPayment('crypto')}
                  />
                </div>
                
                {selectedPayment === 'credit-card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mb-6"
                  >
                    <div className="glass-card rounded p-1">
                      <div className="p-3 space-y-4">
                        <div>
                          <label className="block text-sm mb-1">Card Number</label>
                          <input
                            type="text"
                            name="number"
                            value={formatCardNumber(cardDetails.number)}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, '');
                              if (/^\d*$/.test(value) && value.length <= 16) {
                                handleCardInputChange({
                                  ...e,
                                  target: { ...e.target, value }
                                });
                              }
                            }}
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-2 rounded bg-muted text-foreground border border-input focus:border-primary transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            name="name"
                            value={cardDetails.name}
                            onChange={handleCardInputChange}
                            placeholder="Name on card"
                            className="w-full p-2 rounded bg-muted text-foreground border border-input focus:border-primary transition-colors"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-1">Expiry Date</label>
                            <input
                              type="text"
                              name="expiry"
                              value={formatExpiry(cardDetails.expiry)}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, '').replace(/\//g, '');
                                if (/^\d*$/.test(value) && value.length <= 4) {
                                  handleCardInputChange({
                                    ...e,
                                    target: { ...e.target, value }
                                  });
                                }
                              }}
                              placeholder="MM/YY"
                              className="w-full p-2 rounded bg-muted text-foreground border border-input focus:border-primary transition-colors"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1">CVC</label>
                            <input
                              type="text"
                              name="cvc"
                              value={cardDetails.cvc}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && value.length <= 3) {
                                  handleCardInputChange(e);
                                }
                              }}
                              placeholder="123"
                              className="w-full p-2 rounded bg-muted text-foreground border border-input focus:border-primary transition-colors"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          {/* <LockClosed size={12} className="mr-1" /> */}
                          Your payment information is encrypted and secure
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleContinue}
                    className="btn-primary px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
                    disabled={selectedPayment === 'credit-card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc)}
                  >
                    Review Order
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Review */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Package className="mr-2 text-primary" size={24} />
                  Review Order
                </h2>
                
                <div className="space-y-6">
                  {/* Shipping Address */}
                  <div className="glass-panel p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium flex items-center">
                        <MapPin size={16} className="mr-2 text-muted-foreground" />
                        Shipping Address
                      </h3>
                      <button 
                        onClick={() => setCurrentStep(0)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                    
                    {selectedAddress && (
                      <div className="text-sm">
                        {(() => {
                          const address = addresses.find(a => a.id === selectedAddress);
                          return address ? (
                            <>
                              <p className="font-medium">{address.name}</p>
                              <p>{address.recipientName}</p>
                              <p>{address.street}</p>
                              <p>{address.city}, {address.state} {address.zipCode}</p>
                              <p>{address.country}</p>
                            </>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </div>
                  
                  {/* Shipping Method */}
                  <div className="glass-panel p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium flex items-center">
                        <Truck size={16} className="mr-2 text-muted-foreground" />
                        Shipping Method
                      </h3>
                      <button 
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                    
                    <div className="text-sm">
                      {(() => {
                        const method = shippingOptions.find(s => s.id === selectedShipping);
                        return method ? (
                          <>
                            <p className="font-medium">{method.name} (${method.price.toFixed(2)})</p>
                            <p className="text-muted-foreground">Estimated delivery: {method.estimatedDays}</p>
                          </>
                        ) : null;
                      })()}
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="glass-panel p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium flex items-center">
                        <CreditCard size={16} className="mr-2 text-muted-foreground" />
                        Payment Method
                      </h3>
                      <button 
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                    
                    <div className="text-sm">
                      {selectedPayment === 'credit-card' && (
                        <>
                          <p className="font-medium">Credit Card</p>
                          {cardDetails.number && (
                            <p className="text-muted-foreground">
                              **** **** **** {cardDetails.number.slice(-4)}
                            </p>
                          )}
                        </>
                      )}
                      
                      {selectedPayment === 'paypal' && (
                        <p className="font-medium">PayPal</p>
                      )}
                      
                      {selectedPayment === 'crypto' && (
                        <p className="font-medium">Cryptocurrency</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Items */}
                  <div className="glass-panel p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium flex items-center">
                        <ShoppingBag size={16} className="mr-2 text-muted-foreground" />
                        Order Items ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)})
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0 relative">
                            <Image 
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{item.name}</h4>
                          </div>
                          <div className="text-sm">
                            <span>
                              ${item.price.toFixed(2)} x {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleContinue}
                    disabled={isProcessing}
                    className="btn-primary px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center relative"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div 
                          className="w-4 h-4 border-2 border-primary-foreground border-r-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Order
                        <ChevronRight size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Order summary */}
          <div>
            <CartSummary 
              cartItems={cartItems} 
              shippingCost={getShippingCost()}
              showDetails={currentStep <= 1}
              onQuantityChange={currentStep === 0 ? handleQuantityChange : undefined}
            />
            
            {/* Optional promo code section */}
            {currentStep <= 1 && (
              <motion.div 
                className="glass-card rounded-lg p-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium mb-2">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 p-2 rounded-l-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
                  />
                  <button className="px-4 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors">
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Security notice */}
            <motion.div 
              className="mt-4 text-sm text-muted-foreground flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* <LockClosed size={14} className="mr-2" /> */}
              Secure checkout powered by industry-leading encryption
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

// Add this to your global CSS file

/*
.glass-card {
  background: rgba(30, 30, 40, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.glass-panel {
  background: rgba(25, 25, 35, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.text-glow {
  text-shadow: 0 0 10px rgba(255, 206, 61, 0.5);
}

.section-divider {
  height: 1px;
  width: 60px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  margin: 8px auto;
}

.btn-primary {
  position: relative;
  overflow: hidden;
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  transition: all 0.3s ease;
  opacity: 0;
}

.btn-primary:hover::after {
  opacity: 1;
  transform: rotate(45deg) translateX(100%);
  transition: all 0.7s ease;
}

:root {
  --primary: #FFCE3D;
  --primary-rgb: 255, 206, 61;
  --primary-foreground: #121212;
  --secondary: #5BE3B7;
  --background: #121318;
  --foreground: #F0F0F0;
  --card: #1A1B23;
  --muted: #292A35;
  --muted-foreground: #A0A0A0;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.15);
}
*/