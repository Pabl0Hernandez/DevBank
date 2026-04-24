/**
 * fakeApi.js
 * Simula uma API REST que será substituída pela API C# real no futuro.
 * Todos os métodos retornam Promises para manter compatibilidade futura.
 */

const FAKE_DELAY = 600;

const delay = (ms = FAKE_DELAY) => new Promise((r) => setTimeout(r, ms));

// ── USUÁRIOS ──────────────────────────────────────────────────────────────────
const USERS = [
  {
    id: 1,
    name: "Tanya Myroniuk",
    email: "tanya@devbank.com",
    password: "123456",
    role: "Designer Sênior",
    avatar: "TM",
    phone: "+55 11 99999-0001",
    birthDate: "1994-09-28",
    address: "Av. Paulista, 1000 — São Paulo, SP",
  },
  {
    id: 2,
    name: "Admin Demo",
    email: "admin@devbank.com",
    password: "admin",
    role: "Administrador",
    avatar: "AD",
    phone: "+55 11 99999-0002",
    birthDate: "1990-01-15",
    address: "Rua Oscar Freire, 500 — São Paulo, SP",
  },
];

// ── CARTÕES ───────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 1,
    userId: 1,
    holder: "TANYA MYRONIUK",
    number: "4562 1122 4595 7852",
    expiry: "12/2028",
    cvv: "698",
    brand: "Mastercard",
    balance: 8545.0,
    limit: 15000,
    color: "linear-gradient(135deg, #1a3a6b 0%, #0A1F44 100%)",
    bank: "Nubank",
    type: "Crédito",
  },
  {
    id: 2,
    userId: 1,
    holder: "TANYA MYRONIUK",
    number: "5168 4411 1235 3456",
    expiry: "08/2026",
    cvv: "421",
    brand: "Visa",
    balance: 3200.5,
    limit: 8000,
    color: "linear-gradient(135deg, #2d1b69 0%, #0f0a2e 100%)",
    bank: "Itaú",
    type: "Débito",
  },
  {
    id: 3,
    userId: 1,
    holder: "TANYA MYRONIUK",
    number: "3714 496353 98431",
    expiry: "03/2027",
    cvv: "1234",
    brand: "Amex",
    balance: 12000.0,
    limit: 25000,
    color: "linear-gradient(135deg, #0d3b2d 0%, #071f18 100%)",
    bank: "Bradesco",
    type: "Crédito",
  },
];

// ── TRANSAÇÕES ────────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  {
    id: 1,
    userId: 1,
    name: "Spotify",
    category: "Entretenimento",
    amount: -12.99,
    date: "2025-03-18",
    icon: "music-note-beamed",
    color: "#1DB954",
    type: "debit",
    cardId: 1,
  },
  {
    id: 2,
    userId: 1,
    name: "Apple Store",
    category: "Entretenimento",
    amount: -5.99,
    date: "2025-03-17",
    icon: "apple",
    color: "#555",
    type: "debit",
    cardId: 1,
  },
  {
    id: 3,
    userId: 1,
    name: "Transferência Recebida",
    category: "Transação",
    amount: 300.0,
    date: "2025-03-17",
    icon: "arrow-down-circle",
    color: "#89D4FF",
    type: "credit",
    cardId: 1,
  },
  {
    id: 4,
    userId: 1,
    name: "Mercado Extra",
    category: "Compras",
    amount: -88.0,
    date: "2025-03-16",
    icon: "cart3",
    color: "#7FCFFF",
    type: "debit",
    cardId: 2,
  },
  {
    id: 5,
    userId: 1,
    name: "Netflix",
    category: "Entretenimento",
    amount: -39.9,
    date: "2025-03-15",
    icon: "play-circle",
    color: "#E50914",
    type: "debit",
    cardId: 1,
  },
  {
    id: 6,
    userId: 1,
    name: "Uber",
    category: "Transporte",
    amount: -24.5,
    date: "2025-03-15",
    icon: "car-front",
    color: "#000",
    type: "debit",
    cardId: 2,
  },
  {
    id: 7,
    userId: 1,
    name: "Salário",
    category: "Renda",
    amount: 6500.0,
    date: "2025-03-05",
    icon: "bank",
    color: "#5DB7E6",
    type: "credit",
    cardId: 1,
  },
  {
    id: 8,
    userId: 1,
    name: "iFood",
    category: "Alimentação",
    amount: -55.8,
    date: "2025-03-14",
    icon: "bag",
    color: "#EA1D2C",
    type: "debit",
    cardId: 2,
  },
  {
    id: 9,
    userId: 1,
    name: "Amazon",
    category: "Compras",
    amount: -149.9,
    date: "2025-03-13",
    icon: "box-seam",
    color: "#FF9900",
    type: "debit",
    cardId: 1,
  },
  {
    id: 10,
    userId: 1,
    name: "Freela Design",
    category: "Renda",
    amount: 1200.0,
    date: "2025-03-10",
    icon: "laptop",
    color: "#2F8FC4",
    type: "credit",
    cardId: 1,
  },
  {
    id: 11,
    userId: 1,
    name: "Conta de Luz",
    category: "Utilidades",
    amount: -187.4,
    date: "2025-03-09",
    icon: "lightning",
    color: "#D9F3FF",
    type: "debit",
    cardId: 2,
  },
  {
    id: 12,
    userId: 1,
    name: "Academia",
    category: "Saúde",
    amount: -89.9,
    date: "2025-03-08",
    icon: "heart-pulse",
    color: "#A8E0FF",
    type: "debit",
    cardId: 1,
  },
];

