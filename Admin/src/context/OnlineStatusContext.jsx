// (Boolean Context)
import { createContext, useContext, useState } from "react";

// 1. create context
export const OnlineStatusContext = createContext(null);

// 2. provider
export const OnlineStatusProvider = ({ children }) => {
  
  const [isOnline, setIsOnline] = useState(false); // ✅ boolean

  const toggleStatus = () => {
    setIsOnline((prev) => !prev);
  };


  return (
    <OnlineStatusContext.Provider value={{ isOnline, toggleStatus }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

// custom hook
export const useOnlineStatus = () => {
  const context = useContext(OnlineStatusContext);
  if (!context) {
    throw new Error("useOnlineStatus must be used inside OnlineStatusProvider");
  }
  return context;
};

export default OnlineStatusContext;
