# Login & Cadastro

Página de **login e cadastro de usuários** desenvolvida como projeto de estudo e portfólio.

A aplicação permite criar uma conta e realizar login utilizando **e-mail e senha**, armazenando os usuários em um banco de dados SQLite.

## Tecnologias

**Frontend**
- Next.js
- TypeScript

**Backend**
- Node.js
- TypeScript

**Banco de dados**
- SQLite

## Funcionalidades

- Login com e-mail e senha;
- Cadastro de novos usuários;
- Alternância entre os formulários de login e cadastro;
- Validação dos dados informados;
- Armazenamento dos usuários no SQLite;
- Verificação das credenciais no login;
- Proteção das senhas antes do armazenamento.

## Estrutura do Projeto

> Atualize esta estrutura de acordo com a implementação final.

```text
login-project/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── database/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Como Executar

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_REPOSITORIO
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

> Os comandos e portas podem ser atualizados de acordo com a configuração final do projeto.

## Funcionamento

### Cadastro

```text
Usuário preenche os dados
        ↓
Frontend envia os dados
        ↓
Backend valida os dados
        ↓
Usuário é registrado no SQLite
```

### Login

```text
Usuário informa e-mail e senha
        ↓
Frontend envia as credenciais
        ↓
Backend consulta o SQLite
        ↓
Credenciais são verificadas
        ↓
Login autorizado ou recusado
```

## Desenvolvimento

### O que foi feito

> Preencha após o desenvolvimento.

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

### Como foi feito

> Explique brevemente as principais decisões e etapas do desenvolvimento.

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

## Preview

> Adicione uma imagem da aplicação quando a interface estiver pronta.

```md
![Preview do projeto](./docs/preview.png)
```

## Status

**Em desenvolvimento**

- [ ] Interface de login
- [ ] Interface de cadastro
- [ ] Backend
- [ ] Banco de dados SQLite
- [ ] Cadastro de usuários
- [ ] Login de usuários
- [ ] Integração frontend/backend
- [ ] Validações e tratamento de erros

## Autor

**Nome:** `Eduardo Rocha Paino`

**GitHub:** `https://github.com/Pa1no`

**LinkedIn:** `linkedin.com/in/eduardopaino`