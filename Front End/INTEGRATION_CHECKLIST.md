# 🎯 Checklist de Integração Supabase - DevBank

## 📋 Pré-configuração

- [ ] Conta criada em https://supabase.com
- [ ] Novo projeto Supabase criado
- [ ] Projeto disponível e acessível

---

## 🔧 Fase 1: Variáveis de Ambiente

### Na pasta `Front End/`:

```bash
cp .env.example .env
```

- [ ] Arquivo `.env` criado
- [ ] `VITE_SUPABASE_URL` preenchido
- [ ] `VITE_SUPABASE_ANON_KEY` preenchido
- [ ] Sem espaços em branco extras
- [ ] Sem quebras de linha

### Encontrando as credenciais:

1. Acesse Supabase Dashboard
2. Selecione seu projeto
3. **Settings** → **API**
4. Copie exatamente:
   - `Project URL` para `VITE_SUPABASE_URL`
   - `anon` (public) key para `VITE_SUPABASE_ANON_KEY`

Exemplo:

```env
VITE_SUPABASE_URL=https://abc123xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🏗️ Fase 2: Criar Banco de Dados

### Via SQL Editor (Recomendado):

1. No Supabase → **SQL Editor**
2. Clique **New Query**
3. Abra o arquivo `database.sql`
4. Copie TODO o conteúdo
5. Cole no editor do Supabase
6. Clique **Run** ▶️
7. Aguarde confirmação ✅

**OU**

1. Clique **New Query**
2. Clique **Upload file**
3. Selecione `database.sql`
4. Clique **Run**

- [ ] Tabela `cards` criada
- [ ] Tabela `transactions` criada
- [ ] Tabela `banks` criada
- [ ] RLS habilitado em todas
- [ ] Políticas de segurança aplicadas
- [ ] Índices criados
- [ ] Triggers de `updated_at` criados
- [ ] 8 bancos inseridos

### Verificação:

No SQL Editor, execute:

```sql
SELECT COUNT(*) FROM banks;
```

Resultado esperado: **8**

---

## 📦 Fase 3: Instalar Dependências

Na pasta `Front End/`:

```bash
npm install
```

- [ ] Supabase JS instalado (`@supabase/supabase-js`)
- [ ] Sem erros de dependência
- [ ] `node_modules` criado

---

## 🚀 Fase 4: Testar Frontend

### Iniciar servidor:

```bash
npm run dev
```

Você verá algo como:

```
  VITE v5.4.21  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

- [ ] Servidor iniciado em `http://localhost:5173`
- [ ] Sem erros no console

### Abrir no navegador:

1. Acesse `http://localhost:5173`
2. Você verá a página de Login

---

## 👤 Fase 5: Criar Usuário de Teste

Na página de Login:

1. Clique em **Registrar** (Sign Up)
2. Preencha:
   - **Nome**: seu nome ou qualquer coisa
   - **Email**: `teste@example.com` (ou qualquer email)
   - **Senha**: algo forte (min 6 caracteres)
3. Clique **Registrar**

- [ ] Usuário criado
- [ ] Login bem-sucedido
- [ ] Redirecionado para Dashboard
- [ ] Sem erros no console

### Verificar no Supabase:

1. **Authentication** → **Users**
2. Você deve ver seu novo usuário

- [ ] Usuário aparece na lista
- [ ] Email confirmado (ou pendente)

---

## 💳 Fase 6: Adicionar Dados de Teste (Opcional)

### Obter seu `user_id`:

1. Em Supabase: **Authentication** → **Users**
2. Clique no seu usuário
3. Copie o campo **ID** (é um UUID)

Exemplo: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### Executar SQL de teste:

1. Em Supabase: **SQL Editor** → **New Query**
2. Abra `database-seed.sql`
3. Substitua **TODAS** as ocorrências de `'seu-user-id-aqui'` pelo seu UUID real
4. Cole o SQL no editor
5. Clique **Run**

- [ ] Cartões inseridos (3)
- [ ] Transações inseridas (20+)
- [ ] Sem erros

### Verificar:

```sql
SELECT COUNT(*) FROM cards WHERE user_id = 'seu-uuid-real';
SELECT COUNT(*) FROM transactions WHERE user_id = 'seu-uuid-real';
```

