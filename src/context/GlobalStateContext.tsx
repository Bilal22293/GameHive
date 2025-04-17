"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

type GlobalStateType = {
  IsRegistered: boolean | null;
  setIsRegistered: (id: boolean | null) => void;
  cartItemCount: number;
  setCartItemCount: (count: number) => void;
};

const GlobalStateContext = createContext<GlobalStateType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [IsRegistered, setIsRegistered] = useState<boolean | null>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(4);

  return (
    <GlobalStateContext.Provider
      value={{ IsRegistered, setIsRegistered, cartItemCount, setCartItemCount }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error('useGlobalState must be used within GlobalStateProvider');
  return context;
};
