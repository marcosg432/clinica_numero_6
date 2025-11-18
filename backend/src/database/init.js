import { getDb } from './db.js';
import bcrypt from 'bcryptjs';
import { seedDatabase } from './seed.js';

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = getDb();

    // Criar tabelas
    db.serialize(() => {
      // Tabela de usuários admin
      db.run(`
        CREATE TABLE IF NOT EXISTS usuarios_admin (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha_hash TEXT NOT NULL,
          criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Erro ao criar tabela usuarios_admin:', err);
          reject(err);
          return;
        }
        console.log('✅ Tabela usuarios_admin criada');
      });

      // Tabela de tratamentos
      db.run(`
        CREATE TABLE IF NOT EXISTS tratamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          descricao_resumida TEXT NOT NULL,
          descricao_completa TEXT NOT NULL,
          etapas TEXT NOT NULL,
          imagem_url TEXT NOT NULL,
          criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Erro ao criar tabela tratamentos:', err);
          reject(err);
          return;
        }
        console.log('✅ Tabela tratamentos criada');
      });

      // Tabela de avaliações
      db.run(`
        CREATE TABLE IF NOT EXISTS avaliacao_clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome_cliente TEXT NOT NULL,
          nota INTEGER NOT NULL CHECK(nota >= 1 AND nota <= 5),
          comentario TEXT NOT NULL,
          imagem_perfil_url TEXT NOT NULL,
          criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Erro ao criar tabela avaliacao_clientes:', err);
          reject(err);
          return;
        }
        console.log('✅ Tabela avaliacao_clientes criada');
      });

      // Tabela de agendamentos
      db.run(`
        CREATE TABLE IF NOT EXISTS agendamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome_paciente TEXT NOT NULL,
          telefone TEXT NOT NULL,
          email TEXT NOT NULL,
          tratamento_id INTEGER,
          data_agendada DATE NOT NULL,
          hora_agendada TIME NOT NULL,
          mensagem TEXT,
          status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'aprovado', 'recusado', 'concluido')),
          criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (tratamento_id) REFERENCES tratamentos(id)
        )
      `, (err) => {
        if (err) {
          console.error('Erro ao criar tabela agendamentos:', err);
          reject(err);
          return;
        }
        console.log('✅ Tabela agendamentos criada');
      });

      // Criar usuário admin padrão
      db.get('SELECT * FROM usuarios_admin WHERE email = ?', ['admin@clinica.com'], async (err, row) => {
        if (err) {
          console.error('Erro ao verificar admin:', err);
          reject(err);
          return;
        }

        if (!row) {
          const senhaHash = await bcrypt.hash('admin123', 10);
          db.run(
            'INSERT INTO usuarios_admin (nome, email, senha_hash) VALUES (?, ?, ?)',
            ['Administrador', 'admin@clinica.com', senhaHash],
            (err) => {
              if (err) {
                console.error('Erro ao criar admin padrão:', err);
                reject(err);
                return;
              }
              console.log('✅ Usuário admin padrão criado (admin@clinica.com / admin123)');
              // Popular banco com dados de exemplo
              seedDatabase().then(() => {
                resolve();
              }).catch((err) => {
                console.error('Erro ao popular banco:', err);
                resolve(); // Continua mesmo se o seed falhar
              });
            }
          );
        } else {
          console.log('✅ Usuário admin já existe');
          // Tentar popular banco mesmo se admin já existe
          seedDatabase().then(() => {
            resolve();
          }).catch((err) => {
            console.error('Erro ao popular banco:', err);
            resolve(); // Continua mesmo se o seed falhar
          });
        }
      });
    });
  });
};

