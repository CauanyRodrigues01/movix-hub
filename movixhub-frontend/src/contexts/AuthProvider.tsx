import { useState, type ReactNode } from "react";
import { authService } from "../services/authService";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Inicializa o estado diretamente com o valor do localStorage
    const [user, setUser] = useState<User | null>(() => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    });

    const logout = () => {
        authService.logout();
        setUser(null);
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};