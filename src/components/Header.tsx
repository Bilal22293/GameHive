'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { GlitchText } from './GlitchText';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Search, Menu, X, ShoppingCart, User, CreditCard } from 'lucide-react';

var isTrue = false;
export default function Header() {
  const { cartItemCount, setCartItemCount } = useGlobalState();
  const { IsRegistered, setIsRegistered } = useGlobalState();
  console.log(IsRegistered, isTrue);
  if (typeof localStorage === 'undefined') {
    isTrue = true;
  } else if (localStorage.getItem('IsRegistered') === 'true') {
    isTrue = true;
  } else if (IsRegistered) {
    localStorage.setItem('IsRegistered', IsRegistered.toString());
    isTrue = true;
  }
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if current page is signin or signup
  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
    setSearchOpen(false);
  };

  return (
    <header className="relative z-50">
      {/* Tech lines */}
      <div className="tech-line-left"></div>
      <div className="tech-line-right"></div>

      {/* Main header */}
      <div
        className={` ${
          pathname === '/'
            ? 'fixed left-0 top-0 backdrop-blur-md bg-background/70'
            : 'bg-transparent'
        } w-full px-6 lg:px-14`}
      >
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <GlitchText
              text="GAMEHIVE"
              className="text-2xl md:text-3xl font-mono text-primary cyberpunk-text"
            />
          </Link>

          {/* Header Actions - only show if not on auth pages */}
          {!isAuthPage && (
            <div className="flex items-center space-x-5">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-foreground hover:text-primary transition-all duration-300 relative overflow-hidden group"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="text-foreground hover:text-primary transition-all duration-300 relative overflow-visible group"
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-3 w-3 p-2 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Profile Button */}
              <Link
                href="/profile"
                className="text-foreground hover:text-primary transition-all duration-300 relative overflow-hidden group"
                aria-label="Profile"
              >
                <User className="h-6 w-6" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Menu Button */}
              <button
                type="button"
                className="text-foreground hover:text-primary transition-all duration-300 relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-opacity-90 z-50 flex items-start justify-center pt-24 backdrop-blur-sm">
          <div className="w-full max-w-2xl px-6 relative" ref={modalRef}>
            <form onSubmit={handleSearch} className="neon-border">
              <div className="bg-card p-2 rounded-xl relative overflow-hidden">
                <div className="tech-line-left absolute top-0 left-0 w-[30%] mb-0"></div>
                <div className="tech-line-right absolute bottom-0 right-0 w-[30%] mb-0"></div>

                <div className="flex items-center justify-between rounded-lg overflow-hidden bg-muted shadow-lg">
                  {/* Search Icon */}
                  <div className="pl-4 text-muted-foreground flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                      />
                    </svg>
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="SEARCH THE HIVE..."
                    className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-foreground placeholder-muted-foreground min-w-0 cyberpunk-text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Search Button */}
                  <div className="pr-4">
                    <button
                      type="submit"
                      className="future-button hover:text-[var(--primary)]"
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <button
              onClick={() => setSearchOpen(false)}
              className="absolute -top-10 right-4 text-muted-foreground hover:text-primary"
              aria-label="Close search"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop with cyberpunk styling */}
          <div
            className="fixed inset-0 bg-opacity-80 backdrop-blur-sm z-40 hex-grid"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Menu overlay with futuristic styling */}
          <div
            ref={menuRef}
            className="fixed right-6 top-20 z-50 w-64 rounded-lg overflow-hidden neon-border scanning-effect animate-slideInRight"
          >
            <div className="bg-card py-4 hud-container">
              <div className="hud-corner hud-corner-top-left"></div>
              <div className="hud-corner hud-corner-top-right"></div>
              <div className="hud-corner hud-corner-bottom-left"></div>
              <div className="hud-corner hud-corner-bottom-right"></div>

              <div className="flex flex-col">
                <button
                  className="px-6 py-3 text-foreground hover:text-primary hover:bg-muted transition-all duration-300 flex items-center group"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/signup';
                  }}
                >
                  <span className="mr-3 text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <span className="cyberpunk-text group-hover:neon-text transition-all duration-300">
                    SIGN UP
                  </span>
                </button>

                <button
                  className="px-6 py-3 text-foreground hover:text-primary hover:bg-muted transition-all duration-300 flex items-center group"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/signin';
                  }}
                >
                  <span className="mr-3 text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  <span className="cyberpunk-text group-hover:neon-text transition-all duration-300">
                    SIGN IN
                  </span>
                </button>

                <div className="my-2 px-6">
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>

                <Link
                  href="/products"
                  className="px-6 py-3 text-foreground hover:text-primary hover:bg-muted transition-all duration-300 flex items-center group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3 text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      ></path>
                    </svg>
                  </span>
                  <span className="cyberpunk-text group-hover:neon-text transition-all duration-300">
                    PRODUCTS
                  </span>
                </Link>

                <Link
                  href="/plans"
                  className="px-6 py-3 text-foreground hover:text-primary hover:bg-muted transition-all duration-300 flex items-center group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3 text-primary">
                    <CreditCard className="w-5 h-5" />
                  </span>
                  <span className="cyberpunk-text group-hover:neon-text transition-all duration-300">
                    SUBSCRIPTIONS
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}