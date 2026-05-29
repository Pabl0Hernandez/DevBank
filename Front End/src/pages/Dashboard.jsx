import React, { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { cardsApi, transactionsApi, statsApi } from "../services/supabaseApi";
import { useI18n } from "../context/I18nContext";

const fmt = (v, locale) =>
  v.toLocaleString(locale, { style: "currency", currency: "BRL" });

const CONFETTI_COLORS = [
  "#FF0B55",
  "#FF5C85",
  "#FFC1D2",
  "#D60046",
  "#FF2D6B",
  "#FFE4EB",
];

function StatCard({ icon, iconBg, label, value, change, changeDir, tr }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg }}>
        <i className={`bi bi-${icon}`} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={`stat-change ${changeDir}`}>
          <i
            className={`bi bi-arrow-${changeDir === "up" ? "up" : "down"}-right`}
          />
          {change} {tr("este mês", "this month")}
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, locale }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--bg-card-2)",
        border: "1px solid var(--border-card)",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 13,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 6,
          color: "var(--text-primary)",
        }}
      >
        {label}
      </div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {fmt(p.value, locale)}
        </div>
      ))}
    </div>
  );
};

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const {
    tr,
    language,
    formatCurrency,
    formatDate,
    translateCategory,
    translateMonth,
  } = useI18n();
  const locale = language === "pt" ? "pt-BR" : "en-US";
  const [cards, setCards] = useState([]);
  const [txs, setTxs] = useState([]);
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [savingsInput, setSavingsInput] = useState("");
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimerRef = useRef(null);

  const savingsKey = user ? `devbank-savings-${user.id}` : null;

  useEffect(() => {
    if (!user) return;
    Promise.all([
      cardsApi.list(user.id),
      transactionsApi.list(user.id),
      transactionsApi.summary(user.id),
      statsApi.monthlyBalance(user.id),
    ])
      .then(([c, t, s, ch]) => {
        setCards(c);
        setTxs(t.slice(0, 5));
        setSummary(s);
        setChartData(ch);
      })
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!savingsKey) return;
    const saved = Number(localStorage.getItem(savingsKey) || 0);
    setSavingsAmount(Number.isFinite(saved) ? saved : 0);
  }, [savingsKey]);

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div
        className="page-content d-flex justify-content-center align-items-center"
        style={{ minHeight: 400 }}
      >
        <div className="spinner" />
      </div>
    );
  }

  const totalBalance = cards.reduce((s, c) => s + c.balance, 0);
  const chartDataLocalized = chartData.map((item) => ({
    ...item,
    month: translateMonth(item.month),
  }));
  const monthlyTarget = 1000;
  const savingsProgress = Math.min((savingsAmount / monthlyTarget) * 100, 100);

  const parseMoneyInput = (value) => {
    const normalized = String(value || "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.]/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

  const handleSaveMoney = () => {
    const amount = parseMoneyInput(savingsInput);
    if (!amount || !savingsKey) return;
    setSavingsAmount((prev) => {
      const next = prev + amount;
      localStorage.setItem(savingsKey, String(next));
      return next;
    });
    setSavingsInput("");

    const pieces = Array.from({ length: 38 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.28,
      duration: 1.2 + Math.random() * 1,
      rotation: Math.floor(Math.random() * 360),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.floor(Math.random() * 7),
    }));

    setConfettiPieces(pieces);
    setShowConfetti(true);

    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current);
    }
    confettiTimerRef.current = setTimeout(() => {
      setShowConfetti(false);
    }, 1800);
  };

  return (
    <div className="page-content">
      {showConfetti && (
        <div className="confetti-layer" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece"
              style={{
                left: `${piece.left}%`,
                width: piece.size,
                height: Math.max(4, piece.size - 2),
                background: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                transform: `translateY(-10vh) rotate(${piece.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Welcome */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2
            style={{
              fontFamily: "Syne",
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {tr("Olá,", "Hello,")} {user?.name?.split(" ")[0]} 👋
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            {tr(
              "Aqui está o resumo financeiro de hoje.",
              "Here's your financial summary for today.",
            )}
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn-outline-db"
            style={{ width: "auto", padding: "10px 20px" }}
            onClick={() => onNavigate("send")}
          >
            <i className="bi bi-send me-2" /> {tr("Enviar", "Send")}
          </button>
          <button
            className="btn-primary-db"
            style={{ width: "auto", padding: "10px 20px" }}
            onClick={() => onNavigate("pix")}
          >
            <i className="bi bi-plus-lg me-2" /> {tr("Novo Pix", "New Pix")}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <StatCard
            icon="wallet2"
            iconBg="rgba(137,212,255,0.16)"
            label={tr("Saldo Total", "Total Balance")}
            value={formatCurrency(totalBalance)}
            change="+12.5%"
            changeDir="up"
            tr={tr}
          />
        </div>
        <div className="col-6 col-md-3">
          <StatCard
            icon="arrow-down-circle"
            iconBg="rgba(93,183,230,0.16)"
            label={tr("Receitas (Mar)", "Income (Mar)")}
            value={summary ? formatCurrency(summary.income) : "—"}
            change="+8.2%"
            changeDir="up"
            tr={tr}
          />
        </div>
        <div className="col-6 col-md-3">
          <StatCard
            icon="arrow-up-circle"
            iconBg="rgba(47,143,196,0.14)"
            label={tr("Despesas (Mar)", "Expenses (Mar)")}
            value={summary ? formatCurrency(summary.expenses) : "—"}
            change="-3.1%"
            changeDir="down"
            tr={tr}
          />
        </div>
        <div className="col-6 col-md-3">
          <StatCard
            icon="credit-card-2-front"
            iconBg="rgba(217,243,255,0.18)"
            label={tr("Cartões Ativos", "Active Cards")}
            value={cards.length.toString()}
            change={null}
            tr={tr}
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Chart */}
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Fluxo de Caixa", "Cash Flow")}</h2>
              <span className="badge-db badge-info">
                {tr("Últimos 6 meses", "Last 6 months")}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={chartDataLocalized}
                margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#89D4FF" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#89D4FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5DB7E6" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#5DB7E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#8B9EC2", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#8B9EC2", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip locale={locale} />} />
                <Area
                  type="monotone"
                  dataKey="receita"
                  name={tr("Receita", "Income")}
                  stroke="#89D4FF"
                  strokeWidth={2}
                  fill="url(#colorReceita)"
                />
                <Area
                  type="monotone"
                  dataKey="despesa"
                  name={tr("Despesa", "Expense")}
                  stroke="#5DB7E6"
                  strokeWidth={2}
                  fill="url(#colorDespesa)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Transactions */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Transações Recentes", "Recent Transactions")}</h2>
              <span
                className="see-all"
                onClick={() => onNavigate("transactions")}
              >
                {tr("Ver todas", "See all")} →
              </span>
            </div>
            {txs.map((tx) => (
              <div key={tx.id} className="tx-item">
                <div
                  className="tx-icon"
                  style={{ background: "rgba(137,212,255,0.16)" }}
                >
                  <i
                    className={`bi bi-${tx.icon}`}
                    style={{ color: "var(--accent-blue)" }}
                  />
                </div>
                <div className="tx-info">
                  <div className="tx-name">{tx.name}</div>
                  <div className="tx-category">
                    {translateCategory(tx.category)} · {formatDate(tx.date)}
                  </div>
                </div>
                <div
                  className={`tx-amount ${tx.type === "credit" ? "credit" : "debit"}`}
                >
                  {tx.type === "credit" ? "+" : ""}
                  {formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Savings Box */}
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Caixinha", "Savings Box")}</h2>
            </div>

            <div
              style={{
                background: "var(--bg-card-2)",
                border: "1px solid var(--border-card)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginBottom: 4,
                }}
              >
                {tr("Total guardado", "Total saved")}
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--accent-primary)",
                  lineHeight: 1.1,
                }}
              >
                {formatCurrency(savingsAmount)}
              </div>
            </div>

            <div className="db-form-group mb-3">
              <label>
                {tr("Quanto deseja guardar hoje?", "How much to save today?")}
              </label>
              <input
                className="db-input"
                value={savingsInput}
                onChange={(e) => setSavingsInput(e.target.value)}
                placeholder={tr("Ex: 50,00", "Ex: 50.00")}
              />
            </div>

            <button className="btn-primary-db" onClick={handleSaveMoney}>
              <i className="bi bi-piggy-bank me-2" />
              {tr("Guardar na caixinha", "Save to box")}
            </button>

            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {tr("Meta do mês", "Monthly goal")}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>
                  {formatCurrency(savingsAmount)} /{" "}
                  {formatCurrency(monthlyTarget)}
                </span>
              </div>
              <div className="progress-bar-db">
                <div
                  className="progress-fill"
                  style={{ width: `${savingsProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Ações Rápidas", "Quick Actions")}</h2>
            </div>
            <div className="quick-actions">
              <button className="qa-btn" onClick={() => onNavigate("send")}>
                <i className="bi bi-send" /> <span>{tr("Enviar", "Send")}</span>
              </button>
              <button className="qa-btn" onClick={() => onNavigate("pix")}>
                <i className="bi bi-qr-code" /> <span>Pix</span>
              </button>
              <button className="qa-btn" onClick={() => onNavigate("cards")}>
                <i className="bi bi-plus-circle" />{" "}
                <span>{tr("Cartão", "Card")}</span>
              </button>
              <button
                className="qa-btn"
                onClick={() => onNavigate("transactions")}
              >
                <i className="bi bi-list-ul" />{" "}
                <span>{tr("Extrato", "Statement")}</span>
              </button>
            </div>
          </div>

          {/* Active Cards Summary */}
          <div className="panel">
            <div className="section-hd">
              <h2>
                {tr("Cartões", "Cards")} ({cards.length})
              </h2>
            </div>
            {cards.map((c) => (
              <div key={c.id} className="d-flex align-items-center gap-3 mb-3">
                <div
                  style={{
                    width: 44,
                    height: 30,
                    borderRadius: 6,
                    background: c.color,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {c.brand[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    ···· {c.number.slice(-4)}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {c.bank} · {c.type}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {formatCurrency(c.balance)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
