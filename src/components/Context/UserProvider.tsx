import { useState, useEffect, type ReactNode } from "react";
import { UserContext, type User, type UserContextType } from "./user-context";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(user);
  };

  const contextValue: UserContextType = { user, setUser };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
