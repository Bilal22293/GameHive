import Link from "next/link";
import { ReactNode, MouseEvent, ElementType } from "react";

interface CyberButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  href?: string | null;
  hoverEffect?: boolean;
}

export const CyberButton = ({ 
  children, 
  onClick, 
  className = "", 
  href = null 
}: CyberButtonProps) => {
  const ButtonElement: ElementType = href ? Link : "button";
  const buttonProps = href ? { href } : { onClick };
  
  return (
    <ButtonElement 
      {...buttonProps}
      className={`relative overflow-hidden group bg-transparent border-2 border-primary text-primary px-6 py-3 
        rounded-md font-medium text-center transition-all duration-300 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
      <span className="absolute -inset-[1px] bg-primary/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
      <span className="absolute top-0 right-0 h-1 w-6 bg-primary"></span>
      <span className="absolute bottom-0 left-0 h-1 w-6 bg-primary"></span>
    </ButtonElement>
  );
};