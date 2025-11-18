import { getDb } from './db.js';

export const seedDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = getDb();

    db.serialize(() => {
      // Inserir tratamentos de exemplo
      const tratamentos = [
        {
          nome: 'Clareamento Dental',
          descricao_resumida: 'Técnica avançada para clarear os dentes de forma segura e eficaz.',
          descricao_completa: 'O clareamento dental é um procedimento estético que utiliza produtos à base de peróxido de hidrogênio ou peróxido de carbamida para remover manchas e clarear os dentes. Pode ser feito no consultório ou em casa, sempre com acompanhamento profissional.',
          etapas: '<ul><li>Consulta inicial e avaliação</li><li>Limpeza profissional</li><li>Aplicação do gel clareador</li><li>Sessões de acompanhamento</li><li>Manutenção e cuidados</li></ul>',
          imagem_url: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg'
        },
        {
          nome: 'Implante Dentário',
          descricao_resumida: 'Solução definitiva para reposição de dentes perdidos com tecnologia de ponta.',
          descricao_completa: 'O implante dentário é uma estrutura de titânio que substitui a raiz do dente perdido. É a melhor opção para quem perdeu um ou mais dentes, oferecendo uma solução permanente e natural.',
          etapas: '<ul><li>Planejamento e exames</li><li>Cirurgia de colocação do implante</li><li>Período de osseointegração (3-6 meses)</li><li>Colocação do pilar</li><li>Instalação da prótese definitiva</li></ul>',
          imagem_url: '/images/tratamentos/ilustracao-implante.jpeg'
        },
        {
          nome: 'Ortodontia',
          descricao_resumida: 'Correção de dentes desalinhados e problemas de mordida.',
          descricao_completa: 'A ortodontia corrige a posição dos dentes e dos ossos maxilares posicionados de forma inadequada. Pode ser feita com aparelhos fixos ou móveis, dependendo do caso.',
          etapas: '<ul><li>Diagnóstico e planejamento</li><li>Instalação do aparelho</li><li>Ajustes periódicos</li><li>Manutenção e cuidados</li><li>Remoção e contenção</li></ul>',
          imagem_url: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg'
        },
        {
          nome: 'Endodontia',
          descricao_resumida: 'Tratamento de canal para salvar dentes comprometidos.',
          descricao_completa: 'A endodontia trata as doenças da polpa e da raiz do dente. O tratamento de canal é realizado quando a polpa está inflamada ou infectada, salvando o dente da extração.',
          etapas: '<ul><li>Diagnóstico e anestesia</li><li>Acesso ao canal</li><li>Limpeza e desinfecção</li><li>Obturação do canal</li><li>Restauração do dente</li></ul>',
          imagem_url: '/images/tratamentos/ilustracao-implante.jpeg'
        },
        {
          nome: 'Prótese Dentária',
          descricao_resumida: 'Reabilitação estética e funcional com próteses personalizadas.',
          descricao_completa: 'As próteses dentárias são dispositivos que substituem dentes perdidos, podendo ser fixas ou removíveis. Oferecemos próteses de alta qualidade e estética natural.',
          etapas: '<ul><li>Moldagem e planejamento</li><li>Preparação dos dentes</li><li>Confecção da prótese</li><li>Teste e ajustes</li><li>Instalação definitiva</li></ul>',
          imagem_url: '/images/tratamentos/ilustracao-implante.jpeg'
        },
        {
          nome: 'Periodontia',
          descricao_resumida: 'Tratamento de doenças das gengivas e tecidos de suporte.',
          descricao_completa: 'A periodontia trata doenças que afetam as gengivas e os tecidos que sustentam os dentes. O tratamento precoce previne a perda dentária.',
          etapas: '<ul><li>Diagnóstico e exames</li><li>Limpeza profunda (raspagem)</li><li>Tratamento cirúrgico (se necessário)</li><li>Manutenção periódica</li><li>Orientações de higiene</li></ul>',
          imagem_url: '/images/tratamentos/mulher-sorrindo-clareamento.jpeg'
        }
      ];

      // Verificar se já existem tratamentos
      db.get('SELECT COUNT(*) as count FROM tratamentos', [], (err, row) => {
        if (err) {
          console.error('Erro ao verificar tratamentos:', err);
          reject(err);
          return;
        }

        if (row.count === 0) {
          const stmt = db.prepare('INSERT INTO tratamentos (nome, descricao_resumida, descricao_completa, etapas, imagem_url) VALUES (?, ?, ?, ?, ?)');
          
          tratamentos.forEach((tratamento) => {
            stmt.run([
              tratamento.nome,
              tratamento.descricao_resumida,
              tratamento.descricao_completa,
              tratamento.etapas,
              tratamento.imagem_url
            ]);
          });

          stmt.finalize((err) => {
            if (err) {
              console.error('Erro ao inserir tratamentos:', err);
              reject(err);
              return;
            }
            console.log('✅ Tratamentos de exemplo inseridos');
          });
        } else {
          console.log('✅ Tratamentos já existem no banco');
        }
      });

      // Inserir avaliações de exemplo
      const avaliacoes = [
        {
          nome_cliente: 'Maria Silva',
          nota: 5,
          comentario: 'Excelente atendimento! A equipe é muito profissional e o ambiente é acolhedor. Recomendo!',
          imagem_perfil_url: '/images/avaliacoes/maria.jpg'
        },
        {
          nome_cliente: 'João Santos',
          nota: 5,
          comentario: 'Fiz um implante e o resultado superou minhas expectativas. Equipe muito competente!',
          imagem_perfil_url: '/images/avaliacoes/joao.jpg'
        },
        {
          nome_cliente: 'Ana Costa',
          nota: 5,
          comentario: 'Melhor clínica odontológica que já frequentei. Atendimento de primeira qualidade!',
          imagem_perfil_url: '/images/avaliacoes/ana.jpg'
        },
        {
          nome_cliente: 'Pedro Oliveira',
          nota: 5,
          comentario: 'Profissionais muito atenciosos e cuidadosos. Meu sorriso está perfeito!',
          imagem_perfil_url: '/images/avaliacoes/pedro.jpg'
        }
      ];

      db.get('SELECT COUNT(*) as count FROM avaliacao_clientes', [], (err, row) => {
        if (err) {
          console.error('Erro ao verificar avaliações:', err);
          reject(err);
          return;
        }

        if (row.count === 0) {
          const stmt = db.prepare('INSERT INTO avaliacao_clientes (nome_cliente, nota, comentario, imagem_perfil_url) VALUES (?, ?, ?, ?)');
          
          avaliacoes.forEach((avaliacao) => {
            stmt.run([
              avaliacao.nome_cliente,
              avaliacao.nota,
              avaliacao.comentario,
              avaliacao.imagem_perfil_url
            ]);
          });

          stmt.finalize((err) => {
            if (err) {
              console.error('Erro ao inserir avaliações:', err);
              reject(err);
              return;
            }
            console.log('✅ Avaliações de exemplo inseridas');
            resolve();
          });
        } else {
          console.log('✅ Avaliações já existem no banco');
          resolve();
        }
      });
    });
  });
};

