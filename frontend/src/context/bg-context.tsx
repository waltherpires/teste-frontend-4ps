// bg-context.tsx
"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type BgContextType = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
};

const BgContext = createContext<BgContextType | null>(null);

export function BgProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * 5)
  );

  return (
    <BgContext.Provider value={{ index, setIndex }}>
      {children}
    </BgContext.Provider>
  );
}

export function useBg() {
  const ctx = useContext(BgContext);
  if (!ctx) throw new Error("useBg must be used inside BgProvider");
  return ctx;
}
