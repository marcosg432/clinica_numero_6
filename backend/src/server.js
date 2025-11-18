import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initDatabase } from './database/init.js';
import authRoutes from './routes/auth.js';
import tratamentosRoutes from './routes/tratamentos.js';
import avaliacoesRoutes from './routes/avaliacoes.js';
import agendamentosRoutes from './routes/agendamentos.js';
import usuariosRoutes from './routes/usuarios.js';

dotenv.config();

// Garantir que JWT_SECRET existe
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'clinica_odontologica_secret_key_2024';
  console.log('⚠️ JWT_SECRET não encontrado no .env, usando valor padrão');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logs básicos
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/tratamentos', tratamentosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Rota raiz - informar que é uma API
app.get('/', (req, res) => {
  res.json({
    message: 'API da Clínica Odontológica',
    status: 'online',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tratamentos: '/api/tratamentos',
      avaliacoes: '/api/avaliacoes',
      agendamentos: '/api/agendamentos',
      usuarios: '/api/usuarios'
    },
    frontend: 'http://localhost:5173'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor'
  });
});

// Inicializar banco de dados e servidor
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao inicializar banco de dados:', err);
  process.exit(1);
});

