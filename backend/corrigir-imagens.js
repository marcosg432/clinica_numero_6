import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Atualizando caminhos das imagens dos tratamentos...\n');

const atualizacoes = [
  { nome: 'Ortodontia', imagem: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg' },
  { nome: 'Endodontia', imagem: '/images/tratamentos/ilustracao-implante.jpeg' },
  { nome: 'Prótese Dentária', imagem: '/images/tratamentos/ilustracao-implante.jpeg' },
  { nome: 'Periodontia', imagem: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg' }
];

let completos = 0;

atualizacoes.forEach((tratamento) => {
  db.run(
    'UPDATE tratamentos SET imagem_url = ? WHERE nome = ?',
    [tratamento.imagem, tratamento.nome],
    function(err) {
      if (err) {
        console.error(`❌ Erro ao atualizar ${tratamento.nome}:`, err.message);
      } else {
        console.log(`✅ ${tratamento.nome} → ${tratamento.imagem}`);
      }
      completos++;
      if (completos === atualizacoes.length) {
        console.log('\n✅ Todas as imagens foram atualizadas!');
        console.log('Recarregue o site para ver as mudanças.');
        db.close();
        process.exit(0);
      }
    }
  );
});


