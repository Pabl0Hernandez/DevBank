# 🚀 Guia de Configuração Supabase para DevBank

## Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Projeto Supabase criado
- Arquivo `.env` configurado no frontend

---

## 1️⃣ Criar Variáveis de Ambiente

Copie `.env.example` para `.env`:

```bash
cd "Front End"
cp .env.example .env
```

Edite `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

### Onde encontrar estas chaves:

1. Acesse sua dashboard do Supabase
2. Selecione seu projeto
3. Vá para **Settings** → **API**
4. Copie:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon` public key → `VITE_SUPABASE_ANON_KEY`

---

## 2️⃣ Executar o SQL

### Opção A: Via SQL Editor (recomendado)

1. No Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Copie todo o conteúdo de `database.sql`
4. Cole no editor
5. Clique em **Run** ▶️
6. Aguarde a confirmação ✅

### Opção B: Via arquivo

1. Vá para **SQL Editor**
2. Clique em **New Query**
3. Clique em **Upload file**
4. Selecione `database.sql`
5. Clique em **Run**

---

## 3️⃣ Verificar Criação

No **SQL Editor**, execute para verificar as tabelas:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Você deve ver:

- `cards`
- `transactions`
- `banks`

---

## 4️⃣ Testar Autenticação

No terminal, dentro da pasta `Front End`:

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` e:

1. Clique em **Registrar** ou **Sign up**
2. Use um e-mail de teste: `teste@example.com`
3. Escolha uma senha
4. Clique em **Registrar**

Se não houver erros, parabéns! 🎉

---

## 5️⃣ Inserir Dados de Teste (Opcional)

Para testar o app com cartões e transações reais, copie seu `user_id` do Supabase e execute:

```sql
-- Substitua 'seu-user-id-aqui' pelo UUID do seu usuário autenticado

INSERT INTO cards (user_id, holder, number, expiry, cvv, brand, balance, limit, color, bank, type) VALUES
  ('seu-user-id-aqui', 'SEU NOME', '4562 1122 4595 7852', '12/2028', '698', 'Mastercard', 8545.0, 15000, 'linear-gradient(135deg, #1a3a6b 0%, #0A1F44 100%)', 'Nubank', 'Crédito');

INSERT INTO transactions (user_id, name, category, amount, date, icon, color, type, card_id) VALUES
  ('seu-user-id-aqui', 'Spotify', 'Entretenimento', -12.99, '2025-03-18', 'music-note-beamed', '#1DB954', 'debit', 1),
  ('seu-user-id-aqui', 'Salário', 'Renda', 6500.0, '2025-03-05', 'bank', '#5DB7E6', 'credit', 1),
  ('seu-user-id-aqui', 'Netflix', 'Entretenimento', -39.9, '2025-03-15', 'play-circle', '#E50914', 'debit', 1);
```

### Como encontrar seu `user_id`:

1. No Supabase, vá para **Authentication** → **Users**
2. Clique no usuário que você criou
3. Copie o `ID` (é um UUID como `123e4567-e89b-12d3-a456-426614174000`)

---

## 6️⃣ Solução de Problemas

### ❌ "Missing VITE_SUPABASE_URL"

- Certifique-se de que `.env` existe no diretório `Front End/`
- Reinicie o servidor: `npm run dev`

### ❌ "Erro ao conectar ao banco"

- Verifique as credenciais no `.env`
- Confirme que as tabelas foram criadas: vá a **SQL Editor** e execute:
  ```sql
  SELECT * FROM information_schema.tables WHERE table_schema = 'public';
  ```

### ❌ "RLS policy violation"

- Verifique se as políticas foram criadas
- Confirme que você está autenticado (não é anônimo)
- Execute no SQL Editor:
  ```sql
  SELECT * FROM pg_policies;
  ```

### ❌ "Usuário não pode inserir cartões/transações"

- Verifique se o `user_id` nas políticas está correto
- A política verifica `auth.uid()` automaticamente

---

## 📱 Testar o App

Depois de configurar:

1. `npm run dev`
2. Acesse `http://localhost:5173`
3. Registre-se com um e-mail
4. Faça login
5. Vá para **Meus Cartões** e adicione um novo cartão
6. Vá para **Transações** para ver a lista
7. Verifique **Estatísticas** para gráficos

---

## 🔐 Segurança em Produção

**Importante:** Antes de colocar em produção:

1. ✅ Adicione validação de e-mail no Supabase (confirme antes de usar)
2. ✅ Configure CORS em **Settings** → **API**:
   - Adicione seu domínio de produção
3. ✅ Use chaves diferentes para desenvolvimento e produção
4. ✅ Implemente rate limiting em funções críticas
5. ✅ Use `VITE_SUPABASE_ANON_KEY` (nunca a service role key) no frontend

---

## 📚 Próximos Passos

- [ ] Criar tabela `profiles` para dados extras do usuário
- [ ] Criar tabela `contacts` para envio de dinheiro
- [ ] Adicionar webhooks para notificações
- [ ] Configurar storage para avatares/documentos
- [ ] Implementar 2FA (autenticador)

---

## 📖 Links Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Auth Supabase](https://supabase.com/docs/guides/auth)
- [RLS Supabase](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

---

**Desenvolvido com ❤️ para DevBank**