// ── BANCOS ────────────────────────────────────────────────────────────────────
const BANKS = [
  {
    id: 1,
    name: "Nubank",
    sub: "Conta corrente e crédito",
    color: "#820AD1",
    logo: "N",
    connected: true,
  },
  {
    id: 2,
    name: "Itaú Unibanco",
    sub: "Conta corrente",
    color: "#EC7000",
    logo: "IU",
    connected: true,
  },
  {
    id: 3,
    name: "Bradesco",
    sub: "Poupança",
    color: "#CC092F",
    logo: "BD",
    connected: false,
  },
  {
    id: 4,
    name: "Caixa Econômica",
    sub: "Conta corrente",
    color: "#0066A1",
    logo: "CE",
    connected: false,
  },
  {
    id: 5,
    name: "Banco do Brasil",
    sub: "Conta corrente",
    color: "#FFCC00",
    logo: "BB",
    connected: false,
  },
  {
    id: 6,
    name: "Santander",
    sub: "Conta corrente",
    color: "#EC0000",
    logo: "ST",
    connected: false,
  },
  {
    id: 7,
    name: "Inter",
    sub: "Conta digital",
    color: "#FF7A00",
    logo: "IN",
    connected: false,
  },
  {
    id: 8,
    name: "C6 Bank",
    sub: "Conta digital",
    color: "#333",
    logo: "C6",
    connected: false,
  },
];

// ── CHART DATA ────────────────────────────────────────────────────────────────
const MONTHLY_BALANCE = [
  { month: "Out", receita: 5200, despesa: 3800 },
  { month: "Nov", receita: 6100, despesa: 4200 },
  { month: "Dez", receita: 7500, despesa: 5100 },
  { month: "Jan", receita: 5800, despesa: 3600 },
  { month: "Fev", receita: 6800, despesa: 4000 },
  { month: "Mar", receita: 8000, despesa: 4600 },
];

const CATEGORY_SPEND = [
  { name: "Entretenimento", value: 58.88, color: "#89D4FF" },
  { name: "Compras", value: 237.9, color: "#5DB7E6" },
  { name: "Transporte", value: 24.5, color: "#2F8FC4" },
  { name: "Alimentação", value: 55.8, color: "#7FCFFF" },
  { name: "Utilidades", value: 187.4, color: "#D9F3FF" },
  { name: "Saúde", value: 89.9, color: "#A8E0FF" },
];

// ── API METHODS ───────────────────────────────────────────────────────────────

export const authApi = {
  async login(email, password) {
    await delay();
    const user = USERS.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) throw new Error("E-mail ou senha incorretos.");
    const { password: _, ...safeUser } = user;
    return { user: safeUser, token: `fake-jwt-token-${Date.now()}` };
  },

  async logout() {
    await delay(200);
    return { success: true };
  },
};

export const cardsApi = {
  async list(userId) {
    await delay();
    return CARDS.filter((c) => c.userId === userId);
  },

  async create(cardData) {
    await delay();
    const newCard = {
      ...cardData,
      id: Date.now(),
      color: "linear-gradient(135deg, #1a3a6b 0%, #0A1F44 100%)",
    };
    CARDS.push(newCard);
    return newCard;
  },

  async remove(cardId) {
    await delay();
    const idx = CARDS.findIndex((c) => c.id === cardId);
    if (idx !== -1) CARDS.splice(idx, 1);
    return { success: true };
  },
};

export const transactionsApi = {
  async list(userId, filters = {}) {
    await delay();
    let list = TRANSACTIONS.filter((t) => t.userId === userId);
    if (filters.category)
      list = list.filter((t) => t.category === filters.category);
    if (filters.type) list = list.filter((t) => t.type === filters.type);
    if (filters.search)
      list = list.filter((t) =>
        t.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async summary(userId) {
    await delay();
    const list = TRANSACTIONS.filter((t) => t.userId === userId);
    const income = list
      .filter((t) => t.type === "credit")
      .reduce((s, t) => s + t.amount, 0);
    const expenses = Math.abs(
      list.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0),
    );
    return { income, expenses, balance: income - expenses };
  },
};

export const banksApi = {
  async list() {
    await delay();
    return [...BANKS];
  },

  async connect(bankId) {
    await delay(1200);
    const bank = BANKS.find((b) => b.id === bankId);
    if (bank) bank.connected = true;
    return { success: true, bank };
  },

  async disconnect(bankId) {
    await delay();
    const bank = BANKS.find((b) => b.id === bankId);
    if (bank) bank.connected = false;
    return { success: true };
  },
};

export const statsApi = {
  async monthlyBalance() {
    await delay();
    return MONTHLY_BALANCE;
  },

  async categorySpend() {
    await delay();
    return CATEGORY_SPEND;
  },
};
