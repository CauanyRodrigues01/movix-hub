import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        // Remove dados inválidos antes de redirecionar
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        return <Navigate to="/entrar" replace />;
    }

    return <>{children}</>;
}