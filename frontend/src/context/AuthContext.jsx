import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, senha) => {
    try {
      console.log('=== INICIANDO LOGIN ===');
      console.log('Fazendo requisição para /auth/login...');
      
      const response = await api.post('/auth/login', { email, senha });
      console.log('✅ Resposta recebida do servidor:', response.data);
      
      if (!response.data || !response.data.success) {
        console.error('❌ Resposta não indica sucesso:', response.data);
        return {
          success: false,
          message: response.data?.message || 'Erro ao fazer login'
        };
      }
      
      const { token, user } = response.data;
      
      if (!token) {
        console.error('❌ Token não recebido na resposta');
        return {
          success: false,
          message: 'Token não recebido. Tente novamente.'
        };
      }
      
      console.log('💾 Salvando token no localStorage...');
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      console.log('👤 Definindo usuário no contexto...');
      setUser(user);
      
      console.log('✅ Login bem-sucedido!');
      console.log('Usuário logado:', user);
      console.log('Token salvo:', token.substring(0, 20) + '...');
      
      return { success: true, user };
    } catch (error) {
      console.error('❌ ERRO NO LOGIN:', error);
      console.error('Detalhes completos:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method
        }
      });
      
      // Tratamento de erros mais específico
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        return {
          success: false,
          message: 'Erro de conexão. Verifique se o backend está rodando na porta 3001.'
        };
      }
      
      if (error.response) {
        // Erro retornado pelo servidor
        const errorMessage = error.response.data?.message || 'Erro ao fazer login';
        console.error('Erro do servidor:', errorMessage);
        return {
          success: false,
          message: errorMessage
        };
      }
      
      return {
        success: false,
        message: error.message || 'Erro ao fazer login. Tente novamente.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

