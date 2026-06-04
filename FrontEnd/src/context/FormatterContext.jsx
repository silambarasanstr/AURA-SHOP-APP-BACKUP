// Only functions
import { createContext, useContext, useState } from "react";

// 1. create context
export const FormatterContext = createContext(null);

// 2. provider
export const FormatterProvider = ({ children }) => {
  const toUpper = (text) => text.toUpperCase();
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatCurrency = (number) =>
    number.toLocaleString("en-US", { style: "currency", currency: "USD" });

  //   const formatCurrency = (amount) =>
  //     `₹ ${amount.toLocaleString("en-IN")}`;

  return (
    <FormatterContext.Provider value={{ toUpper, formatDate, formatCurrency }}>
      {children}
    </FormatterContext.Provider>
  );
};

// 3. custom hook
export const useFormatter = () => {
  const context = useContext(FormatterContext);
  if (!context) {
    throw new Error("useFormatter must be used inside FormatterProvider");
  }
  return context;
};
