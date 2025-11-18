import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminTratamentos from '../components/admin/AdminTratamentos';
import AdminAvaliacoes from '../components/admin/AdminAvaliacoes';
import AdminAgendamentos from '../components/admin/AdminAgendamentos';
import AdminUsuarios from '../components/admin/AdminUsuarios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Painel Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/tratamentos" className={({ isActive }) => isActive ? 'active' : ''}>
            Tratamentos
          </NavLink>
          <NavLink to="/admin/avaliacoes" className={({ isActive }) => isActive ? 'active' : ''}>
            Avaliações
          </NavLink>
          <NavLink to="/admin/agendamentos" className={({ isActive }) => isActive ? 'active' : ''}>
            Agendamentos
          </NavLink>
          <NavLink to="/admin/usuarios" className={({ isActive }) => isActive ? 'active' : ''}>
            Usuários
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <p>Logado como: {user.nome}</p>
          <button onClick={handleLogout} className="btn btn-secondary">
            Sair
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/tratamentos" replace />} />
          <Route path="tratamentos" element={<AdminTratamentos />} />
          <Route path="avaliacoes" element={<AdminAvaliacoes />} />
          <Route path="agendamentos" element={<AdminAgendamentos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;

