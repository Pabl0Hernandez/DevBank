# 📊 Estrutura de Banco de Dados - DevBank

## Diagrama de Relacionamentos

```
┌─────────────────────────────────────────────────────────────────┐
│                      auth.users (Supabase)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ id (UUID) | email | user_metadata.name | created_at     │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                ┌──────┴──────┬──────────────┐
                │             │              │
        ┌───────▼────────┐ ┌──▼──────────┐ ┌─▼─────────────┐
        │     CARDS      │ │ TRANSACTIONS│ │  (shared)     │
        ├────────────────┤ ├─────────────┤ │  BANKS        │
        │ id (PK)        │ │ id (PK)     │ ├───────────────┤
        │ user_id (FK)   │ │ user_id(FK) │ │ id (PK)       │
        │ holder         │ │ name        │ │ name          │
        │ number         │ │ category    │ │ sub           │
        │ expiry         │ │ amount      │ │ color         │
        │ cvv            │ │ date        │ │ logo          │
        │ brand          │ │ icon        │ │ connected     │
        │ balance        │ │ color       │ │ created_at    │
        │ limit          │ │ type        │ │ updated_at    │
        │ color          │ │ card_id(FK) │ └───────────────┘
        │ bank           │ │ created_at  │
        │ type           │ │ updated_at  │
        │ created_at     │ └─────────────┘
        │ updated_at     │
        └────────────────┘
```

---

## 📋 Descrição das Tabelas

### 🔐 `auth.users` (Supabase nativo)

Sistema de autenticação do Supabase. Você não cria isso.

| Campo                | Tipo      | Descrição                      |
| -------------------- | --------- | ------------------------------ |
| `id`                 | UUID      | Identificador único do usuário |
| `email`              | text      | E-mail do usuário              |
| `user_metadata.name` | JSON      | Nome armazenado em metadados   |
| `created_at`         | timestamp | Data de criação                |

---

### 💳 `cards` (Cartões do usuário)

Armazena os cartões de crédito/débito de cada usuário.

| Campo        | Tipo      | Descrição                  | Exemplo                      |
| ------------ | --------- | -------------------------- | ---------------------------- |
| `id`         | bigint    | ID único do cartão (PK)    | 1                            |
| `user_id`    | UUID      | Referência ao usuário (FK) | `123e4567-...`               |
| `holder`     | text      | Nome no cartão             | "TANYA MYRONIUK"             |
| `number`     | text      | Número do cartão           | "4562 1122 4595 7852"        |
| `expiry`     | text      | Validade                   | "12/2028"                    |
| `cvv`        | text      | Código de segurança        | "698"                        |
| `brand`      | text      | Bandeira                   | "Mastercard", "Visa", "Amex" |
| `balance`    | numeric   | Saldo atual                | 8545.00                      |
| `limit`      | numeric   | Limite de crédito          | 15000.00                     |
| `color`      | text      | Cor do cartão (gradient)   | `linear-gradient(...)`       |
| `bank`       | text      | Banco emissor              | "Nubank", "Itaú"             |
| `type`       | text      | Tipo de cartão             | "Crédito", "Débito"          |
| `created_at` | timestamp | Data de criação            | 2025-03-01 10:30:00          |
| `updated_at` | timestamp | Última atualização         | 2025-03-05 14:20:00          |

**Restrições:**

- `user_id` deve referir a um usuário válido em `auth.users`
- Ao deletar usuário, todos os cartões são removidos (CASCADE)

---

### 📊 `transactions` (Transações e movimentações)

Registro de todas as transações (entradas/saídas de dinheiro).

| Campo        | Tipo      | Descrição                           | Exemplo                               |
| ------------ | --------- | ----------------------------------- | ------------------------------------- |
| `id`         | bigint    | ID único (PK)                       | 42                                    |
| `user_id`    | UUID      | Referência ao usuário (FK)          | `123e4567-...`                        |
| `name`       | text      | Nome/descrição                      | "Spotify", "Salário"                  |
| `category`   | text      | Categoria                           | "Entretenimento", "Renda"             |
| `amount`     | numeric   | Valor (+ entrada, - saída)          | -12.99 ou 6500.00                     |
| `date`       | date      | Data da transação                   | 2025-03-18                            |
| `icon`       | text      | Ícone Bootstrap                     | "music-note-beamed"                   |
| `color`      | text      | Cor do ícone                        | "#1DB954"                             |
| `type`       | text      | Tipo                                | "credit" (entrada) ou "debit" (saída) |
| `card_id`    | bigint    | Referência do cartão (FK, opcional) | 1                                     |
| `created_at` | timestamp | Quando foi registrada               | 2025-03-18 10:00:00                   |
| `updated_at` | timestamp | Última edição                       | 2025-03-18 10:00:00                   |

**Restrições:**

