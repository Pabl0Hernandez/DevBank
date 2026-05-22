import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";

export default function Pix() {
  const { user } = useAuth();
  const { tr, formatCurrency } = useI18n();
  const [tab, setTab] = useState("cobrar"); // cobrar | pagar
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [keyType, setKeyType] = useState("cpf");

  const handleAction = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSuccess(true);
  };

  const fmtAmt = (v) => formatCurrency(parseFloat(v || 0));

  const MY_KEYS = [
    { type: "CPF", value: "***.***.789-00", icon: "person-badge" },
    { type: tr("E-mail", "Email"), value: user?.email || "", icon: "envelope" },
    { type: tr("Telefone", "Phone"), value: user?.phone || "", icon: "phone" },
  ];

  return (
    <div className="page-content">
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          Pix
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {tr("Pagamentos instantâneos", "Instant payments")}
        </p>
      </div>

      {/* Tabs */}
      <div
        className="d-flex gap-1 p-1 mb-4"
        style={{
          background: "var(--bg-card)",
          borderRadius: 12,
          display: "inline-flex",
        }}
      >
        {[
          {
            id: "cobrar",
            label: tr("Cobrar / QR Code", "Request / QR Code"),
            icon: "qr-code",
          },
          {
            id: "pagar",
            label: tr("Pagar / Enviar", "Pay / Send"),
            icon: "send",
          },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setSuccess(false);
            }}
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              border: "none",
              background: tab === t.id ? "var(--bg-surface)" : "transparent",
              color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)",
              fontSize: 13,
              fontWeight: tab === t.id ? 600 : 400,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <i className={`bi bi-${t.icon}`} /> {t.label}
          </button>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          {!success ? (
            <div className="panel">
              {tab === "cobrar" ? (
                <>
                  <div className="section-hd">
                    <h2>{tr("Gerar Cobrança Pix", "Generate Pix Request")}</h2>
                  </div>

                  <form onSubmit={handleAction}>
                    <div className="db-form-group">
                      <label>{tr("Valor a cobrar", "Amount to request")}</label>
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
                          required
                        />
                      </div>
                    </div>

                    <div className="db-form-group">
                      <label>{tr("Sua chave Pix", "Your Pix key")}</label>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {["cpf", "email", "telefone", "aleatoria"].map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setKeyType(k)}
                            style={{
                              padding: "5px 12px",
                              borderRadius: 8,
                              border: "1px solid",
                              borderColor:
                                keyType === k
                                  ? "var(--accent-primary)"
                                  : "var(--border-card)",
                              background:
                                keyType === k
                                  ? "rgba(0,229,160,0.12)"
                                  : "transparent",
                              color:
                                keyType === k
                                  ? "var(--accent-primary)"
                                  : "var(--text-muted)",
                              fontSize: 12,
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                          >
                            {k === "aleatoria"
                              ? tr("Aleatória", "Random")
                              : k.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="db-form-group">
                      <label>
                        {tr("Descrição (opcional)", "Description (optional)")}
                      </label>
                      <input
                        className="db-input"
                        placeholder={tr(
                          "Motivo da cobrança...",
                          "Reason for request...",
                        )}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn-primary-db"
                      type="submit"
                      disabled={sending || !amount}
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
                          {tr("Gerando...", "Generating...")}
                        </>
                      ) : (
                        <>
                          <i className="bi bi-qr-code me-2" />
                          {tr("Gerar QR Code", "Generate QR Code")}
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="section-hd">
                    <h2>{tr("Pagar via Pix", "Pay with Pix")}</h2>
                  </div>

                  <form onSubmit={handleAction}>
                    <div className="db-form-group">
                      <label>
                        {tr("Chave Pix do destinatário", "Recipient Pix key")}
                      </label>
                      <input
                        className="db-input"
                        placeholder={tr(
                          "CPF, e-mail, telefone ou chave aleatória",
                          "CPF, email, phone or random key",
                        )}
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        required
                      />
                    </div>

                    <div className="db-form-group">
                      <label>{tr("Valor", "Amount")}</label>
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
                          required
                        />
                      </div>
                    </div>

                    <div className="db-form-group">
                      <label>{tr("Descrição", "Description")}</label>
                      <input
                        className="db-input"
                        placeholder={tr(
                          "Motivo do pagamento...",
                          "Payment reason...",
                        )}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {[25, 50, 100, 250].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setAmount(v.toString())}
                          style={{
                            padding: "6px 14px",
                            borderRadius: 8,
                            border: "1px solid var(--border-card)",
                            background:
                              amount == v
                                ? "rgba(0,229,160,0.12)"
                                : "transparent",
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
                      type="submit"
                      disabled={sending || !pixKey || !amount}
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
                        <>
                          <i className="bi bi-send me-2" />
                          {tr("Enviar Pix", "Send Pix")}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          ) : (
            <div
              className="panel"
              style={{ textAlign: "center", padding: "36px 28px" }}
            >
              {tab === "cobrar" ? (
                <>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    {tr("QR Code gerado!", "QR Code generated!")}
                  </div>
                  {/* Fake QR Code SVG */}
                  <div
                    style={{
                      display: "inline-block",
                      padding: 20,
                      background: "white",
                      borderRadius: 16,
                      marginBottom: 20,
                    }}
                  >
                    <svg
                      width="160"
                      height="160"
                      viewBox="0 0 10 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Simplified QR pattern */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) =>
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => {
                          const on =
                            (r < 3 && c < 3) ||
                            (r < 3 && c > 6) ||
                            (r > 6 && c < 3) ||
                            Math.random() > 0.5;
                          return on ? (
                            <rect
                              key={`${r}-${c}`}
                              x={c}
                              y={r}
                              width="1"
                              height="1"
                              fill="#000"
                            />
                          ) : null;
                        }),
                      )}
                      <rect
                        x="0"
                        y="0"
                        width="3"
                        height="3"
                        fill="none"
                        stroke="#000"
                        strokeWidth="0.3"
                      />
                      <rect
                        x="7"
                        y="0"
                        width="3"
                        height="3"
                        fill="none"
                        stroke="#000"
                        strokeWidth="0.3"
                      />
                      <rect
                        x="0"
                        y="7"
                        width="3"
                        height="3"
                        fill="none"
                        stroke="#000"
                        strokeWidth="0.3"
                      />
                      <rect x="0.5" y="0.5" width="2" height="2" fill="#000" />
                      <rect x="7.5" y="0.5" width="2" height="2" fill="#000" />
                      <rect x="0.5" y="7.5" width="2" height="2" fill="#000" />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--accent-primary)",
                      marginBottom: 8,
                    }}
                  >
                    {fmtAmt(amount)}
                  </div>
                  {description && (
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: 13,
                        marginBottom: 20,
                      }}
                    >
                      {description}
                    </p>
                  )}
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      borderRadius: 10,
                      padding: "10px 16px",
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 20,
                    }}
                  >
                    {tr("Válido por 30 minutos", "Valid for 30 minutes")} · Pix
                    ID: PIX-{Date.now().toString().slice(-8)}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn-outline-db"
                      style={{ flex: 1 }}
                      onClick={() => {
                        setSuccess(false);
                        setAmount("");
                        setDescription("");
                      }}
                    >
                      {tr("Novo QR", "New QR")}
                    </button>
                    <button className="btn-primary-db" style={{ flex: 1 }}>
                      <i className="bi bi-share me-2" />
                      {tr("Compartilhar", "Share")}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "rgba(0,229,160,0.15)",
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
                    {tr("Pix Enviado!", "Pix Sent!")}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    {tr(
                      `${fmtAmt(amount)} transferido via Pix.`,
                      `${fmtAmt(amount)} transferred via Pix.`,
                    )}
                  </p>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 12,
                      marginBottom: 24,
                    }}
                  >
                    {tr("Para:", "To:")} {pixKey}
                  </p>
                  <button
                    className="btn-primary-db"
                    onClick={() => {
                      setSuccess(false);
                      setAmount("");
                      setPixKey("");
                      setDescription("");
                    }}
                  >
                    {tr("Novo Pix", "New Pix")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* My Keys */}
        <div className="col-lg-5">
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Minhas Chaves Pix", "My Pix Keys")}</h2>
            </div>
            {MY_KEYS.map((k) => (
              <div
                key={k.type}
                className="bank-item"
                style={{ marginBottom: 10 }}
              >
                <div
                  className="bank-logo"
                  style={{
                    background: "rgba(0,229,160,0.12)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <i className={`bi bi-${k.icon}`} />
                </div>
                <div>
                  <div className="bank-name">{k.type}</div>
                  <div className="bank-sub">{k.value}</div>
                </div>
                <button
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  <i className="bi bi-copy" />
                </button>
              </div>
            ))}
            <button
              className="btn-outline-db mt-2"
              style={{ width: "100%", fontSize: 13 }}
            >
              <i className="bi bi-plus-circle me-2" />
              {tr("Cadastrar nova chave", "Register new key")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
