// Profile page with NextJS, TypeScript, and Tailwind CSS
// File: pages/profile.tsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Edit, Plus, MapPin, ShoppingBag, Mail, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { userData, orderHistory } from '@/lib/mockData'; // Mock data
import { CartType, AddressProps } from '@/types'; // Assuming you have a CartType defined in your types file


const AddressCard: React.FC<{ address: AddressProps, onEdit: () => void }> = ({ address, onEdit }) => {
  return (
    <motion.div 
      className="glass-card relative p-4 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <h3 className="font-medium text-lg">{address.name}</h3>
          {address.isDefault && (
            <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              Default
            </span>
          )}
        </div>
        <button 
          onClick={onEdit}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Edit size={16} />
        </button>
      </div>
      <div className="flex items-start space-x-2">
        <MapPin size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
        <div className="text-sm">
          <p>{address.street}</p>
          <p>{address.city}, {address.state} {address.zipCode}</p>
          <p>{address.country}</p>
        </div>
      </div>
    </motion.div>
  );
};


const OrderCard: React.FC<{ order: any }> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      className="glass-card rounded-lg overflow-hidden mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Order #{order.id}</p>
            <p className="text-xs text-muted-foreground">{order.date}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">${order.total.toFixed(2)}</div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-secondary">
              {order.status}
            </span>
          </div>
        </div>
      </div>
      
      {expanded && (
        <motion.div 
          className="px-4 pb-4 pt-1 border-t border-border"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="md:grid md:grid-cols-2 gap-4">
            {order.products.map((product: CartType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const AddressForm: React.FC<{ 
  onClose: () => void, 
  initialAddress?: AddressProps,
  onSave: (address: Omit<AddressProps, 'id'> & { id?: string }) => void 
}> = ({ onClose, initialAddress, onSave }) => {
  const [addressData, setAddressData] = useState<Omit<AddressProps, 'id'> & { id?: string }>(
    initialAddress || {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressData({
      ...addressData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(addressData);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-card rounded-lg shadow-lg w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-medium">
            {initialAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address Name</label>
            <input
              type="text"
              name="name"
              value={addressData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
              placeholder="Home, Work, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <input
              type="text"
              name="street"
              value={addressData.street}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
              placeholder="Street address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={addressData.state}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
                placeholder="State"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={addressData.zipCode}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
                placeholder="Zip code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={addressData.country}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-muted text-foreground border border-input focus:border-primary transition-colors"
                placeholder="Country"
                required
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={addressData.isDefault}
              onChange={handleChange}
              className="rounded border-input text-primary focus:ring-primary"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm">
              Set as default address
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save Address
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const ProfilePage: React.FC = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressProps | null>(null);
  const [addresses, setAddresses] = useState(userData.shippingAddresses);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: AddressProps) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleSaveAddress = (addressData: Omit<AddressProps, 'id'> & { id?: string }) => {
    if (addressData.id) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === addressData.id ? { ...addressData, id: addr.id } as AddressProps : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...addressData,
        id: `addr${Date.now()}`
      } as AddressProps;
      
      setAddresses([...addresses, newAddress]);
    }
    setShowAddressForm(false);
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-glow">My Profile</h1>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div 
            className="glass-card rounded-lg p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary cta-glow">
                <Image 
                  src={userData.avatar}
                  alt="Profile Avatar"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Mail size={14} className="mr-1" />
                {userData.email}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Shipping Addresses</h3>
                <button 
                  onClick={handleAddAddress}
                  className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  Add New
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <AddressCard 
                    key={address.id} 
                    address={address} 
                    onEdit={() => handleEditAddress(address)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div 
            className="glass-card rounded-lg p-6 col-span-1 lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <ShoppingBag className="text-primary mr-2" size={24} />
              <h2 className="text-xl font-semibold">Order History</h2>
            </div>

            <div className="space-y-4">
              {orderHistory.length > 0 ? (
                orderHistory.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <OrderCard order={order} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No orders found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <AddressForm 
          onClose={() => setShowAddressForm(false)}
          initialAddress={editingAddress || undefined}
          onSave={handleSaveAddress}
        />
      )}
    </div>
  );
};

export default ProfilePage;