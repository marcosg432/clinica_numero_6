import express from 'express';
import {
  getAllAvaliacoes,
  getAvaliacaoById,
  createAvaliacao,
  updateAvaliacao,
  deleteAvaliacao
} from '../controllers/avaliacoesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllAvaliacoes);
router.get('/:id', getAvaliacaoById);

// Rotas protegidas (admin)
router.post('/', authenticateToken, createAvaliacao);
router.put('/:id', authenticateToken, updateAvaliacao);
router.delete('/:id', authenticateToken, deleteAvaliacao);

export default router;