Esperado:

- Cards: **3**
- Transactions: **20+**

---

## ✅ Fase 7: Testar Funcionalidades

Volte para `http://localhost:5173`:

- [ ] **Dashboard**: Mostra dados (cartões, transações, gráficos)
- [ ] **Meus Cartões**: Lista 3 cartões de teste
- [ ] **Transações**: Lista transações com filtros funcionando
- [ ] **Estatísticas**: Gráficos aparecem
- [ ] **Bancos Conectados**: Lista 8 bancos
- [ ] **Enviar Dinheiro**: Permite preencher formulário
- [ ] **Pix**: Funciona sem erros
- [ ] **Perfil**: Mostra informações do usuário
- [ ] **Configurações**: Acessa sem erros

---

## 🔍 Solução de Problemas

### ❌ "Missing VITE_SUPABASE_URL"

```
Error: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY
```

**Solução:**

- [ ] Verifique se `.env` existe em `Front End/`
- [ ] Verifique os valores (sem espaços)
- [ ] Reinicie o servidor: `npm run dev`

### ❌ "Connection refused"

```
Error: connect ECONNREFUSED
```

**Solução:**

- [ ] Verifique credenciais em `.env`
- [ ] Confirme que o projeto Supabase está ativo
- [ ] Tente fazer login na dashboard do Supabase

### ❌ "RLS policy violation"

```
Error: new row violates row-level security policy
```

**Solução:**

- [ ] Verifique se está autenticado (não anônimo)
- [ ] Confirme que as políticas RLS foram criadas
- [ ] Execute em SQL Editor:
  ```sql
  SELECT * FROM pg_policies WHERE tablename = 'cards';
  ```

### ❌ Usuário não consegue inserir dados

**Solução:**

- [ ] Confirme que RLS está habilitado
- [ ] Confirme que está logado (não anônimo)
- [ ] Verifique `user_id` nos dados

### ❌ Usuário não consegue ver dados de outro usuário

✅ **Isso é normal!** A RLS está funcionando corretamente.

---

## 📱 Teste Completo

Faça isto em ordem:

1. [ ] Registre-se
2. [ ] Veja Dashboard vazio (esperado)
3. [ ] Vá para **Meus Cartões** → **Adicionar Cartão**
4. [ ] Preencha dados fictícios e salve
5. [ ] Verifique se o cartão aparece na lista
6. [ ] Volte ao Dashboard
7. [ ] Verifique se o cartão aparece
8. [ ] Vá para **Transações** → **Sem transações** (esperado)
9. [ ] Insira manualmente uma transação (se funcionalidade existir)
10. [ ] Verifique **Estatísticas**
11. [ ] Teste logout
12. [ ] Teste login novamente
13. [ ] Confirme que os dados persistem

---

## 🎯 Status Final

### Tudo funcionando? ✅

Parabéns! Seu DevBank está integrado ao Supabase! 🎉

### Próximos passos:

- [ ] Configurar autenticação com múltiplos provedores (Google, GitHub)
- [ ] Adicionar verificação de email
- [ ] Implementar 2FA (autenticador)
- [ ] Criar tabela `profiles` para dados extras
- [ ] Criar tabela `contacts` para envio de dinheiro
- [ ] Adicionar notificações por email
- [ ] Configurar webhooks
- [ ] Fazer deploy em produção

---

## 🔐 Antes de Produção

⚠️ **IMPORTANTE**

- [ ] Use chaves diferentes para dev e prod
- [ ] Nunca comita `.env` no Git
- [ ] Configure CORS em Supabase Settings
- [ ] Implemente rate limiting
- [ ] Use https em produção
- [ ] Configure backups automáticos
- [ ] Teste segurança de RLS antes de publicar

---

## 📚 Documentação Criada

Você tem 4 arquivos para referência:

1. **`SUPABASE_SETUP.md`** - Guia passo a passo detalhado
2. **`DATABASE_SCHEMA.md`** - Estrutura e relacionamentos do banco
3. **`database.sql`** - SQL para criar tabelas e políticas
4. **`database-seed.sql`** - Dados de teste

---

**Desenvolvido com ❤️ para DevBank**

Data: 29 de maio de 2026
