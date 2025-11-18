import express from 'express';
import {
  getAllTratamentos,
  getTratamentoById,
  createTratamento,
  updateTratamento,
  deleteTratamento
} from '../controllers/tratamentosController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllTratamentos);
router.get('/:id', getTratamentoById);

// Rotas protegidas (admin)
router.post('/', authenticateToken, createTratamento);
router.put('/:id', authenticateToken, updateTratamento);
router.delete('/:id', authenticateToken, deleteTratamento);

export default router;


