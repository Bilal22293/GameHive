// pages/login.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from "@/context/GlobalStateContext";

const SignIn = () => {
  const router = useRouter();
  const { IsRegistered, setIsRegistered } = useGlobalState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Check URL params for registered flag
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const registered = searchParams.get("registered");

    if (registered === "true") {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsRegistered(true);
      router.push("/products");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Your App Name</title>
        <meta name="description" content="Sign in to your account" />
      </Head>

      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Success notification */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center animate-fadeIn"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Account created successfully! Please sign in.
              </motion.div>
            )}
          </AnimatePresence>

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
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-[--primary] text-glow mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-[--muted-foreground]">
                    Sign in to your account
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-4 animate-fadeIn delay-200"
                >
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
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[--muted-foreground]"
                      >
                        Password
                      </label>
                      <div className="hover:cursor-pointer text-xs text-[--primary] hover:text-[--primary-hover] transition-colors duration-300">
                        Forgot password?
                      </div>
                    </div>
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

                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 bg-[--background] border-[--border] rounded focus:ring-[--primary] text-[--primary]"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-[--muted-foreground]"
                    >
                      Remember me
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-8 animate-fadeIn delay-300"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary relative w-full overflow-hidden px-4 py-3 bg-gradient-to-r from-[--primary] to-[--secondary] text-[--primary-foreground] font-medium rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed cta-glow"
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
                          Sign in
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
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-8 animate-fadeIn delay-400"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[--border]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[--card] text-[--muted-foreground]">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-[--border] rounded-lg bg-[--card] text-sm font-medium text-white hover:bg-[--card-hover] transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23C14.97 23 17.46 22.015 19.28 20.335L15.725 17.575C14.74 18.235 13.48 18.625 12 18.625C9.13505 18.625 6.70805 16.69 5.84605 14.09H2.17505V16.94C3.98205 20.535 7.70005 23 12 23Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84599 14.09C5.62499 13.43 5.49999 12.725 5.49999 12C5.49999 11.275 5.62499 10.57 5.84599 9.91V7.06H2.17499C1.42999 8.59 0.999992 10.265 0.999992 12C0.999992 13.735 1.42999 15.41 2.17499 16.94L5.84599 14.09Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.375C13.615 5.375 15.07 5.935 16.205 7.02L19.36 3.865C17.455 2.09 14.965 1 12 1C7.70005 1 3.98205 3.465 2.17505 7.06L5.84605 9.91C6.70805 7.31 9.13505 5.375 12 5.375Z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-[--border] rounded-lg bg-[--card] text-sm font-medium text-white hover:bg-[--card-hover] transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 
                            2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
                            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
                            1.08.58 1.23.82.72 1.21 1.87.87 
                            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
                            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
                            0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 
                            1.36.09 2 .27 1.53-1.04 2.2-.82 
                            2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 
                            1.27.82 2.15 0 3.07-1.87 3.75-3.65 
                            3.95.29.25.54.73.54 1.48 0 1.07-.01 
                            1.93-.01 2.2 0 .21.15.46.55.38A8.013 
                            8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                    Github
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 text-center animate-fadeIn delay-500"
              >
                <p className="text-[--muted-foreground]">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[--primary] hover:text-[--primary-hover] transition-colors duration-300 text-glow"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add additional custom styles if needed */}
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
      `}</style>
    </>
  );
};

export default SignIn;
