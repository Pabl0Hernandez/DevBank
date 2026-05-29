import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { transactionsApi } from "../services/supabaseApi";
import { useI18n } from "../context/I18nContext";

const CATEGORIES = [
  "Todas",
  "Entretenimento",
  "Compras",
  "Transporte",
  "Alimentação",
  "Utilidades",
  "Saúde",
  "Renda",
  "Transação",
];

export default function Transactions() {
  const { user } = useAuth();
  const { tr, formatCurrency, translateCategory, formatDate } = useI18n();
  const [txs, setTxs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [type, setType] = useState("all");

  useEffect(() => {
    if (!user) return;
    transactionsApi
      .list(user.id)
      .then((data) => {
        setTxs(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    let list = [...txs];
    if (search)
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()),
      );
    if (category !== "Todas")
      list = list.filter((t) => t.category === category);
    if (type !== "all") list = list.filter((t) => t.type === type);
    setFiltered(list);
  }, [search, category, type, txs]);

  const totalIn = txs
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const totalOut = Math.abs(
    txs.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0),
  );

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

  return (
    <div className="page-content">
      {/* Header */}
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          {tr("Transações", "Transactions")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {txs.length} {tr("transações encontradas", "transactions found")}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-4">
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <i
                className="bi bi-arrow-down-circle"
                style={{ color: "var(--accent-primary)", fontSize: 16 }}
              />
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {tr("Entradas", "Income")}
              </span>
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--accent-primary)",
              }}
            >
              +{formatCurrency(totalIn)}
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <i
                className="bi bi-arrow-up-circle"
                style={{ color: "var(--accent-blue)", fontSize: 16 }}
              />
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {tr("Saídas", "Expenses")}
              </span>
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--accent-blue)",
              }}
            >
              -{formatCurrency(totalOut)}
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <i
                className="bi bi-wallet2"
                style={{ color: "var(--accent-blue)", fontSize: 16 }}
              />
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {tr("Líquido", "Net")}
              </span>
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: 18,
                fontWeight: 700,
                color:
                  totalIn - totalOut >= 0
                    ? "var(--accent-primary)"
                    : "var(--accent-blue)",
              }}
            >
              {totalIn - totalOut >= 0 ? "+" : ""}
              {formatCurrency(totalIn - totalOut)}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="panel mb-4">
        <div className="row g-3 align-items-end">
          {/* Search */}
          <div className="col-md-4">
            <label
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                display: "block",
                marginBottom: 6,
              }}
            >
              {tr("Buscar", "Search")}
            </label>
            <div
              className="d-flex align-items-center gap-2"
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-card)",
                borderRadius: 10,
                padding: "10px 14px",
              }}
            >
              <i
                className="bi bi-search"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                placeholder={tr("Nome ou categoria...", "Name or category...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--text-primary)",
                  outline: "none",
                  flex: 1,
                  fontSize: 13,
                }}
              />
              {search && (
                <i
                  className="bi bi-x"
                  style={{ color: "var(--text-muted)", cursor: "pointer" }}
                  onClick={() => setSearch("")}
                />
              )}
            </div>
          </div>

          {/* Type */}
          <div className="col-md-3">
            <label
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                display: "block",
                marginBottom: 6,
              }}
            >
              {tr("Tipo", "Type")}
            </label>
            <select
              className="db-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">{tr("Todos", "All")}</option>
              <option value="credit">{tr("Entradas", "Income")}</option>
              <option value="debit">{tr("Saídas", "Expenses")}</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-md-5">
            <label
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                display: "block",
                marginBottom: 6,
              }}
            >
              {tr("Categoria", "Category")}
            </label>
            <div className="d-flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1px solid",
                    borderColor:
                      category === cat
                        ? "var(--accent-primary)"
                        : "var(--border-card)",
                    background:
                      category === cat
                        ? "rgba(137,212,255,0.12)"
                        : "transparent",
                    color:
                      category === cat
                        ? "var(--accent-primary)"
                        : "var(--text-muted)",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontWeight: category === cat ? 600 : 400,
                  }}
                >
                  {cat === "Todas"
                    ? tr("Todas", "All")
                    : translateCategory(cat)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="panel">
        <div className="section-hd">
          <h2>
            {tr("Histórico", "History")} ({filtered.length})
          </h2>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {tr("Ordenado por data", "Sorted by date")}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox" />
            <p>
              {tr(
                "Nenhuma transação encontrada com os filtros selecionados.",
                "No transactions found with selected filters.",
              )}
            </p>
          </div>
        ) : (
          filtered.map((tx) => (
            <div key={tx.id} className="tx-item">
              <div className="tx-icon" style={{ background: tx.color + "22" }}>
                <i className={`bi bi-${tx.icon}`} style={{ color: tx.color }} />
              </div>
              <div className="tx-info">
                <div className="tx-name">{tx.name}</div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <span
                    className="badge-db badge-info"
                    style={{ fontSize: 10 }}
                  >
                    {tx.type === "credit"
                      ? tr("Entrada", "Income")
                      : tr("Saída", "Expense")}
                  </span>
                  <span className="tx-category">
                    {translateCategory(tx.category)}
                  </span>
                  <span className="tx-date">· {formatDate(tx.date)}</span>
                </div>
              </div>
              <div
                className={`tx-amount ${tx.type === "credit" ? "credit" : "debit"}`}
              >
                {tx.type === "credit" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
