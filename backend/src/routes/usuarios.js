import express from 'express';
import {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../controllers/usuariosController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Todas as rotas são protegidas
router.get('/', authenticateToken, getAllUsuarios);
router.post('/', authenticateToken, createUsuario);
router.put('/:id', authenticateToken, updateUsuario);
router.delete('/:id', authenticateToken, deleteUsuario);

export default router;


