import { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "G4V3K@example.com",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
