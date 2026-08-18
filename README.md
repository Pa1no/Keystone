# Keystone

Plataforma de **gerenciamento e geração de chaves** desenvolvida como projeto de estudo e portfólio.

O Keystone permite que o usuário crie uma conta, faça login e acesse um **dashboard** onde pode gerar chaves (API keys, tokens, senhas) com **validade configurável**, **tamanho customizável** e **conjunto de caracteres específico** — tudo de forma sob demanda.

## Tecnologias

### Frontend

| Biblioteca | Versão | Finalidade |
|---|---|---|
| Next.js | 16.3.1 | Framework React (App Router) |
| React | 19.2.8 | Biblioteca de interface |
| TypeScript | ^5 | Tipagem estática |
| Tailwind CSS | v4 | Framework de estilos |
| lucide-react | ^1.31.0 | Ícones |
| clsx | ^2.1.1 | Classes condicionais |
| tailwind-merge | ^3.6.0 | Deduplicação de classes Tailwind |

### Backend

| Biblioteca | Versão | Finalidade |
|---|---|---|
| Express | 5.2.1 | Framework HTTP |
| better-sqlite3 | 13.0.3 | Driver SQLite |
| bcryptjs | 3.0.3 | Hash de senhas |
| cors | 2.8.6 | Compartilhamento de recursos |

### Banco de Dados

- SQLite (via better-sqlite3)

## Funcionalidades

### Autenticação
- Cadastro de novos usuários;
- Login com e-mail e senha;
- Recuperação de senha;
- Validação de dados no cliente;
- Proteção das senhas com bcrypt;
- Modo claro/escuro;

### Dashboard — Gerador de Chaves
- Geração de chaves sob demanda;
- Configuração de **validade** (data de expiração);
- Configuração de **tamanho** da chave;
- Seleção de **conjunto de caracteres** (letras, números, símbolos, customizado);
- Histórico de chaves geradas pelo usuário;
- Exclusão de chaves;
- Cópia rápida da chave para a área de transferência;

## Estrutura do Projeto

```text
login-auth/
├── frontend/
│   ├── src/
│   │   ├── app/                    # rotas (App Router)
│   │   │   ├── page.tsx            # página de autenticação
│   │   │   └── dashboard/          # dashboard (a ser implementado)
│   │   ├── components/
│   │   │   ├── auth/               # painel, formulário e cifra
│   │   │   ├── dashboard/          # gerador de chaves e cards
│   │   │   └── ui/                 # button, input, theme toggle
│   │   ├── hooks/                  # useTheme
│   │   └── lib/                    # auth, utils, key generation
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── server.ts               # Entry point do Express
│   │   ├── routes/                 # Rotas da API
│   │   │   ├── auth.ts             # login, registro, recuperação
│   │   │   └── keys.ts            # CRUD de chaves
│   │   ├── middleware/              # Validação, auth, erros
│   │   ├── database/
│   │   │   └── schema.ts           # Schema SQLite
│   │   └── utils/                  # Geração de chaves, helpers
│   └── package.json
│
├── .gitignore
└── README.md
```

## Como Executar

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd login-auth
```

### 2. Instale as dependências

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

### 3. Execute o backend

```bash
npm run dev
```

### 4. Execute o frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

Acesse a aplicação pelo navegador:

```text
http://localhost:3000
```

## Fluxo da Aplicação

### Cadastro

```text
Usuário preenche os dados
        ↓
Frontend envia para POST /api/auth/register
        ↓
Backend valida e hasheia a senha (bcryptjs)
        ↓
Usuário é registrado no SQLite
```

### Login

```text
Usuário informa e-mail e senha
        ↓
Frontend envia para POST /api/auth/login
        ↓
Backend verifica as credenciais no SQLite
        ↓
Token de sessão retornado
        ↓
Redirecionamento para o dashboard
```

### Geração de Chave

```text
Usuário configura parâmetros:
  • Tamanho (ex: 32 caracteres)
  • Validade (ex: 7 dias)
  • Caracteres (ABC, 123, !@#, ou custom)
        ↓
Frontend envia para POST /api/keys/generate
        ↓
Backend gera a chave com crypto random
        ↓
Chave armazenada no SQLite com data de expiração
        ↓
Chave exibida no dashboard
```

## API (Planejada)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/register` | Cadastro de usuário |
| `POST` | `/api/auth/login` | Login do usuário |
| `POST` | `/api/auth/forgot-password` | Solicitação de redefinição |
| `POST` | `/api/auth/reset-password` | Redefinição de senha |
| `POST` | `/api/keys/generate` | Gerar nova chave |
| `GET` | `/api/keys` | Listar chaves do usuário |
| `DELETE` | `/api/keys/:id` | Excluir uma chave |

## Status

**Em desenvolvimento**

- [x] Interface de login
- [x] Interface de cadastro
- [x] Alternância entre login e cadastro
- [x] Recuperação de senha
- [x] Modo claro/escuro
- [x] Validação dos dados informados
- [ ] Backend Express (rotas, middleware, banco)
- [ ] Banco de dados SQLite (schema e migrations)
- [ ] Cadastro de usuários (API)
- [ ] Login de usuários (API)
- [ ] Integração frontend/backend
- [ ] Dashboard do usuário
- [ ] Gerador de chaves com parâmetros
- [ ] Histórico de chaves
- [ ] Expiração automática de chaves
- [ ] Validações e tratamento de erros (lado servidor)

## Autor

**Nome:** `Eduardo Rocha Paino`

**GitHub:** `https://github.com/Pa1no`

**LinkedIn:** `linkedin.com/in/eduardopaino`
