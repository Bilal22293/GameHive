// pages/signup.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from '@/context/GlobalStateContext';

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Account details
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,

    // Shipping details
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setIsRegistered } = useGlobalState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const validateStep1 = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.country
    ) {
      setError("Please fill in all required shipping fields");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setError("");
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      handleNextStep();
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsRegistered(true); // Set the registration state to true
      router.push("/products");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Progress bar calculation
  const progress = step === 1 ? 50 : 100;

  return (
    <>
      <Head>
        <title>Sign Up | Your App Name</title>
        <meta name="description" content="Create your account" />
      </Head>

      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Progress indicator */}
          {/* Simple progress bar with step indicators */}
          <div className="mb-6 px-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-[--primary]">
                {step === 1 ? "Account Details" : "Shipping Information"}
              </span>
              <span className="text-sm font-medium text-[--primary]">
                {progress}%
              </span>
            </div>
            <div className="relative w-full">
              {/* Main progress bar */}
              <div className="w-full bg-[--border] rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-[var(--primary)]"
                  style={{ height: "100%" }}
                  initial={{ width: step === 1 ? "0%" : "50%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </div>

              {/* Step markers */}
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step >= 1 ? "bg-[--primary]" : "bg-[--border]"
                  } -ml-1.5`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step >= 2 ? "bg-[--primary]" : "bg-[--border]"
                  } -mr-1.5`}
                ></div>
              </div>
            </div>
          </div>

          {/* Card with animated border */}
          <div className="relative glass-card animate-scaleIn">
            {/* Animated borders */}
            <div className="absolute -inset-0.5 rounded-lg overflow-hidden z-0">
              <div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[--neon-purple] to-transparent"
                style={{ animation: "slideInLeft 3s infinite alternate" }}
              ></div>
              <div
                className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-[--primary] to-transparent"
                style={{ animation: "slideUp 3s infinite alternate" }}
              ></div>
              <div
                className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[--secondary] to-transparent"
                style={{ animation: "slideInRight 3s infinite alternate" }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-[--neon-purple] to-transparent"
                style={{ animation: "slideUp 3s infinite alternate" }}
              ></div>
            </div>

            <div className="relative bg-[--card] rounded-lg shadow-xl p-6 z-10">
              <div className="text-center mb-8">
                <motion.div
                  key={`header-step-${step}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-[--primary] text-glow mb-2">
                    {step === 1 ? "Create Account" : "Shipping Details"}
                  </h1>
                  <p className="text-[--muted-foreground]">
                    {step === 1
                      ? "Join our community today"
                      : "Where should we send your orders?"}
                  </p>
                </motion.div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-[--destructive]/10 border border-[--destructive] text-[--destructive] px-4 py-3 rounded mb-6"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Account Information */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Username
                        </label>
                        <div className="relative">
                          <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="Choose a username"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="your@email.com"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="••••••••"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="••••••••"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="h-4 w-4 bg-[--background] border-[--border] rounded focus:ring-[--primary] text-[--primary]"
                        />
                        <label
                          htmlFor="termsAccepted"
                          className="ml-2 block text-sm text-[--muted-foreground]"
                        >
                          I agree to the{" "}
                          <span className="text-[--primary] cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-[--primary] cursor-pointer">
                            Privacy Policy
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Shipping Information */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="John Doe"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Street Address
                        </label>
                        <div className="relative">
                          <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="1234 Main St"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-[--muted-foreground]"
                          >
                            City
                          </label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white"
                            placeholder="New York"
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-[--muted-foreground]"
                          >
                            State/Province
                          </label>
                          <input
                            id="state"
                            name="state"
                            type="text"
                            required
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white"
                            placeholder="NY"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-[--muted-foreground]"
                          >
                            ZIP / Postal Code
                          </label>
                          <input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            required
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white"
                            placeholder="10001"
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-[--muted-foreground]"
                          >
                            Country
                          </label>
                          <input
                            id="country"
                            name="country"
                            type="text"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white"
                            placeholder="United States"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[--muted-foreground]"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[--background] border border-[--border] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all duration-300 text-white pl-10"
                            placeholder="(123) 456-7890"
                          />
                          <span className="absolute left-3 top-2.5 text-[--muted-foreground]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  key={`buttons-step-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`mt-8 ${step === 2 ? "flex justify-between" : ""}`}
                >
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 border border-[--border] rounded-lg bg-transparent text-white font-medium transition-all duration-300 hover:bg-[--primary]/10 focus:outline-none focus:ring-2 focus:ring-[--primary] focus:ring-opacity-50 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn-primary relative overflow-hidden px-4 py-3 bg-gradient-to-r from-[--primary] to-[--secondary] text-[--primary-foreground] font-medium rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed cta-glow ${
                      step === 2 ? "" : "w-full"
                    }`}
                  >
                    <span className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-[--primary-foreground]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          {step === 1 ? "Continue" : "Complete Signup"}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>

                <div className="mt-6 text-center text-sm text-[--muted-foreground]">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-[--primary] hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        /* Custom animation for border effects */
        @keyframes borderPulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        /* Add specific styles for glass card glow effect */
        .glass-card {
          box-shadow: 0 0 20px rgba(182, 108, 255, 0.1);
          transition: box-shadow 0.5s ease;
        }

        .glass-card:hover {
          box-shadow: 0 0 30px rgba(255, 206, 61, 0.2);
        }
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slideInRight {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .glass-card {
          backdrop-filter: blur(10px);
        }
        .text-glow {
          text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary);
        }
        .cta-glow:hover {
          box-shadow: 0 0 15px var(--primary);
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skew(-12deg);
          }
          100% {
            transform: translateX(200%) skew(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default Signup;
