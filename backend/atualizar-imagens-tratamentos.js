import { getDb } from './src/database/db.js';

const atualizarImagens = () => {
  const db = getDb();
  
  // Mapear tratamentos para imagens existentes ou usar as que temos
  const atualizacoes = [
    { nome: 'Clareamento Dental', imagem: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg' },
    { nome: 'Implante Dentário', imagem: '/images/tratamentos/ilustracao-implante.jpeg' },
    { nome: 'Ortodontia', imagem: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg' }, // Reutilizar imagem
    { nome: 'Endodontia', imagem: '/images/tratamentos/ilustracao-implante.jpeg' }, // Reutilizar imagem
    { nome: 'Prótese Dentária', imagem: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg' }, // Reutilizar imagem
    { nome: 'Periodontia', imagem: '/images/tratamentos/ilustracao-implante.jpeg' } // Reutilizar imagem
  ];

  atualizacoes.forEach((tratamento) => {
    db.run(
      'UPDATE tratamentos SET imagem_url = ? WHERE nome = ?',
      [tratamento.imagem, tratamento.nome],
      (err) => {
        if (err) {
          console.error(`Erro ao atualizar ${tratamento.nome}:`, err);
        } else {
          console.log(`✅ ${tratamento.nome} atualizado: ${tratamento.imagem}`);
        }
      }
    );
  });

  // Aguardar um pouco para as atualizações completarem
  setTimeout(() => {
    console.log('\n✅ Todas as imagens foram atualizadas!');
    console.log('Recarregue o site para ver as mudanças.');
    process.exit(0);
  }, 1000);
};

atualizarImagens();


