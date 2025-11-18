import bcrypt from 'bcryptjs';
import { getDb } from './src/database/db.js';

const resetAdmin = async () => {
  const db = getDb();
  
  // Hash da senha admin123
  const senhaHash = await bcrypt.hash('admin123', 10);
  
  // Verificar se o usuário existe
  db.get('SELECT * FROM usuarios_admin WHERE email = ?', ['admin@clinica.com'], async (err, row) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      process.exit(1);
      return;
    }
    
    if (row) {
      // Atualizar senha
      db.run(
        'UPDATE usuarios_admin SET senha_hash = ? WHERE email = ?',
        [senhaHash, 'admin@clinica.com'],
        (err) => {
          if (err) {
            console.error('Erro ao atualizar senha:', err);
            process.exit(1);
            return;
          }
          console.log('✅ Senha do admin resetada com sucesso!');
          console.log('Email: admin@clinica.com');
          console.log('Senha: admin123');
          process.exit(0);
        }
      );
    } else {
      // Criar usuário se não existir
      db.run(
        'INSERT INTO usuarios_admin (nome, email, senha_hash) VALUES (?, ?, ?)',
        ['Administrador', 'admin@clinica.com', senhaHash],
        (err) => {
          if (err) {
            console.error('Erro ao criar usuário:', err);
            process.exit(1);
            return;
          }
          console.log('✅ Usuário admin criado com sucesso!');
          console.log('Email: admin@clinica.com');
          console.log('Senha: admin123');
          process.exit(0);
        }
      );
    }
  });
};

resetAdmin();


