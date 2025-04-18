'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';

interface Plan {
  name: string;
  price: string;
  features: string[];
  isCurrent: boolean;
  cta: string;
  color: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0/mo',
    features: [
      'Access to basic features',
      'Limited usage quotas',
      'Community support',
      'Standard analytics',
    ],
    isCurrent: true,
    cta: 'Current Plan',
    color: 'var(--primary)',
  },
  {
    name: 'Pro',
    price: '$15/mo',
    features: [
      'All Free features',
      'Higher usage quotas',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
    isCurrent: false,
    cta: 'Upgrade to Pro',
    color: 'var(--secondary)',
  },
  {
    name: 'Elite',
    price: '$30/mo',
    features: [
      'All Pro features',
      'Unlimited usage',
      'Dedicated account manager',
      'Premium analytics',
      'API access',
    ],
    isCurrent: false,
    cta: 'Upgrade to Elite',
    color: 'var(--neon-purple)',
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What is included in the Free plan?',
    answer: 'The Free plan includes access to basic features with limited usage quotas, community support, and standard analytics.',
  },
  {
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is adjusted accordingly.',
  },
  {
    question: 'What is the Elite plan’s API access?',
    answer: 'The Elite plan includes access to our API for custom integrations and advanced automation. Check our API documentation for details.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'We offer a 14-day money-back guarantee for Pro and Elite plans if you’re not satisfied with your subscription.',
  },
];

const Subscription: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleTabClick = (index: number) => {
    setActivePlan(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-glow">
          Choose Your Plan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground animate-slideUp delay-200">
          Unlock the full potential with our subscription plans tailored to your needs.
        </p>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative glass-card p-6 rounded-lg text-center animate-slideUp delay-${
              (index + 1) * 100
            } ${plan.isCurrent ? 'border-2 border-primary ' : ''}`}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {plan.name}
            </h2>
            <p className="text-4xl font-bold text-foreground mb-6">{plan.price}</p>
            <ul className="text-left text-muted-foreground mb-8 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`absolute bottom-0 btn-primary w-full py-3 rounded-md text-lg font-semibold cta-glow ${
                plan.isCurrent ? 'opacity-75 cursor-not-allowed mt-8' : ''
              }`}
              style={{ backgroundColor: plan.color }}
              disabled={plan.isCurrent}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet: Swiper Carousel with Tabs */}
      <div className="md:hidden max-w-lg mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-2 animate-slideInLeft">
          {plans.map((plan, index) => (
            <button
              key={plan.name}
              onClick={() => handleTabClick(index)}
              className={`glass-card px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                activePlan === index
                  ? 'text-glow cta-glow animate-scaleIn'
                  : 'text-muted-foreground'
              }`}
              style={{
                backgroundColor: activePlan === index ? plan.color : 'rgba(26, 26, 26, 0.6)',
                color: activePlan === index ? 'var(--primary-foreground)' : 'inherit',
              }}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* Swiper Carousel */}
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={(swiper) => setActivePlan(swiper.activeIndex)}
          className="swiper-slide"
        >
          {plans.map((plan, index) => (
            <SwiperSlide key={plan.name}>
              <div
                className={`glass-card p-6 rounded-lg text-center animate-scaleIn ${
                  plan.isCurrent ? 'border-2 border-primary' : ''
                }`}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  {plan.name}
                </h2>
                <p className="text-4xl font-bold text-foreground mb-6">
                  {plan.price}
                </p>
                <ul className="text-left text-muted-foreground mb-8 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn-primary w-full py-3 rounded-md text-lg font-semibold cta-glow ${
                    plan.isCurrent ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  style={{ backgroundColor: plan.color }}
                  disabled={plan.isCurrent}
                >
                  {plan.cta}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16 animate-fadeIn delay-400">
        <h2 className="text-3xl font-bold text-foreground text-glow text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card p-4 rounded-lg cursor-pointer animate-slideUp"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {faq.question}
              </h3>
              <div
                className={`mt-2 text-muted-foreground overflow-hidden transition-all duration-300 ${
                  openFAQ === index ? 'max-h-40 animate-scaleIn' : 'max-h-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider mt-12" />
    </div>
  );
};

export default Subscription;