import { useState, useEffect, type ReactNode } from "react";
import { UserContext, type User, type UserContextType } from "./user-context";

const EXPIRATION_TIME = 24 * 60 * 60 * 1000;




export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");

    if (storedData) {
      try {
        const { user, timestamp } = JSON.parse(storedData);
        const isExpired = Date.now() - timestamp > EXPIRATION_TIME;

        if (!isExpired) {
          setUserState(user);
        } else {
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Invalid stored user data", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      const dataToStore = {
        user,
        timestamp: Date.now(),
      };
      localStorage.setItem("user", JSON.stringify(dataToStore));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(user);
  };

  const contextValue: UserContextType = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
