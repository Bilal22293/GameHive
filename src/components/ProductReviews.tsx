// File: src/components/ProductReviews.tsx
"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { fetchProductReviews } from '@/lib/api';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

interface ProductReviewsProps {
  productId: string;
}

// Modal Component
const ReviewModalContent: React.FC<{
  onClose: () => void;
  onSubmit: (review: Review) => void;
  review: {
    rating: number;
    title: string;
    comment: string;
  };
  setReview: React.Dispatch<React.SetStateAction<{
    rating: number;
    title: string;
    comment: string;
  }>>;
  hoveredStar: number;
  setHoveredStar: (val: number) => void;
  reviewSubmitted: boolean;
}> = ({ onClose, onSubmit, review, setReview, hoveredStar, setHoveredStar, reviewSubmitted }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: `temp-${Date.now()}`,
      userName: 'You',
      rating: review.rating,
      date: new Date().toLocaleDateString(),
      title: review.title,
      comment: review.comment,
    });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card p-6 rounded-lg w-full max-w-lg mx-4 animate-fadeIn space-y-4 relative">
        <h2 className="text-xl font-semibold text-foreground">Write a Review</h2>

        <div className="flex space-x-1 text-2xl cursor-pointer">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`transition-all ${
                i < (hoveredStar || review.rating) ? 'text-yellow-400 scale-110' : 'text-muted'
              }`}
              onMouseEnter={() => setHoveredStar(i + 1)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => {
                setReview({ ...review, rating: i + 1 });
              }}
            >
              ★
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            className="w-full px-4 py-2 rounded-md border bg-background text-foreground"
            required
          />
          <textarea
            name="comment"
            placeholder="Your review"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            className="w-full px-4 py-2 rounded-md border h-28 bg-background text-foreground"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-muted text-foreground">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2 rounded font-medium">
              {reviewSubmitted ? 'Submitted!' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductReviews(productId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch product reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-card p-4 rounded-lg animate-pulse">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
              <div>
                <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </div>
            </div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-1"></div>
            <div className="h-4 bg-muted rounded w-full mb-1"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {reviews.length === 0 ? (
          <div className="text-center py-8 glass-card rounded-lg animate-fadeIn">
            <p className="text-muted-foreground mb-6">No reviews yet. Be the first to review this product!</p>
            <button 
              className="btn-primary py-2 px-6 rounded-md font-medium cta-glow transition-all duration-300"
              onClick={() => setShowWriteReview(true)}
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <div className="space-y-6 max-h-[400px] overflow-y-scroll">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="glass-card p-4 rounded-lg transition-all duration-300 hover:shadow-lg animate-fadeIn"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    background: 'var(--card)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="font-medium text-foreground">{review.userName}</div>
                      <span className="mx-2 text-muted">•</span>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`transition-all duration-300 ${i < review.rating ? "text-primary scale-110" : "text-muted"}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <h4 className="font-medium mb-2 text-foreground">{review.title}</h4>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button 
                className="btn-primary py-2 px-6 rounded-md font-medium cta-glow transition-all duration-300"
                onClick={() => setShowWriteReview(true)}
              >
                Write a Review
              </button>
            </div>
          </div>
        )}
      </div>

      {showWriteReview && createPortal(
        <ReviewModalContent
          onClose={() => setShowWriteReview(false)}
          onSubmit={(submittedReview) => {
            setReviews([submittedReview, ...reviews]);
            setReviewSubmitted(true);
            setTimeout(() => {
              setNewReview({ rating: 0, title: '', comment: '' });
              setShowWriteReview(false);
              setReviewSubmitted(false);
            }, 2000);
          }}
          review={newReview}
          setReview={setNewReview}
          hoveredStar={hoveredStar}
          setHoveredStar={setHoveredStar}
          reviewSubmitted={reviewSubmitted}
        />,
        document.body
      )}
    </>
  );
};
