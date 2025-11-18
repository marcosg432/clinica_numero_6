import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [tratamentos, setTratamentos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [selectedTratamento, setSelectedTratamento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome_paciente: '',
    telefone: '',
    email: '',
    tratamento_id: '',
    data_agendada: '',
    hora_agendada: '',
    mensagem: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchTratamentos();
    fetchAvaliacoes();
  }, []);

  const fetchTratamentos = async () => {
    try {
      console.log('Buscando tratamentos...');
      const response = await api.get('/tratamentos');
      console.log('Resposta da API:', response.data);
      
      if (response.data && response.data.data) {
        const tratamentosList = response.data.data.slice(0, 6);
        console.log('Tratamentos encontrados:', tratamentosList.length);
        setTratamentos(tratamentosList);
      } else {
        console.warn('Resposta da API não contém dados:', response.data);
        setTratamentos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar tratamentos:', error);
      console.error('Detalhes do erro:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setTratamentos([]);
    }
  };

  const fetchAvaliacoes = async () => {
    try {
      const response = await api.get('/avaliacoes');
      setAvaliacoes(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  };

  const openTratamentoModal = (tratamento) => {
    setSelectedTratamento(tratamento);
    setIsModalOpen(true);
  };

  const handleSubmitAgendamento = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      const response = await api.post('/agendamentos', formData);
      if (response.data.success) {
        setSubmitStatus({ type: 'success', message: response.data.message });
        setFormData({
          nome_paciente: '',
          telefone: '',
          email: '',
          tratamento_id: '',
          data_agendada: '',
          hora_agendada: '',
          mensagem: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao enviar agendamento'
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Banner */}
        <section className="banner">
          <div className="banner-content">
            <div>
              <h1>Bem-vindo à Clínica Odontológica</h1>
              <p>Cuidando do seu sorriso com excelência e tecnologia de ponta</p>
              <a href="#agendamento" className="btn btn-primary">
                Agendar Consulta
              </a>
            </div>
            <div className="banner-image">
              <img src="/images/banner-doutora.png" alt="Banner Clínica" />
            </div>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="section quem-somos">
          <div className="container">
            <h2 className="section-title">Quem Somos — Clínica Odontológica</h2>
            <div className="quem-somos-content">
              <p>
                Somos uma clínica odontológica moderna e completa, dedicada a proporcionar 
                o melhor atendimento e cuidado com a saúde bucal de nossos pacientes. 
                Com uma equipe altamente qualificada e equipamentos de última geração, 
                oferecemos tratamentos personalizados para cada necessidade.
              </p>
              <div className="quem-somos-images">
                <img src="/images/consultorio.jpeg" alt="Consultório Odontológico" />
                <img src="/images/recepcao.jpeg" alt="Recepção da Clínica" />
                <img src="/images/exterior-clinica.jpeg" alt="Exterior da Clínica" />
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="section nossa-equipe">
          <div className="container">
            <h2 className="section-title">Nossa Equipe</h2>
            <div className="equipe-content">
              <div className="equipe-texto">
                <img src="/images/equipe.png" alt="Nossa Equipe" />
                <div>
                  <h3>Atendimento Personalizado</h3>
                  <p>
                    Nossa equipe é formada por profissionais experientes e dedicados, 
                    que trabalham com paixão para garantir o melhor resultado em cada tratamento. 
                    Oferecemos um atendimento humanizado e personalizado, sempre priorizando 
                    o conforto e bem-estar dos nossos pacientes.
                  </p>
                </div>
              </div>
              <div className="dentistas-cards">
                <div className="dentista-card">
                  <img src="/images/dentistas/dr-henrique.png" alt="Dr. Henrique" />
                  <h4>Dr. Henrique</h4>
                  <p>Implantologia e Ortodontia</p>
                </div>
                <div className="dentista-card">
                  <img src="/images/dentistas/dr-julia.png" alt="Dra. Julia" />
                  <h4>Dra. Julia</h4>
                  <p>Odontologia Geral</p>
                </div>
                <div className="dentista-card">
                  <img src="/images/dentistas/dr-yagor.png" alt="Dr. Yagor" />
                  <h4>Dr. Yagor</h4>
                  <p>Odontologia Estética</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tratamentos */}
        <section className="section tratamentos-section">
          <div className="container">
            <h2 className="section-title">Nossos Tratamentos</h2>
            {tratamentos.length > 0 ? (
              <>
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
                      <button className="btn btn-secondary">Saiba Mais</button>
                    </div>
                  ))}
                </div>
                <div className="text-center" style={{ marginTop: '40px' }}>
                  <a href="/tratamentos" className="btn btn-primary">
                    Ver todos os tratamentos
                  </a>
                </div>
              </>
            ) : (
              <div className="empty-tratamentos" style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--cinza-medio)', marginBottom: '20px' }}>
                  Nenhum tratamento cadastrado ainda.
                </p>
                <p style={{ color: 'var(--cinza-medio)' }}>
                  Acesse o painel administrativo para adicionar tratamentos.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Avaliações */}
        <section className="section avaliacoes-section">
          <div className="container">
            <h2 className="section-title">Avaliações dos Clientes</h2>
            <div className="avaliacoes-grid">
              {avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="avaliacao-card">
                  <div className="avaliacao-header">
                    <img src={avaliacao.imagem_perfil_url} alt={avaliacao.nome_cliente} />
                    <div>
                      <h4>{avaliacao.nome_cliente}</h4>
                      <div className="estrelas">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < avaliacao.nota ? 'estrela-ativa' : ''}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>{avaliacao.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mapa + Agendamento */}
        <section id="agendamento" className="section mapa-agendamento">
          <div className="container">
            <h2 className="section-title">Agende sua Consulta</h2>
            <div className="mapa-agendamento-content">
              <div className="mapa-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197576294618!2d-46.633309!3d-23.550520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjkiUyA0NsKwMzcnNTkuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="agendamento-form-container">
                <form onSubmit={handleSubmitAgendamento} className="agendamento-form">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={formData.nome_paciente}
                    onChange={(e) => setFormData({ ...formData, nome_paciente: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <select
                    value={formData.tratamento_id}
                    onChange={(e) => setFormData({ ...formData, tratamento_id: e.target.value })}
                  >
                    <option value="">Selecione o tratamento</option>
                    {tratamentos.map((tratamento) => (
                      <option key={tratamento.id} value={tratamento.id}>
                        {tratamento.nome}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={formData.data_agendada}
                    onChange={(e) => setFormData({ ...formData, data_agendada: e.target.value })}
                    required
                  />
                  <input
                    type="time"
                    value={formData.hora_agendada}
                    onChange={(e) => setFormData({ ...formData, hora_agendada: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Mensagem (opcional)"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    rows="4"
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    Enviar Agendamento
                  </button>
                  {submitStatus && (
                    <div className={`submit-message ${submitStatus.type}`}>
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de Tratamento */}
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

export default Home;

