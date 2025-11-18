# 🦷 Sistema Completo de Clínica Odontológica

Sistema completo com frontend, backend, banco de dados e painel administrativo.

## 📁 Estrutura do Projeto

```
numero_6/
├── frontend/                    # Aplicação React
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── admin/           # Componentes do painel admin
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Modal.jsx
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── Home.jsx
│   │   │   ├── Tratamentos.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/             # Context API
│   │   ├── services/            # Serviços API
│   │   └── App.jsx
│   └── package.json
├── backend/                      # API Node.js/Express
│   ├── src/
│   │   ├── controllers/         # Controladores
│   │   ├── routes/              # Rotas
│   │   ├── models/              # Modelos (SQLite)
│   │   ├── middleware/          # Middlewares
│   │   ├── database/            # Configuração do banco
│   │   └── server.js
│   └── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### 1. Instalar Dependências do Backend

```bash
cd backend
npm install
```

### 2. Inicializar Banco de Dados

O banco de dados será criado automaticamente na primeira execução do servidor.

### 3. Executar Backend

```bash
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 4. Instalar Dependências do Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

### 5. Executar Frontend

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 🔐 Credenciais Padrão

- **Email**: admin@clinica.com
- **Senha**: admin123

## 📋 Funcionalidades

### Frontend (Site Público)

- ✅ Home com banner, quem somos, equipe, tratamentos e avaliações
- ✅ Página de tratamentos completa
- ✅ Sistema de agendamento integrado
- ✅ Modais para detalhes de tratamentos
- ✅ Layout responsivo e moderno
- ✅ Animações suaves

### Backend (API)

- ✅ API REST completa
- ✅ Autenticação JWT
- ✅ CRUD de tratamentos
- ✅ CRUD de avaliações
- ✅ CRUD de agendamentos
- ✅ Gerenciamento de usuários admin
- ✅ Validações e tratamento de erros
- ✅ Verificação de conflitos de horário

### Painel Administrativo

- ✅ Login seguro
- ✅ Gerenciamento de tratamentos
- ✅ Gerenciamento de avaliações
- ✅ Gerenciamento de agendamentos (com filtros)
- ✅ Gerenciamento de usuários admin
- ✅ Interface moderna e responsiva

## 🛠️ Tecnologias

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite
- **Autenticação**: JWT (jsonwebtoken)
- **Estilização**: CSS Moderno
- **Roteamento**: React Router DOM

## 📝 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário atual (protegido)

### Tratamentos
- `GET /api/tratamentos` - Listar todos
- `GET /api/tratamentos/:id` - Obter por ID
- `POST /api/tratamentos` - Criar (protegido)
- `PUT /api/tratamentos/:id` - Atualizar (protegido)
- `DELETE /api/tratamentos/:id` - Excluir (protegido)

### Avaliações
- `GET /api/avaliacoes` - Listar todas
- `GET /api/avaliacoes/:id` - Obter por ID
- `POST /api/avaliacoes` - Criar (protegido)
- `PUT /api/avaliacoes/:id` - Atualizar (protegido)
- `DELETE /api/avaliacoes/:id` - Excluir (protegido)

### Agendamentos
- `POST /api/agendamentos` - Criar (público)
- `GET /api/agendamentos` - Listar todos (protegido)
- `GET /api/agendamentos/:id` - Obter por ID (protegido)
- `PUT /api/agendamentos/:id` - Atualizar (protegido)
- `DELETE /api/agendamentos/:id` - Excluir (protegido)

### Usuários
- `GET /api/usuarios` - Listar todos (protegido)
- `POST /api/usuarios` - Criar (protegido)
- `PUT /api/usuarios/:id` - Atualizar (protegido)
- `DELETE /api/usuarios/:id` - Excluir (protegido)

## 🎨 Identidade Visual

- **Azul Primário**: #0066cc
- **Azul Secundário**: #3399ff
- **Branco**: #ffffff
- **Cinza Claro**: #f5f5f5
- **Cinza Escuro**: #333333

## 📸 Imagens

Todas as imagens devem ser colocadas na pasta `frontend/public/images/` com a seguinte estrutura:

```
frontend/public/images/
├── logo.png
├── banner-clinica.jpg
├── clinica-1.jpg
├── clinica-2.jpg
├── clinica-3.jpg
├── equipe.jpg
├── dentistas/
│   ├── dentista-1.jpg
│   ├── dentista-2.jpg
│   └── dentista-3.jpg
├── tratamentos/
│   └── (imagens dos tratamentos)
├── avaliacoes/
│   └── (imagens de perfil)
└── icons/
    ├── facebook.png
    ├── instagram.png
    └── whatsapp.png
```

**Nota**: Os caminhos das imagens já estão inseridos no código. Você só precisa adicionar as imagens reais nas pastas correspondentes.

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Tokens JWT com expiração de 24h
- Middleware de autenticação em rotas protegidas
- Validação de dados em todas as requisições
- CORS configurado

## 📦 Scripts Disponíveis

### Backend
- `npm run dev` - Executa em modo desenvolvimento
- `npm start` - Executa em modo produção

### Frontend
- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

## 🐛 Troubleshooting

### Erro ao conectar ao banco de dados
- Certifique-se de que o diretório `backend/` tem permissões de escrita

### Erro CORS
- Verifique se o backend está rodando na porta 3001
- Verifique a configuração do proxy no `vite.config.js`

### Token expirado
- Faça logout e login novamente
- O token expira após 24 horas

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

