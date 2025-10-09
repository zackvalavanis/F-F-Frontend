import { useContext } from "react";
import { UserContext, type UserContextType } from "./user-context";

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
