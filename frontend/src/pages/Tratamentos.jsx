import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import api from '../services/api';
import './Tratamentos.css';

const Tratamentos = () => {
  const [tratamentos, setTratamentos] = useState([]);
  const [selectedTratamento, setSelectedTratamento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openTratamentoModal = (tratamento) => {
    setSelectedTratamento(tratamento);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="section tratamentos-page">
          <div className="container">
            <h1 className="section-title">Todos os Tratamentos</h1>
            <div className="tratamentos-grid">
              {tratamentos.map((tratamento) => (
                <div
                  key={tratamento.id}
                  className="tratamento-card"
                  onClick={() => openTratamentoModal(tratamento)}
                >
                  <img src={tratamento.imagem_url} alt={tratamento.nome} />
                  <h3>{tratamento.nome}</h3>
                  <p>{tratamento.descricao_resumida}</p>
                  <button className="btn btn-secondary">Ver detalhes</button>
                </div>
              ))}
            </div>
            {tratamentos.length === 0 && (
              <div className="empty-state">
                <p>Nenhum tratamento cadastrado ainda.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedTratamento && (
          <div className="tratamento-modal">
            <img src={selectedTratamento.imagem_url} alt={selectedTratamento.nome} />
            <h2>{selectedTratamento.nome}</h2>
            <p className="descricao-completa">{selectedTratamento.descricao_completa}</p>
            <div className="etapas">
              <h3>Etapas do Tratamento:</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedTratamento.etapas }} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Tratamentos;


