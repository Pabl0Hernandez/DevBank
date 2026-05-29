import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { cardsApi } from "../services/supabaseApi";
import { useI18n } from "../context/I18nContext";

const CONTACTS = [
  { id: 1, name: "Yakub Silva", initial: "YS", color: "#89D4FF" },
  { id: 2, name: "Yamilet Costa", initial: "YC", color: "#5DB7E6" },
  { id: 3, name: "Alexa Ferreira", initial: "AF", color: "#2F8FC4" },
  { id: 4, name: "Krishna Patel", initial: "KP", color: "#7FCFFF" },
  { id: 5, name: "Roberto Lima", initial: "RL", color: "#A8E0FF" },
];

export default function SendMoney() {
  const { user } = useAuth();
  const { tr, formatCurrency } = useI18n();
  const [cards, setCards] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [cardId, setCardId] = useState("");
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=success
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user)
      cardsApi.list(user.id).then((c) => {
        setCards(c);
        setCardId(c[0]?.id || "");
      });
  }, [user]);

  const handleSend = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setAmount("");
    setDescription("");
    setSelectedContact(null);
  };

  const fmtAmt = (v) => formatCurrency(parseFloat(v || 0));

  return (
    <div className="page-content">
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          {tr("Enviar Dinheiro", "Send Money")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {tr(
            "Transfira para contatos ou contas",
            "Transfer to contacts or accounts",
          )}
        </p>
      </div>

      {/* Step indicators */}
      <div className="d-flex align-items-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              style={{
                width: s <= step ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  s <= step ? "var(--accent-primary)" : "var(--bg-surface)",
                transition: "all 0.3s",
              }}
            />
          </React.Fragment>
        ))}
        <span
          style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 4 }}
        >
          {step === 1
            ? tr("Preencher dados", "Fill details")
            : step === 2
              ? tr("Confirmar", "Confirm")
              : tr("Concluído", "Completed")}
        </span>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          {step === 1 && (
            <div className="panel">
              {/* Contacts */}
              <div className="section-hd">
                <h2>{tr("Enviar para", "Send to")}</h2>
              </div>
              <div className="d-flex gap-3 mb-4 overflow-auto pb-1">
                {CONTACTS.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: c.color + "33",
                        border:
                          selectedContact?.id === c.id
                            ? `2px solid ${c.color}`
                            : "2px solid transparent",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        color: c.color,
                        transition: "all 0.2s",
                      }}
                    >
                      {c.initial}
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      border: "2px dashed var(--border-card)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    <i className="bi bi-plus" style={{ fontSize: 20 }} />
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {tr("Novo", "New")}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="db-form-group">
                <label>{tr("Valor (BRL)", "Amount (BRL)")}</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-muted)",
                      fontSize: 14,
                    }}
                  >
                    R$
                  </span>
                  <input
                    className="db-input"
                    style={{
                      paddingLeft: 38,
                      fontSize: 18,
                      fontFamily: "Syne",
                      fontWeight: 700,
                    }}
                    placeholder="0,00"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="db-form-group">
                <label>
                  {tr("Descrição (opcional)", "Description (optional)")}
                </label>
                <input
                  className="db-input"
                  placeholder={tr(
                    "Ex: Almoço, Divisão de conta...",
                    "Ex: Lunch, Bill split...",
                  )}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="db-form-group">
                <label>{tr("Pagar com", "Pay with")}</label>
                <select
                  className="db-input"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                >
                  {cards.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.bank} ···· {c.number.slice(-4)} —{" "}
                      {formatCurrency(c.balance)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick amounts */}
              <div className="d-flex gap-2 mb-4">
                {[50, 100, 200, 500].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v.toString())}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 8,
                      border: "1px solid var(--border-card)",
                      background:
                        amount == v ? "rgba(137,212,255,0.12)" : "transparent",
                      color:
                        amount == v
                          ? "var(--accent-primary)"
                          : "var(--text-muted)",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    R${v}
                  </button>
                ))}
              </div>

              <button
                className="btn-primary-db"
                disabled={
                  !selectedContact || !amount || parseFloat(amount) <= 0
                }
                onClick={() => setStep(2)}
              >
                {tr("Continuar", "Continue")}{" "}
                <i className="bi bi-arrow-right ms-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="panel">
              <div className="section-hd">
                <h2>{tr("Confirmar Transferência", "Confirm Transfer")}</h2>
              </div>

              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: 14,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: selectedContact?.color + "33",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      color: selectedContact?.color,
                    }}
                  >
                    {selectedContact?.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>
                      {selectedContact?.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {tr("Destinatário", "Recipient")}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    {tr("Valor", "Amount")}
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontSize: 36,
                      fontWeight: 800,
                      color: "var(--accent-primary)",
                    }}
                  >
                    {fmtAmt(amount)}
                  </div>
                </div>

                {description && (
                  <div
                    style={{
                      background: "var(--bg-card)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                    }}
                  >
                    <i
                      className="bi bi-chat-text me-2"
                      style={{ color: "var(--text-muted)" }}
                    />
                    {description}
                  </div>
                )}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginBottom: 20,
                  padding: "10px 14px",
                  background: "rgba(137,212,255,0.08)",
                  borderRadius: 8,
                  border: "1px solid rgba(137,212,255,0.2)",
                }}
              >
                <i
                  className="bi bi-shield-check me-2"
                  style={{ color: "var(--accent-primary)" }}
                />
                {tr(
                  "Verifique os dados antes de confirmar. Transferências não podem ser desfeitas.",
                  "Review the details before confirming. Transfers cannot be undone.",
                )}
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn-outline-db"
                  style={{ flex: 1 }}
                  onClick={() => setStep(1)}
                >
                  {tr("Voltar", "Back")}
                </button>
                <button
                  className="btn-primary-db"
                  style={{ flex: 2 }}
                  onClick={handleSend}
                  disabled={sending}
                >
                  {sending ? (
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
                      />
                      {tr("Enviando...", "Sending...")}
                    </>
                  ) : (
                    tr("Confirmar Transferência", "Confirm Transfer")
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              className="panel"
              style={{ textAlign: "center", padding: "48px 28px" }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(137,212,255,0.15)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 20px",
                  fontSize: 32,
                }}
                className="glow-pulse"
              >
                <i
                  className="bi bi-check-circle-fill"
                  style={{ color: "var(--accent-primary)" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {tr("Transferência Realizada!", "Transfer Completed!")}
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  marginBottom: 24,
                }}
              >
                {tr(
                  `${fmtAmt(amount)} enviado com sucesso para ${selectedContact?.name}.`,
                  `${fmtAmt(amount)} sent successfully to ${selectedContact?.name}.`,
                )}
              </p>
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: 12,
                  padding: "14px 20px",
                  marginBottom: 24,
                  fontSize: 13,
                  color: "var(--text-secondary)",
                }}
              >
                {tr("Código da transação:", "Transaction code:")}{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                    color: "var(--accent-primary)",
                    fontWeight: 700,
                  }}
                >
                  TXN-{Date.now().toString().slice(-8)}
                </span>
              </div>
              <button className="btn-primary-db" onClick={reset}>
                {tr("Nova Transferência", "New Transfer")}
              </button>
            </div>
          )}
        </div>

        {/* Recent */}
        <div className="col-lg-5">
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Transferências Recentes", "Recent Transfers")}</h2>
            </div>
            {CONTACTS.slice(0, 4).map((c, i) => (
              <div
                key={c.id}
                className="tx-item"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedContact(c)}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: c.color + "22",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: c.color,
                    flexShrink: 0,
                  }}
                >
                  {c.initial}
                </div>
                <div className="tx-info">
                  <div className="tx-name">{c.name}</div>
                  <div className="tx-category">
                    {
                      [
                        "há 2 dias",
                        "há 5 dias",
                        "semana passada",
                        "há 2 semanas",
                      ][i]
                    }
                  </div>
                </div>
                <div className="tx-amount debit">
                  -R${[50, 120, 200, 75][i]},00
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
