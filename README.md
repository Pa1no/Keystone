# Keystone

Plataforma de **gerenciamento e geração de chaves** desenvolvida como projeto de estudo e portfólio.

O Keystone permite que o usuário crie uma conta, faça login e acesse um **dashboard** onde pode gerar chaves (API keys, tokens, senhas) com **validade configurável**, **tamanho customizável** e **conjunto de caracteres específico**. O dashboard também oferece uma **ferramenta de validação** para testar regras de caracteres, força e conformidade das chaves — tudo de forma sob demanda.

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
| jsonwebtoken | 9.0.3 | Transmissão de informações |

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

### Dashboard
- Painel principal com visão geral das chaves do usuário;
- **Gerador de chaves/senhas** com configuração de:
  - Tamanho (ex: 8, 16, 32, 64 caracteres);
  - Validade (data de expiração ou sem expiração);
  - Conjunto de caracteres (letras maiúsculas/minúsculas, números, símbolos, ou conjunto customizado);
- Histórico de chaves geradas com data de criação e status (ativa/expirada);
- Exclusão de chaves individuais;
- Cópia rápida da chave para a área de transferência;
- **Ferramenta de validação** para testar regras de caracteres (força da senha, entropia, conformidade);
- Botão de **logout** com encerramento da sessão;
- Indicador de status da conta (e-mail do usuário logado);

## Estrutura do Projeto

```text
login-auth/
├── frontend/
│   ├── src/
│   │   ├── app/                    # rotas (App Router)
│   │   │   ├── page.tsx            # redirect → /login
│   │   │   ├── login/page.tsx      # tela de login
│   │   │   ├── register/page.tsx   # tela de cadastro
│   │   │   ├── forgot-password/    # recuperação de senha
│   │   │   └── dashboard/          # painel autenticado
│   │   │       ├── page.tsx        # visão geral + gerador
│   │   │       └── validate/       # ferramenta de validação
│   │   ├── components/
│   │   │   ├── auth/               # painel, formulário, cifra e layout
│   │   │   ├── dashboard/          # gerador de chaves, cards, toolbar
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
Frontend envia para POST /register
        ↓
Backend valida e hasheia a senha (bcryptjs)
        ↓
Usuário é registrado no SQLite
```

### Login

```text
Usuário informa e-mail e senha
        ↓
Frontend envia para POST /login
        ↓
Backend verifica as credenciais no SQLite
        ↓
Token de sessão retornado
        ↓
Redirecionamento para o dashboard
```

### Dashboard

```text
Usuário faz login com sucesso
        ↓
Token de sessão armazenado
        ↓
Redirecionamento para /dashboard
        ↓
Dashboard carrega chaves do usuário (GET /dashboard/keys)
        ↓
Painel exibe:
  • Chaves ativas e expiradas
  • Botão "Gerar nova chave"
  • Botão "Validar" (ferramenta de teste)
  • Botão "Logout"
```

### Geração de Chave

```text
Usuário configura parâmetros:
  • Tamanho (ex: 32 caracteres)
  • Validade (ex: 7 dias)
  • Caracteres (ABC, 123, !@#, ou custom)
        ↓
Frontend envia para POST /dashboard/generate
        ↓
Backend gera a chave com crypto random
        ↓
Chave armazenada no SQLite com data de expiração
        ↓
Chave exibida no dashboard
```

### Validação de Chave

```text
Usuário acessa /dashboard/validate
        ↓
Insere uma chave ou configura regras de teste
        ↓
Ferramenta valida em tempo real:
  • Comprimento mínimo
  • Conformidade dos caracteres
  • Força/entropia da chave
        ↓
Exibe resultado: Válida / Inválida + detalhes
```

## API (Planejada)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/register` | Cadastro de usuário |
| `POST` | `/login` | Login do usuário |
| `POST` | `/forgot-password` | Solicitação de redefinição |
| `POST` | `/reset-password` | Redefinição de senha |
| `POST` | `/logout` | Encerramento da sessão |
| `POST` | `/dashboard/keys/generate` | Gerar nova chave |
| `GET` | `/dashboard/keys` | Listar chaves do usuário |
| `DELETE` | `/dashboard/keys/:id` | Excluir uma chave |
| `POST` | `/dashboard/keys/validate` | Validar regras de uma chave |

## Status

**Em desenvolvimento**

- [x] Interface de login
- [x] Interface de cadastro
- [x] Alternância entre login e cadastro
- [x] Recuperação de senha
- [x] Modo claro/escuro
- [x] Validação dos dados informados
- [x] Rotas /login, /register, /forgot-password
- [ ] Backend Express (rotas, middleware, banco)
- [ ] Banco de dados SQLite (schema e migrations)
- [ ] Cadastro de usuários (API)
- [ ] Login de usuários (API)
- [ ] Logout (API + frontend)
- [ ] Integração frontend/backend
- [ ] Dashboard — layout e navegação
- [ ] Dashboard — gerador de chaves com parâmetros
- [ ] Dashboard — histórico de chaves
- [ ] Dashboard — exclusão de chaves
- [ ] Dashboard — cópia para área de transferência
- [ ] Dashboard — indicador de status da conta
- [ ] Ferramenta de validação de chaves
- [ ] Expiração automática de chaves
- [ ] Validações e tratamento de erros (lado servidor)

## Autor

**Nome:** `Eduardo Rocha Paino`

**GitHub:** `https://github.com/Pa1no`

**LinkedIn:** `linkedin.com/in/eduardopaino`
