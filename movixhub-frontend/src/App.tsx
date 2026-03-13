import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthProvider";

import ProtectedRoute from './routes/ProtectedRoute';

import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Settings } from './pages/Settings/Settings';
import { Help } from './pages/Help/Help';
import AdminLayout from './components/AdminLayout/AdminLayout';
import { Users } from './pages/Users/Users';
import { Drivers } from './pages/Drivers/Drivers';
import { Clients } from './pages/Clients/Clients';
import { FreightServices } from './pages/FreightsServices/FreightsServices';
import { Promotions } from './pages/Promotions/Promotions';
import { useAuth } from './hooks/useAuth';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rota raiz */}
      <Route
        path="/"
        element={
          isAuthenticated 
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/entrar" replace />
        }
      />

      {/* Rota pública */}
      <Route 
        path="/entrar" 
        element={
          isAuthenticated 
            ? <Navigate to="/dashboard" replace />
            : <Login />
        } 
      />

      {/* Rotas admin protegidas */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/fretes" element={<FreightServices />} />
        <Route path="/promocoes" element={<Promotions />} />
        <Route path="/motoristas" element={<Drivers />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/configuracoes" element={<Settings />} />
        <Route path="/ajuda" element={<Help />} />
      </Route>

      {/* Rota 404 */}
      <Route 
        path="*" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/entrar"} replace />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;