import { useState, useEffect } from 'react';
import api from '../../services/api';
import Modal from '../Modal';
import './AdminComponents.css';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      nome: '',
      email: '',
      senha: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post('/usuarios', formData);
      setMessage({ type: 'success', text: 'Usuário criado com sucesso!' });
      setIsModalOpen(false);
      fetchUsuarios();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao criar usuário'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (id) => {
    const novaSenha = prompt('Digite a nova senha:');
    if (!novaSenha) return;

    try {
      await api.put(`/usuarios/${id}`, { senha: novaSenha });
      setMessage({ type: 'success', text: 'Senha atualizada com sucesso!' });
      fetchUsuarios();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao atualizar senha'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      await api.delete(`/usuarios/${id}`);
      setMessage({ type: 'success', text: 'Usuário excluído com sucesso!' });
      fetchUsuarios();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao excluir usuário'
      });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Usuários Admin</h1>
        <button onClick={handleOpenModal} className="btn btn-primary">
          + Novo Usuário
        </button>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{new Date(usuario.criado_em).toLocaleDateString('pt-BR')}</td>
                <td>
                  <button
                    onClick={() => handleUpdatePassword(usuario.id)}
                    className="btn btn-secondary btn-small"
                  >
                    Alterar Senha
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="btn btn-danger btn-small"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="admin-form">
          <h2>Novo Usuário Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                minLength="6"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Criando...' : 'Criar Usuário'}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsuarios;


