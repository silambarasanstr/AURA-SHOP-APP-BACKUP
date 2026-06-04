import { createContext, useContext, useState } from "react";

// 1. create context
export const UserContext = createContext(null);


// 2. provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    {
      name: "John Doe",
      email: "G4V3K@example.com",
    }
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};

export default UserContext;
