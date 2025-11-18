import express from 'express';
import {
  createAgendamento,
  getAllAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento
} from '../controllers/agendamentosController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rota pública para criar agendamento
router.post('/', createAgendamento);

// Rotas protegidas (admin)
router.get('/', authenticateToken, getAllAgendamentos);
router.get('/:id', authenticateToken, getAgendamentoById);
router.put('/:id', authenticateToken, updateAgendamento);
router.delete('/:id', authenticateToken, deleteAgendamento);

export default router;


