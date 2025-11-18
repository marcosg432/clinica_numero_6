import { useState, useEffect } from 'react';
import api from '../../services/api';
import './AdminComponents.css';

const AdminAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtros, setFiltros] = useState({
    data: '',
    status: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAgendamentos();
  }, [filtros]);

  const fetchAgendamentos = async () => {
    try {
      const params = new URLSearchParams();
      if (filtros.data) params.append('data', filtros.data);
      if (filtros.status) params.append('status', filtros.status);

      const response = await api.get(`/agendamentos?${params.toString()}`);
      setAgendamentos(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const handleStatusChange = async (id, novoStatus) => {
    try {
      await api.put(`/agendamentos/${id}`, { status: novoStatus });
      setMessage({ type: 'success', text: 'Status atualizado com sucesso!' });
      fetchAgendamentos();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao atualizar status'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      return;
    }

    try {
      await api.delete(`/agendamentos/${id}`);
      setMessage({ type: 'success', text: 'Agendamento excluído com sucesso!' });
      fetchAgendamentos();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao excluir agendamento'
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pendente: { class: 'status-pendente', label: 'Pendente' },
      aprovado: { class: 'status-aprovado', label: 'Aprovado' },
      recusado: { class: 'status-recusado', label: 'Recusado' },
      concluido: { class: 'status-concluido', label: 'Concluído' }
    };
    const statusInfo = statusMap[status] || statusMap.pendente;
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Agendamentos</h1>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="filters">
        <div className="form-group">
          <label>Filtrar por Data</label>
          <input
            type="date"
            value={filtros.data}
            onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Filtrar por Status</label>
          <select
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="recusado">Recusado</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
        <button
          onClick={() => setFiltros({ data: '', status: '' })}
          className="btn btn-secondary"
        >
          Limpar Filtros
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Contato</th>
              <th>Tratamento</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{agendamento.id}</td>
                <td>{agendamento.nome_paciente}</td>
                <td>
                  <div>{agendamento.telefone}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                    {agendamento.email}
                  </div>
                </td>
                <td>{agendamento.tratamento_nome || 'Não especificado'}</td>
                <td>{new Date(agendamento.data_agendada).toLocaleDateString('pt-BR')}</td>
                <td>{agendamento.hora_agendada}</td>
                <td>{getStatusBadge(agendamento.status)}</td>
                <td>
                  <div className="action-buttons">
                    <select
                      value={agendamento.status}
                      onChange={(e) => handleStatusChange(agendamento.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="recusado">Recusado</option>
                      <option value="concluido">Concluído</option>
                    </select>
                    <button
                      onClick={() => handleDelete(agendamento.id)}
                      className="btn btn-danger btn-small"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {agendamentos.length === 0 && (
          <div className="empty-state">
            <p>Nenhum agendamento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAgendamentos;


