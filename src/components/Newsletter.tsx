"use client";

import { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Implement newsletter subscription logic here
    console.log('Subscribing email:', email);
    
    // Simulate success
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div className="p-8 rounded-lg max-w-xl mx-auto animate-fadeIn">
      <h3 className="text-2xl font-bold mb-3 text-glow animate-slideUp">Subscribe to Our Newsletter</h3>
      <p className="mb-6 text-muted-foreground animate-slideUp delay-100">
        Stay updated with our latest products, offers, and news.
      </p>

      {isSubmitted ? (
        <div className="bg-accent/20 border border-accent text-accent-foreground px-4 py-3 rounded-lg animate-scaleIn">
          <p>Thanks for subscribing! We'll keep you updated with the latest offers.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="animate-slideUp delay-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md bg-muted border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="btn-primary bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-md transition-all duration-300 cta-glow"
            >
              Subscribe
            </button>
          </div>
          {error && <p className="mt-2 text-destructive animate-fadeIn">{error}</p>}
        </form>
      )}
    </div>
  );
};