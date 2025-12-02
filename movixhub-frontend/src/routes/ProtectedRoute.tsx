import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children } : ProtectedRouteProps){

    // Verifica se o token existe (qualquer string não vazia)
    const isAuthenticated = !!localStorage.getItem("authToken");

    return isAuthenticated ? children : <Navigate to="/entrar" />; 

}