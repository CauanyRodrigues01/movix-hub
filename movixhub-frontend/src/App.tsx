import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Freights from './pages/Freights/Freights';
import Promotions from './pages/Promotions/Promotions';
import Clients from './pages/Clients/Clients';
import Users from './pages/Users/Users';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help';

function App() {
  return (
    <div className="container">

      <Routes>

        {/* Rota raiz */}
        <Route
          path="/"
          element={
            localStorage.getItem("authToken")
              ? <Navigate to="/dashboard" />
              : <Navigate to="/entrar" />
          }
        />

        {/* Rota pública */}
        <Route path="/entrar" element={<Login />} />

        {/* Rota admin protegida */}
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/fretes" element={<Freights />} />
          <Route path="/promocoes" element={<Promotions />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/ajuda" element={<Help />} />
        </Route>

      </Routes>

    </div >

  );
};

export default App;
