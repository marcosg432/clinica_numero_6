import bcrypt from 'bcryptjs';
import { getDb } from '../database/db.js';

export const getAllUsuarios = (req, res) => {
  const db = getDb();
  db.all('SELECT id, nome, email, criado_em FROM usuarios_admin ORDER BY criado_em DESC', [], (err, usuarios) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários'
      });
    }
    res.json({
      success: true,
      data: usuarios
    });
  });
};

export const createUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      success: false,
      message: 'Nome, email e senha são obrigatórios'
    });
  }

  const db = getDb();
  
  // Verificar se email já existe
  db.get('SELECT * FROM usuarios_admin WHERE email = ?', [email], async (err, existingUser) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao verificar usuário'
      });
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    db.run(
      'INSERT INTO usuarios_admin (nome, email, senha_hash) VALUES (?, ?, ?)',
      [nome, email, senhaHash],
      function(err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Erro ao criar usuário'
          });
        }
        res.status(201).json({
          success: true,
          message: 'Usuário criado com sucesso',
          data: { id: this.lastID, nome, email }
        });
      }
    );
  });
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const db = getDb();
  const updates = [];
  const values = [];

  if (nome) { updates.push('nome = ?'); values.push(nome); }
  if (email) { updates.push('email = ?'); values.push(email); }
  if (senha) {
    const senhaHash = await bcrypt.hash(senha, 10);
    updates.push('senha_hash = ?');
    values.push(senhaHash);
  }

  if (updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Nenhum campo para atualizar'
    });
  }

  values.push(id);
  db.run(
    `UPDATE usuarios_admin SET ${updates.join(', ')} WHERE id = ?`,
    values,
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao atualizar usuário'
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso'
      });
    }
  );
};

export const deleteUsuario = (req, res) => {
  const { id } = req.params;
  
  // Não permitir deletar o próprio usuário
  if (parseInt(id) === req.user.id) {
    return res.status(400).json({
      success: false,
      message: 'Você não pode deletar seu próprio usuário'
    });
  }

  const db = getDb();
  db.run('DELETE FROM usuarios_admin WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário'
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });
  });
};


