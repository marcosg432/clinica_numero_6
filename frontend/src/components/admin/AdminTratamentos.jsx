import { useState, useEffect } from 'react';
import api from '../../services/api';
import Modal from '../Modal';
import './AdminComponents.css';

const AdminTratamentos = () => {
  const [tratamentos, setTratamentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTratamento, setEditingTratamento] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao_resumida: '',
    descricao_completa: '',
    etapas: '',
    imagem_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTratamentos();
  }, []);

  const fetchTratamentos = async () => {
    try {
      const response = await api.get('/tratamentos');
      setTratamentos(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar tratamentos:', error);
    }
  };

  const handleOpenModal = (tratamento = null) => {
    if (tratamento) {
      setEditingTratamento(tratamento);
      setFormData({
        nome: tratamento.nome,
        descricao_resumida: tratamento.descricao_resumida,
        descricao_completa: tratamento.descricao_completa,
        etapas: tratamento.etapas,
        imagem_url: tratamento.imagem_url
      });
    } else {
      setEditingTratamento(null);
      setFormData({
        nome: '',
        descricao_resumida: '',
        descricao_completa: '',
        etapas: '',
        imagem_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validação no frontend
    if (!formData.nome || !formData.descricao_resumida || !formData.descricao_completa || !formData.etapas || !formData.imagem_url) {
      setMessage({
        type: 'error',
        text: 'Por favor, preencha todos os campos obrigatórios!'
      });
      setLoading(false);
      return;
    }

    try {
      console.log('Enviando dados:', formData);
      
      if (editingTratamento) {
        const response = await api.put(`/tratamentos/${editingTratamento.id}`, formData);
        console.log('Resposta do servidor:', response.data);
        setMessage({ type: 'success', text: 'Tratamento atualizado com sucesso!' });
      } else {
        const response = await api.post('/tratamentos', formData);
        console.log('Resposta do servidor:', response.data);
        setMessage({ type: 'success', text: 'Tratamento criado com sucesso!' });
      }
      
      // Aguardar um pouco antes de fechar o modal para mostrar a mensagem
      setTimeout(() => {
        setIsModalOpen(false);
        fetchTratamentos();
      }, 1000);
    } catch (error) {
      console.error('Erro completo:', error);
      console.error('Detalhes do erro:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Erro ao salvar tratamento';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Você não está autenticado. Faça login novamente.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Você não tem permissão para esta ação.';
      } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        errorMessage = 'Erro de conexão. Verifique se o backend está rodando na porta 3001.';
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este tratamento?')) {
      return;
    }

    try {
      await api.delete(`/tratamentos/${id}`);
      setMessage({ type: 'success', text: 'Tratamento excluído com sucesso!' });
      fetchTratamentos();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao excluir tratamento'
      });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Tratamentos</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          + Novo Tratamento
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
              <th>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tratamentos.map((tratamento) => (
              <tr key={tratamento.id}>
                <td>{tratamento.id}</td>
                <td>{tratamento.nome}</td>
                <td>
                  <img src={tratamento.imagem_url} alt={tratamento.nome} className="table-image" />
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal(tratamento)}
                    className="btn btn-secondary btn-small"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(tratamento.id)}
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
          <h2>{editingTratamento ? 'Editar' : 'Novo'} Tratamento</h2>
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
              <label>Descrição Resumida</label>
              <textarea
                value={formData.descricao_resumida}
                onChange={(e) => setFormData({ ...formData, descricao_resumida: e.target.value })}
                required
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Descrição Completa</label>
              <textarea
                value={formData.descricao_completa}
                onChange={(e) => setFormData({ ...formData, descricao_completa: e.target.value })}
                required
                rows="5"
              />
            </div>
            <div className="form-group">
              <label>Etapas (HTML permitido)</label>
              <textarea
                value={formData.etapas}
                onChange={(e) => setFormData({ ...formData, etapas: e.target.value })}
                required
                rows="5"
                placeholder="<ul><li>Etapa 1</li><li>Etapa 2</li></ul>"
              />
            </div>
            <div className="form-group">
              <label>URL da Imagem</label>
              <input
                type="text"
                value={formData.imagem_url}
                onChange={(e) => setFormData({ ...formData, imagem_url: e.target.value })}
                required
                placeholder="/images/tratamentos/tratamento.jpg"
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

export default AdminTratamentos;

