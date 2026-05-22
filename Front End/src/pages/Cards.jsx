import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { cardsApi } from "../services/fakeApi";
import CreditCard from "../components/CreditCard";
import { useI18n } from "../context/I18nContext";

const COLORS = [
  "linear-gradient(135deg, #1a3a6b 0%, #0A1F44 100%)",
  "linear-gradient(135deg, #2d1b69 0%, #0f0a2e 100%)",
  "linear-gradient(135deg, #0d3b2d 0%, #071f18 100%)",
  "linear-gradient(135deg, #3b1a00 0%, #1a0a00 100%)",
];

export default function Cards() {
  const { user } = useAuth();
  const { tr, formatCurrency } = useI18n();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
    bank: "",
    brand: "Mastercard",
    type: "Crédito",
    color: COLORS[0],
  });
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState(0);

  const load = () =>
    cardsApi
      .list(user.id)
      .then(setCards)
      .finally(() => setLoading(false));

  useEffect(() => {
    if (user) load();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    await cardsApi.create({
      ...form,
      userId: user.id,
      balance: 0,
      limit: 5000,
    });
    await load();
    setShowModal(false);
    setForm({
      holder: "",
      number: "",
      expiry: "",
      cvv: "",
      bank: "",
      brand: "Mastercard",
      type: "Crédito",
      color: COLORS[0],
    });
    setSaving(false);
  };

  const handleRemove = async (id) => {
    if (!confirm(tr("Remover este cartão?", "Remove this card?"))) return;
    await cardsApi.remove(id);
    load();
  };

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

  const current = cards[selected];

  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
            {tr("Meus Cartões", "My Cards")}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
            {cards.length} {tr("cartão(s) cadastrado(s)", "registered card(s)")}
          </p>
        </div>
        <button
          className="btn-primary-db"
          style={{ width: "auto", padding: "10px 20px" }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2" />{" "}
          {tr("Adicionar Cartão", "Add Card")}
        </button>
      </div>

      <div className="row g-4">
        {/* Cards Carousel / List */}
        <div className="col-lg-6">
          {/* Card Selector */}
          <div className="d-flex gap-3 mb-3 overflow-auto pb-1">
            {cards.map((c, i) => (
              <div
                key={c.id}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    selected === i
                      ? "var(--accent-primary)"
                      : "var(--bg-surface)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  flexShrink: 0,
                  transform: selected === i ? "scale(1.5)" : "scale(1)",
                }}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>

          {current ? (
            <>
              <CreditCard card={current} />
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Limite utilizado
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>
                    {formatCurrency(current.balance)} /
                    {formatCurrency(current.limit)}
                  </span>
                </div>
                <div className="progress-bar-db">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(current.balance / current.limit) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <i className="bi bi-credit-card" />
              <p>
                {tr("Nenhum cartão cadastrado.", "No cards registered.")}
                <br />
                {tr("Adicione seu primeiro cartão!", "Add your first card!")}
              </p>
            </div>
          )}
        </div>

        {/* Card Details & All Cards */}
        <div className="col-lg-6">
          {current && (
            <div className="panel mb-4">
              <div className="section-hd">
                <h2>{tr("Detalhes do Cartão", "Card Details")}</h2>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    {tr("Banco", "Bank")}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {current.bank}
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    {tr("Tipo", "Type")}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {current.type}
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    {tr("Bandeira", "Brand")}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {current.brand}
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    {tr("Validade", "Expiry")}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {current.expiry}
                  </div>
                </div>
                <div className="col-12">
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    {tr("Saldo Disponível", "Available Balance")}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      fontFamily: "Syne",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {formatCurrency(current.balance)}
                  </div>
                </div>
              </div>
              <button
                className="btn-outline-db mt-3"
                style={{
                  width: "100%",
                  color: "var(--danger)",
                  borderColor: "var(--danger)",
                }}
                onClick={() => handleRemove(current.id)}
              >
                <i className="bi bi-trash me-2" />{" "}
                {tr("Remover Cartão", "Remove Card")}
              </button>
            </div>
          )}

          {/* All cards list */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Todos os Cartões", "All Cards")}</h2>
            </div>
            {cards.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                {tr("Nenhum cartão.", "No cards.")}
              </p>
            ) : (
              cards.map((c, i) => (
                <div
                  key={c.id}
                  className="d-flex align-items-center gap-3 mb-3"
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: 10,
                    transition: "background 0.2s",
                    background:
                      selected === i ? "var(--bg-surface)" : "transparent",
                  }}
                  onClick={() => setSelected(i)}
                >
                  <div
                    style={{
                      width: 48,
                      height: 32,
                      borderRadius: 8,
                      background: c.color,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {c.brand[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {c.bank} ···· {c.number.slice(-4)}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {c.type} · {c.brand}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(c.balance)}
                    </div>
                    {selected === i && (
                      <span
                        className="badge-db badge-success"
                        style={{ marginTop: 2 }}
                      >
                        {tr("Ativo", "Active")}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">
                {tr("Adicionar Novo Cartão", "Add New Card")}
              </h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <i className="bi bi-x" />
              </button>
            </div>

            {/* Preview */}
            <div style={{ marginBottom: 20 }}>
              <CreditCard
                compact
                card={{
                  holder:
                    form.holder || tr("TITULAR DO CARTÃO", "CARDHOLDER NAME"),
                  number: form.number || "0000 0000 0000 0000",
                  expiry: form.expiry || "MM/AAAA",
                  cvv: form.cvv || "000",
                  brand: form.brand,
                  bank: form.bank || tr("Banco", "Bank"),
                  type: form.type,
                  balance: 0,
                  limit: 5000,
                  color: form.color,
                }}
              />
            </div>

            {/* Color picker */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginBottom: 8,
                  display: "block",
                }}
              >
                {tr("Cor do cartão", "Card color")}
              </label>
              <div className="d-flex gap-2">
                {COLORS.map((c) => (
                  <div
                    key={c}
                    onClick={() => setForm((f) => ({ ...f, color: c }))}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: c,
                      cursor: "pointer",
                      border:
                        form.color === c
                          ? "2px solid var(--accent-primary)"
                          : "2px solid transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleAdd}>
              <div className="row g-2">
                <div className="col-12">
                  <div className="db-form-group">
                    <label>{tr("Nome do titular", "Cardholder name")}</label>
                    <input
                      className="db-input"
                      placeholder={tr("NOME SOBRENOME", "NAME SURNAME")}
                      value={form.holder}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          holder: e.target.value.toUpperCase(),
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="db-form-group">
                    <label>{tr("Número do cartão", "Card number")}</label>
                    <input
                      className="db-input"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={form.number}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 16);
                        v = v.replace(/(.{4})/g, "$1 ").trim();
                        setForm((f) => ({ ...f, number: v }));
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="db-form-group">
                    <label>{tr("Validade", "Expiry")}</label>
                    <input
                      className="db-input"
                      placeholder="MM/AAAA"
                      maxLength={7}
                      value={form.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length > 2)
                          v = v.slice(0, 2) + "/" + v.slice(2, 6);
                        setForm((f) => ({ ...f, expiry: v }));
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="db-form-group">
                    <label>CVV</label>
                    <input
                      className="db-input"
                      placeholder="000"
                      maxLength={4}
                      value={form.cvv}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          cvv: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="db-form-group">
                    <label>{tr("Banco", "Bank")}</label>
                    <input
                      className="db-input"
                      placeholder={tr("Ex: Nubank", "Ex: Nubank")}
                      value={form.bank}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, bank: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="db-form-group">
                    <label>{tr("Bandeira", "Brand")}</label>
                    <select
                      className="db-input"
                      value={form.brand}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, brand: e.target.value }))
                      }
                    >
                      <option>Mastercard</option>
                      <option>Visa</option>
                      <option>Amex</option>
                      <option>Elo</option>
                      <option>HiperCard</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="db-form-group">
                    <label>{tr("Tipo", "Type")}</label>
                    <select
                      className="db-input"
                      value={form.type}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, type: e.target.value }))
                      }
                    >
                      <option value="Crédito">{tr("Crédito", "Credit")}</option>
                      <option value="Débito">{tr("Débito", "Debit")}</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                className="btn-primary-db mt-2"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner"
                      style={{
                        width: 18,
                        height: 18,
                        display: "inline-block",
                        marginRight: 8,
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    {tr("Salvando...", "Saving...")}
                  </>
                ) : (
                  tr("Adicionar Cartão", "Add Card")
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
