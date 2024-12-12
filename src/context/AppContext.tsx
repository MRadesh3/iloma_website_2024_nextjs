"use client";

import { createContext, useState, useContext } from "react";

interface AppContextType {
  serviceId: number;
  setServiceId: (id: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setId] = useState<number>(0);

  return (
    <AppContext.Provider value={{ serviceId: id, setServiceId: setId }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
