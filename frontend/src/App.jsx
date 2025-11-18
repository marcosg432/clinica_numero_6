import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tratamentos from './pages/Tratamentos';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tratamentos" element={<Tratamentos />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;


