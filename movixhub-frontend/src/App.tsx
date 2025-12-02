import { Routes, Route, Navigate } from 'react-router-dom';

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

function App () {
  return (

    <Routes>

      {/* Rota raiz */}
      <Route
        path="/"
        element={
          // Verifica se o token existe (qualquer valor não nulo/vazio)
          localStorage.getItem("authToken") 
            ? <Navigate to="/dashboard" />
            : <Navigate to="/entrar" />
        }
      />

      {/* Rota pública */}
      <Route path="/entrar" element={<Login />} />

      {/* Rota admin protegida */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        {/* ... rotas protegidas ... */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/fretes" element={<FreightServices />} />
        <Route path="/promocoes" element={<Promotions />} />
        <Route path="/motoristas" element={<Drivers />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/configuracoes" element={<Settings />} />
        <Route path="/ajuda" element={<Help />} />
      </Route>

    </Routes>

  );
};

export default App;