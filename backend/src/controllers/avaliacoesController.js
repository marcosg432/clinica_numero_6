import { getDb } from '../database/db.js';

export const getAllAvaliacoes = (req, res) => {
  const db = getDb();
  db.all('SELECT * FROM avaliacao_clientes ORDER BY criado_em DESC', [], (err, avaliacoes) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliações'
      });
    }
    res.json({
      success: true,
      data: avaliacoes
    });
  });
};

export const getAvaliacaoById = (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.get('SELECT * FROM avaliacao_clientes WHERE id = ?', [id], (err, avaliacao) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliação'
      });
    }
    if (!avaliacao) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada'
      });
    }
    res.json({
      success: true,
      data: avaliacao
    });
  });
};

export const createAvaliacao = (req, res) => {
  const { nome_cliente, nota, comentario, imagem_perfil_url } = req.body;

  if (!nome_cliente || !nota || !comentario || !imagem_perfil_url) {
    return res.status(400).json({
      success: false,
      message: 'Todos os campos são obrigatórios'
    });
  }

  if (nota < 1 || nota > 5) {
    return res.status(400).json({
      success: false,
      message: 'Nota deve estar entre 1 e 5'
    });
  }

  const db = getDb();
  db.run(
    'INSERT INTO avaliacao_clientes (nome_cliente, nota, comentario, imagem_perfil_url) VALUES (?, ?, ?, ?)',
    [nome_cliente, nota, comentario, imagem_perfil_url],
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao criar avaliação'
        });
      }
      res.status(201).json({
        success: true,
        message: 'Avaliação criada com sucesso',
        data: { id: this.lastID, ...req.body }
      });
    }
  );
};

export const updateAvaliacao = (req, res) => {
  const { id } = req.params;
  const { nome_cliente, nota, comentario, imagem_perfil_url } = req.body;

  if (nota && (nota < 1 || nota > 5)) {
    return res.status(400).json({
      success: false,
      message: 'Nota deve estar entre 1 e 5'
    });
  }

  const db = getDb();
  const updates = [];
  const values = [];

  if (nome_cliente) { updates.push('nome_cliente = ?'); values.push(nome_cliente); }
  if (nota) { updates.push('nota = ?'); values.push(nota); }
  if (comentario) { updates.push('comentario = ?'); values.push(comentario); }
  if (imagem_perfil_url) { updates.push('imagem_perfil_url = ?'); values.push(imagem_perfil_url); }

  if (updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Nenhum campo para atualizar'
    });
  }

  values.push(id);
  db.run(
    `UPDATE avaliacao_clientes SET ${updates.join(', ')} WHERE id = ?`,
    values,
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao atualizar avaliação'
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Avaliação não encontrada'
        });
      }
      res.json({
        success: true,
        message: 'Avaliação atualizada com sucesso'
      });
    }
  );
};

export const deleteAvaliacao = (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.run('DELETE FROM avaliacao_clientes WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar avaliação'
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada'
      });
    }
    res.json({
      success: true,
      message: 'Avaliação deletada com sucesso'
    });
  });
};


