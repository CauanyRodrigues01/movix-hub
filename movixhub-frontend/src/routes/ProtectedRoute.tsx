import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children } : ProtectedRouteProps){

    const isAuthenticated = localStorage.getItem("authToken");

    return isAuthenticated === "true" ? children : <Navigate to="/login" />;

};