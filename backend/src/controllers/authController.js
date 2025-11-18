import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../database/db.js';

export const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios'
    });
  }

  // Normalizar email (remover espaços e converter para minúsculas)
  const emailNormalizado = email.trim().toLowerCase();

  const db = getDb();
  db.get('SELECT * FROM usuarios_admin WHERE LOWER(TRIM(email)) = ?', [emailNormalizado], async (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });
  });
};

export const me = (req, res) => {
  const db = getDb();
  db.get('SELECT id, nome, email, criado_em FROM usuarios_admin WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário'
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      user
    });
  });
};

