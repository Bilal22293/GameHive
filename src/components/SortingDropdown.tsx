// File: src/components/SortingDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SortingDropdownProps {
  value: string;
  onChange: (option: string) => void;
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const currentOption = options.find(option => option.value === value) || options[0];

  useEffect(() => {
    // Create portal container at document body level
    const el = document.createElement('div');
    el.setAttribute('id', 'dropdown-portal');
    document.body.appendChild(el);
    setPortalContainer(el);

    return () => {
      if (el && document.body.contains(el)) {
        document.body.removeChild(el);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0, width: 0 };
    
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width
    };
  };

  const position = getDropdownPosition();

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-64 px-4 py-2 text-sm font-medium text-foreground bg-card border border-muted rounded-lg hover:border-primary transition-all duration-300 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span>{currentOption.label}</span>
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-primary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && portalContainer && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed animate-scaleIn"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `200px`,
            zIndex: 9999
          }}
        >
          <div 
            className="w-full mt-1 bg-card border border-muted rounded-lg overflow-hidden"
            style={{ 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 206, 61, 0.2)'
            }}
            role="listbox"
          >
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    px-4 py-2 text-sm cursor-pointer flex items-center justify-between
                    ${option.value === value ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted/50'}
                    ${index < options.length - 1 ? 'border-b border-muted/30' : ''}
                    transition-colors duration-150
                  `}
                  role="option"
                  aria-selected={option.value === value}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-primary" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>,
        portalContainer
      )}
    </div>
  );
};