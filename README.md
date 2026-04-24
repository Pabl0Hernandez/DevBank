# DevBank — Sistema de Gestão Financeira Pessoal

> React + Vite + Bootstrap · Dark Mode · Design inspirado no Figma DEV-BANK

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

Acesse: **http://localhost:5173**

---

## 🔐 Credenciais de Demo

| Usuário | E-mail | Senha |
|---------|--------|-------|
| Tanya Myroniuk | `tanya@devbank.com` | `123456` |
| Admin Demo | `admin@devbank.com` | `admin` |

---

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                     # Raiz — roteamento entre páginas
├── main.jsx                    # Entry point React
├── styles/
│   └── globals.css             # Design system completo (tokens, componentes)
├── context/
│   └── AuthContext.jsx         # Autenticação global
├── services/
│   └── fakeApi.js              # API fake (substituir pela API C# real)
├── components/
│   ├── Sidebar.jsx             # Navegação lateral
│   ├── TopBar.jsx              # Barra superior
│   └── CreditCard.jsx          # Componente de cartão (com flip)
└── pages/
    ├── Login.jsx               # Tela de login / cadastro
    ├── Dashboard.jsx           # Página inicial com gráficos
    ├── Cards.jsx               # Gerenciamento de cartões
    ├── Transactions.jsx        # Histórico de transações com filtros
    ├── Statistics.jsx          # Estatísticas com gráficos (Recharts)
    ├── SendMoney.jsx           # Transferências entre contatos
    ├── Pix.jsx                 # Pix — cobrar e pagar
    ├── Banks.jsx               # Conexão com bancos nacionais
    └── ProfileSettings.jsx     # Perfil + Configurações
```

---

## 🎨 Design System

| Token | Valor |
|-------|-------|
| `--bg-primary` | `#0A0E1A` |
| `--bg-card` | `#141B2D` |
| `--accent-primary` | `#00E5A0` (verde neon) |
| `--accent-blue` | `#3B7AF6` |
| Fonte display | **Syne** (700/800) |
| Fonte corpo | **Inter** |

---

## 🔌 Integração com API C# (futura)

Todos os métodos de acesso a dados estão centralizados em:

```
src/services/fakeApi.js
```

Cada módulo exporta funções assíncronas que retornam `Promise`. Para integrar a API C# real, basta substituir os `fetch` internos pelos endpoints reais:

```js
// Exemplo — trocar login fake por API real:
export const authApi = {
  async login(email, password) {
    const res = await fetch('https://sua-api.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Credenciais inválidas');
    return res.json(); // { user, token }
  },
};
```

### Endpoints esperados (C#)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Login com e-mail e senha |
| GET | `/cards/{userId}` | Listar cartões |
| POST | `/cards` | Criar cartão |
| DELETE | `/cards/{id}` | Remover cartão |
| GET | `/transactions/{userId}` | Listar transações |
| GET | `/transactions/summary/{userId}` | Resumo financeiro |
| GET | `/banks` | Listar bancos disponíveis |
| POST | `/banks/{id}/connect` | Conectar banco |
| GET | `/stats/monthly` | Dados mensais para gráficos |
| GET | `/stats/categories` | Gastos por categoria |

---

## 📦 Dependências

- **React 18** + **Vite 5**
- **Bootstrap 5.3** + **Bootstrap Icons 1.11**
- **Recharts** — gráficos interativos
- **Google Fonts** — Syne + Inter

---

## 🖼️ Páginas implementadas

- [x] Login / Autenticação
- [x] Dashboard com gráfico de fluxo de caixa
- [x] Gerenciamento de cartões (adicionar, remover, flip para CVV)
- [x] Histórico de transações com filtros
- [x] Estatísticas (área, barras, pizza)
- [x] Enviar dinheiro (fluxo em 3 etapas)
- [x] Pix — cobrar e pagar
- [x] Conexão com bancos nacionais
- [x] Perfil do usuário
- [x] Configurações (segurança, senha, privacidade)
