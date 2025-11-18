import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '../../database.sqlite');

let db = null;

export const getDb = () => {
  if (!db) {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
      } else {
        console.log('✅ Conectado ao banco de dados SQLite');
      }
    });
  }
  return db;
};

export const closeDb = () => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco de dados:', err);
      } else {
        console.log('Banco de dados fechado');
      }
    });
  }
};