- `user_id` deve referir a um usuário válido
- Ao deletar usuário, todas as transações são removidas (CASCADE)
- `card_id` é opcional (pode ser NULL para transferências)

---

### 🏦 `banks` (Bancos disponíveis - dados compartilhados)

Lista de bancos que todos os usuários podem conectar. Dados públicos.

| Campo        | Tipo      | Descrição                      | Exemplo                    |
| ------------ | --------- | ------------------------------ | -------------------------- |
| `id`         | bigint    | ID único (PK)                  | 1                          |
| `name`       | text      | Nome do banco                  | "Nubank"                   |
| `sub`        | text      | Subtítulo/descrição            | "Conta corrente e crédito" |
| `color`      | text      | Cor do logo                    | "#820AD1"                  |
| `logo`       | text      | Iniciais/logo                  | "N"                        |
| `connected`  | boolean   | Se está conectado pelo usuário | false                      |
| `created_at` | timestamp | Quando foi adicionado          | 2025-01-01 00:00:00        |
| `updated_at` | timestamp | Última atualização             | 2025-01-01 00:00:00        |

**Observação:**

- Todos os usuários veem os mesmos bancos
- A política de RLS permite que qualquer usuário autenticado veja
- Apenas admins podem criar/editar (política bloqueada por enquanto)

---

## 🔐 Políticas de Segurança (RLS)

### CARDS

| Operação | Quem pode    | Condição               |
| -------- | ------------ | ---------------------- |
| SELECT   | Proprietário | `auth.uid() = user_id` |
| INSERT   | Proprietário | `auth.uid() = user_id` |
| UPDATE   | Proprietário | `auth.uid() = user_id` |
| DELETE   | Proprietário | `auth.uid() = user_id` |

### TRANSACTIONS

| Operação | Quem pode    | Condição               |
| -------- | ------------ | ---------------------- |
| SELECT   | Proprietário | `auth.uid() = user_id` |
| INSERT   | Proprietário | `auth.uid() = user_id` |
| UPDATE   | Proprietário | `auth.uid() = user_id` |
| DELETE   | Proprietário | `auth.uid() = user_id` |

### BANKS

| Operação | Quem pode            | Condição                       |
| -------- | -------------------- | ------------------------------ |
| SELECT   | Qualquer autenticado | Sem restrição (dados públicos) |
| INSERT   | Ninguém              | Bloqueado (admin only)         |
| UPDATE   | Ninguém              | Bloqueado (admin only)         |
| DELETE   | Ninguém              | Bloqueado (admin only)         |

---

## 📈 Índices para Performance

```sql
cards_user_id_idx        -- Buscar cartões por usuário
transactions_user_id_idx -- Buscar transações por usuário
transactions_date_idx    -- Buscar transações por data
transactions_category_idx-- Filtrar por categoria
transactions_type_idx    -- Filtrar por tipo (credit/debit)
```

---

## 🔄 Atualização Automática de Timestamps

Ao inserir ou atualizar um registro, o campo `updated_at` é preenchido automaticamente via trigger.

```sql
TRIGGER cards_update_timestamp
TRIGGER transactions_update_timestamp
TRIGGER banks_update_timestamp
```

---

## 📝 Categorias de Transações Suportadas

- **Entretenimento**: Spotify, Netflix, Cinema, etc.
- **Compras**: Amazon, lojas, e-commerce
- **Transporte**: Uber, ônibus, taxi
- **Alimentação**: iFood, restaurantes, supermercado
- **Utilidades**: Água, luz, internet
- **Saúde**: Academia, farmácia, médico
- **Renda**: Salário, freelance, bônus
- **Transação**: Transferências, PIX, TED

---

## 💡 Extensões Futuras

### Tabela `profiles` (usuário adicional)

```sql
CREATE TABLE profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  avatar_url text,
  phone text,
  birth_date date,
  address text,
  cpf text,
  updated_at timestamp default now()
);
```

### Tabela `contacts` (para envio de dinheiro)

```sql
CREATE TABLE contacts (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users(id),
  name text,
  email text,
  phone text,
  pix_key text,
  initial text,
  color text,
  created_at timestamp default now()
);
```

### Tabela `user_bank_connections`

```sql
CREATE TABLE user_bank_connections (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users(id),
  bank_id bigint references banks(id),
  connected_at timestamp default now(),
  disconnected_at timestamp
);
```

---

## ✅ Checklist de Implementação

- [x] Tabelas criadas (`cards`, `transactions`, `banks`)
- [x] RLS habilitado
- [x] Políticas de autenticação aplicadas
- [x] Índices criados
- [x] Triggers para `updated_at`
- [x] Dados iniciais de bancos inseridos
- [ ] Tabela `profiles` (future)
- [ ] Tabela `contacts` (future)
- [ ] Webhooks para notificações (future)

---

**Estrutura finalizada em 29 de maio de 2026**
