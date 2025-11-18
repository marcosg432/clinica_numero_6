import { getDb } from '../database/db.js';

export const createAgendamento = (req, res) => {
  const { nome_paciente, telefone, email, tratamento_id, data_agendada, hora_agendada, mensagem } = req.body;

  if (!nome_paciente || !telefone || !email || !data_agendada || !hora_agendada) {
    return res.status(400).json({
      success: false,
      message: 'Nome, telefone, email, data e hora são obrigatórios'
    });
  }

  const db = getDb();
  
  // Verificar conflito de horário
  db.get(
    'SELECT * FROM agendamentos WHERE data_agendada = ? AND hora_agendada = ? AND status != ?',
    [data_agendada, hora_agendada, 'recusado'],
    (err, conflito) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao verificar disponibilidade'
        });
      }

      if (conflito) {
        return res.status(409).json({
          success: false,
          message: 'Horário já está agendado. Por favor, escolha outro horário.'
        });
      }

      // Criar agendamento
      db.run(
        'INSERT INTO agendamentos (nome_paciente, telefone, email, tratamento_id, data_agendada, hora_agendada, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome_paciente, telefone, email, tratamento_id || null, data_agendada, hora_agendada, mensagem || null],
        function(err) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Erro ao criar agendamento'
            });
          }
          res.status(201).json({
            success: true,
            message: 'Agendamento criado com sucesso! Entraremos em contato em breve.',
            data: { id: this.lastID, ...req.body, status: 'pendente' }
          });
        }
      );
    }
  );
};

export const getAllAgendamentos = (req, res) => {
  const { data, status } = req.query;
  const db = getDb();
  
  let query = 'SELECT a.*, t.nome as tratamento_nome FROM agendamentos a LEFT JOIN tratamentos t ON a.tratamento_id = t.id';
  const params = [];
  const conditions = [];

  if (data) {
    conditions.push('a.data_agendada = ?');
    params.push(data);
  }

  if (status) {
    conditions.push('a.status = ?');
    params.push(status);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY a.data_agendada DESC, a.hora_agendada DESC';

  db.all(query, params, (err, agendamentos) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar agendamentos'
      });
    }
    res.json({
      success: true,
      data: agendamentos
    });
  });
};

export const getAgendamentoById = (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.get(
    'SELECT a.*, t.nome as tratamento_nome FROM agendamentos a LEFT JOIN tratamentos t ON a.tratamento_id = t.id WHERE a.id = ?',
    [id],
    (err, agendamento) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao buscar agendamento'
        });
      }
      if (!agendamento) {
        return res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado'
        });
      }
      res.json({
        success: true,
        data: agendamento
      });
    }
  );
};

export const updateAgendamento = (req, res) => {
  const { id } = req.params;
  const { nome_paciente, telefone, email, tratamento_id, data_agendada, hora_agendada, mensagem, status } = req.body;

  const db = getDb();
  const updates = [];
  const values = [];

  if (nome_paciente) { updates.push('nome_paciente = ?'); values.push(nome_paciente); }
  if (telefone) { updates.push('telefone = ?'); values.push(telefone); }
  if (email) { updates.push('email = ?'); values.push(email); }
  if (tratamento_id !== undefined) { updates.push('tratamento_id = ?'); values.push(tratamento_id); }
  if (data_agendada) { updates.push('data_agendada = ?'); values.push(data_agendada); }
  if (hora_agendada) { updates.push('hora_agendada = ?'); values.push(hora_agendada); }
  if (mensagem !== undefined) { updates.push('mensagem = ?'); values.push(mensagem); }
  if (status) { updates.push('status = ?'); values.push(status); }

  if (updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Nenhum campo para atualizar'
    });
  }

  values.push(id);
  db.run(
    `UPDATE agendamentos SET ${updates.join(', ')} WHERE id = ?`,
    values,
    function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao atualizar agendamento'
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado'
        });
      }
      res.json({
        success: true,
        message: 'Agendamento atualizado com sucesso'
      });
    }
  );
};

export const deleteAgendamento = (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.run('DELETE FROM agendamentos WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar agendamento'
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Agendamento não encontrado'
      });
    }
    res.json({
      success: true,
      message: 'Agendamento deletado com sucesso'
    });
  });
};


