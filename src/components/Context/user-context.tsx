import { createContext } from "react";

export interface User {
  user_id: any;
  id: number;
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Only create and export the context here — no components
export const UserContext = createContext<UserContextType | undefined>(undefined);
