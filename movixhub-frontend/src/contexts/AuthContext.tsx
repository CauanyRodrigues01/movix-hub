import { createContext } from "react";

export interface User {
    id: string;
    fullName: string;
    corporateEmail: string;
    accessProfile: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);