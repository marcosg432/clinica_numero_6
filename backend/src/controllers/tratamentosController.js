import { getDb } from '../database/db.js';

export const getAllTratamentos = (req, res) => {
  const db = getDb();
  db.all('SELECT * FROM tratamentos ORDER BY criado_em DESC', [], (err, tratamentos) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar tratamentos'
      });
    }
    res.json({
      success: true,
      data: tratamentos
    });
  });
};

export const getTratamentoById = (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.get('SELECT * FROM tratamentos WHERE id = ?', [id], (err, tratamento) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar tratamento'
      });
    }
    if (!tratamento) {
      return res.status(404).json({
        success: false,
        message: 'Tratamento não encontrado'
      });
    }
    res.json({
      success: true,
      data: tratamento
    });
  });
};

export const createTratamento = (req, res) => {
  const { nome, descricao_resumida, descricao_completa, etapas, imagem_url } = req.body;

  if (!nome || !descricao_resumida || !descricao_completa || !etapas || !imagem_url) {
    return res.status(400).json({
      success: false,
      message: 'Todos os campos são obrigatórios'
    });
  }

  const db = getDb();
  db.run(
    'INSERT INTO tratamentos (nome, descricao_resumida, descricao_completa, etapas, imagem_url) VALUES (?, ?, ?, ?, ?)',
    [nome, descricao_resumida, descricao_completa, etapas, imagem_url],
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao criar tratamento'
        });
      }
      res.status(201).json({
        success: true,
        message: 'Tratamento criado com sucesso',
        data: { id: this.lastID, ...req.body }
      });
    }
  );
};

export const updateTratamento = (req, res) => {
  const { id } = req.params;
  const { nome, descricao_resumida, descricao_completa, etapas, imagem_url } = req.body;

  const db = getDb();
  db.run(
    'UPDATE tratamentos SET nome = ?, descricao_resumida = ?, descricao_completa = ?, etapas = ?, imagem_url = ? WHERE id = ?',
    [nome, descricao_resumida, descricao_completa, etapas, imagem_url, id],
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao atualizar tratamento'
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Tratamento não encontrado'
        });
      }
      res.json({
        success: true,
        message: 'Tratamento atualizado com sucesso'
      });
    }
  );
};

export const deleteTratamento = (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.run('DELETE FROM tratamentos WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar tratamento'
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tratamento não encontrado'
      });
    }
    res.json({
      success: true,
      message: 'Tratamento deletado com sucesso'
    });
  });
};


