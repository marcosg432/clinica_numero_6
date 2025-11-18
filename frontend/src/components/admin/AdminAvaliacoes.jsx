import { useState, useEffect } from 'react';
import api from '../../services/api';
import Modal from '../Modal';
import './AdminComponents.css';

const AdminAvaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAvaliacao, setEditingAvaliacao] = useState(null);
  const [formData, setFormData] = useState({
    nome_cliente: '',
    nota: 5,
    comentario: '',
    imagem_perfil_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const fetchAvaliacoes = async () => {
    try {
      const response = await api.get('/avaliacoes');
      setAvaliacoes(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  };

  const handleOpenModal = (avaliacao = null) => {
    if (avaliacao) {
      setEditingAvaliacao(avaliacao);
      setFormData({
        nome_cliente: avaliacao.nome_cliente,
        nota: avaliacao.nota,
        comentario: avaliacao.comentario,
        imagem_perfil_url: avaliacao.imagem_perfil_url
      });
    } else {
      setEditingAvaliacao(null);
      setFormData({
        nome_cliente: '',
        nota: 5,
        comentario: '',
        imagem_perfil_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (editingAvaliacao) {
        await api.put(`/avaliacoes/${editingAvaliacao.id}`, formData);
        setMessage({ type: 'success', text: 'Avaliação atualizada com sucesso!' });
      } else {
        await api.post('/avaliacoes', formData);
        setMessage({ type: 'success', text: 'Avaliação criada com sucesso!' });
      }
      setIsModalOpen(false);
      fetchAvaliacoes();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao salvar avaliação'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      return;
    }

    try {
      await api.delete(`/avaliacoes/${id}`);
      setMessage({ type: 'success', text: 'Avaliação excluída com sucesso!' });
      fetchAvaliacoes();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao excluir avaliação'
      });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Avaliações</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          + Nova Avaliação
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
              <th>Cliente</th>
              <th>Nota</th>
              <th>Comentário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {avaliacoes.map((avaliacao) => (
              <tr key={avaliacao.id}>
                <td>{avaliacao.id}</td>
                <td>
                  <div className="table-cell-with-image">
                    <img src={avaliacao.imagem_perfil_url} alt={avaliacao.nome_cliente} className="table-image-small" />
                    {avaliacao.nome_cliente}
                  </div>
                </td>
                <td>{'★'.repeat(avaliacao.nota)}</td>
                <td className="table-comment">{avaliacao.comentario.substring(0, 50)}...</td>
                <td>
                  <button
                    onClick={() => handleOpenModal(avaliacao)}
                    className="btn btn-secondary btn-small"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(avaliacao.id)}
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
          <h2>{editingAvaliacao ? 'Editar' : 'Nova'} Avaliação</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Cliente</label>
              <input
                type="text"
                value={formData.nome_cliente}
                onChange={(e) => setFormData({ ...formData, nome_cliente: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Nota (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.nota}
                onChange={(e) => setFormData({ ...formData, nota: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Comentário</label>
              <textarea
                value={formData.comentario}
                onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                required
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>URL da Imagem de Perfil</label>
              <input
                type="text"
                value={formData.imagem_perfil_url}
                onChange={(e) => setFormData({ ...formData, imagem_perfil_url: e.target.value })}
                required
                placeholder="/images/avaliacoes/cliente.jpg"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
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

export default AdminAvaliacoes;


