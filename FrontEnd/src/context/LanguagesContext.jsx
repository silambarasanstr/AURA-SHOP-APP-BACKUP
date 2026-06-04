// (Array version – JavaScript)
import { createContext, useContext, useState } from "react";

// 1. create context
export const LanguagesContext = createContext(null);


// 2. provider
export const LanguagesProvider = ({ children }) => {
 
    const [languages, setLanguages] = useState([
    { id: 1, name: "English" },
    { id: 2, name: "Spanish" },
    { id: 3, name: "French" },
    { id: 4, name: "German" },
  ]);

  return (
    <LanguagesContext.Provider value={{ languages, setLanguages }}>
      {children}
    </LanguagesContext.Provider>
  );
};

// custom hook
export const useLanguages = () => {
  const context = useContext(LanguagesContext);
  if (!context) {
    throw new Error("useLanguages must be used inside LanguagesProvider");
  }
  return context;
};
export default LanguagesContext;
