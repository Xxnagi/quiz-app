import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/api/firebaseConfig"; // Adjust path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set up an effect to listen for changes in the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email }); // Save relevant user data
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  const login = (userData) => {
    setUser(userData); // Set the user data after login
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
