import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('=== TENTANDO FAZER LOGIN ===');
    console.log('Email:', email);
    
    try {
      const result = await login(email, senha);
      console.log('Resultado do login:', result);
      
      if (result && result.success) {
        console.log('✅ Login bem-sucedido!');
        console.log('Redirecionando para /admin...');
        
        // Aguardar um pouco para garantir que o estado foi atualizado
        setTimeout(() => {
          navigate('/admin', { replace: true });
          // Forçar reload se necessário
          window.location.href = '/admin';
        }, 100);
      } else {
        console.error('❌ Erro no login:', result?.message);
        setError(result?.message || 'Erro ao fazer login. Tente novamente.');
        setLoading(false);
      }
    } catch (err) {
      console.error('❌ Erro inesperado no login:', err);
      setError('Erro inesperado. Verifique o console do navegador (F12).');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <img src="/images/logo.png" alt="Logo" />
          <h1>Painel Administrativo</h1>
          <p>Faça login para acessar o painel</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@clinica.com"
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="login-footer">
          <p>Credenciais padrão: admin@clinica.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

