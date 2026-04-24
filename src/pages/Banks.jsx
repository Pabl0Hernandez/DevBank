import React, { useEffect, useState } from "react";
import { banksApi } from "../services/fakeApi";
import { useI18n } from "../context/I18nContext";

export default function Banks() {
  const { tr } = useI18n();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);

  const load = () =>
    banksApi
      .list()
      .then(setBanks)
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleConnect = async (bank) => {
    setConnecting(bank.id);
    await banksApi.connect(bank.id);
    await load();
    setConnecting(null);
  };

  const handleDisconnect = async (bank) => {
    if (!confirm(tr(`Desconectar ${bank.name}?`, `Disconnect ${bank.name}?`)))
      return;
    await banksApi.disconnect(bank.id);
    load();
  };

  const connected = banks.filter((b) => b.connected);
  const available = banks.filter((b) => !b.connected);

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
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          {tr("Bancos Conectados", "Connected Banks")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {tr(
            "Conecte seus bancos para sincronização automática",
            "Connect your banks for automatic sync",
          )}
        </p>
      </div>

      {/* Info Banner */}
      <div
        style={{
          background: "rgba(59,122,246,0.08)",
          border: "1px solid rgba(59,122,246,0.2)",
          borderRadius: 14,
          padding: "16px 20px",
          marginBottom: 24,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <i
          className="bi bi-shield-lock"
          style={{
            color: "var(--accent-blue)",
            fontSize: 22,
            flexShrink: 0,
            marginTop: 2,
          }}
        />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            {tr(
              "Conexão segura via Open Finance",
              "Secure connection via Open Finance",
            )}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {tr(
              "Seus dados bancários são criptografados e nunca armazenados em nossos servidores. A conexão é feita diretamente com seu banco.",
              "Your banking data is encrypted and never stored on our servers. The connection is made directly with your bank.",
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Connected */}
        <div className="col-lg-6">
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>
                {tr("Conectados", "Connected")} ({connected.length})
              </h2>
              <span className="badge-db badge-success">
                <i className="bi bi-check-circle me-1" />
                {connected.length} {tr("ativo(s)", "active")}
              </span>
            </div>
            {connected.length === 0 ? (
              <div className="empty-state" style={{ padding: "24px" }}>
                <i className="bi bi-building" />
                <p style={{ fontSize: 13 }}>
                  {tr(
                    "Nenhum banco conectado ainda.",
                    "No banks connected yet.",
                  )}
                </p>
              </div>
            ) : (
              connected.map((bank) => (
                <div key={bank.id} className="bank-item">
                  <div
                    className="bank-logo"
                    style={{ background: bank.color + "22", color: bank.color }}
                  >
                    {bank.logo}
                  </div>
                  <div>
                    <div className="bank-name">{bank.name}</div>
                    <div className="bank-sub">{bank.sub}</div>
                  </div>
                  <div className="bank-status d-flex align-items-center gap-2">
                    <span
                      className="badge-db badge-success"
                      style={{ fontSize: 10 }}
                    >
                      <i
                        className="bi bi-circle-fill me-1"
                        style={{ fontSize: 6 }}
                      />
                      {tr("Ativo", "Active")}
                    </span>
                    <button
                      onClick={() => handleDisconnect(bank)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--danger)",
                        cursor: "pointer",
                        fontSize: 16,
                        padding: 4,
                      }}
                      title={tr("Desconectar", "Disconnect")}
                    >
                      <i className="bi bi-x-circle" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Available */}
        <div className="col-lg-6">
          <div className="panel">
            <div className="section-hd">
              <h2>
                {tr("Disponíveis", "Available")} ({available.length})
              </h2>
            </div>
            {available.map((bank) => (
              <div key={bank.id} className="bank-item">
                <div
                  className="bank-logo"
                  style={{ background: bank.color + "22", color: bank.color }}
                >
                  {bank.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="bank-name">{bank.name}</div>
                  <div className="bank-sub">{bank.sub}</div>
                </div>
                <button
                  onClick={() => handleConnect(bank)}
                  disabled={connecting === bank.id}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 8,
                    background: "rgba(0,229,160,0.12)",
                    border: "1px solid rgba(0,229,160,0.3)",
                    color: "var(--accent-primary)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  {connecting === bank.id ? (
                    <>
                      <span
                        className="spinner"
                        style={{ width: 14, height: 14, borderWidth: 2 }}
                      />
                      {tr("Conectando...", "Connecting...")}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plug" />
                      {tr("Conectar", "Connect")}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="panel mt-4">
        <div className="section-hd">
          <h2>
            {tr(
              "Como funciona a conexão automática?",
              "How does automatic connection work?",
            )}
          </h2>
        </div>
        <div className="row g-3">
          {[
            {
              icon: "bank",
              step: "01",
              title: tr("Selecione seu banco", "Select your bank"),
              desc: tr(
                "Escolha seu banco na lista de instituições disponíveis.",
                "Choose your bank from the available institutions list.",
              ),
            },
            {
              icon: "shield-lock",
              step: "02",
              title: tr("Autenticação segura", "Secure authentication"),
              desc: tr(
                "Você é redirecionado para o app do seu banco para autorizar o acesso.",
                "You are redirected to your bank app to authorize access.",
              ),
            },
            {
              icon: "arrow-repeat",
              step: "03",
              title: tr(
                "Sincronização automática",
                "Automatic synchronization",
              ),
              desc: tr(
                "Suas transações são importadas automaticamente todos os dias.",
                "Your transactions are imported automatically every day.",
              ),
            },
          ].map((item) => (
            <div key={item.step} className="col-md-4">
              <div
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(0,229,160,0.1)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <i
                    className={`bi bi-${item.icon}`}
                    style={{ color: "var(--accent-primary)", fontSize: 18 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      fontSize: 9,
                      fontWeight: 800,
                      background: "var(--accent-primary)",
                      color: "#000",
                      padding: "1px 5px",
                      borderRadius: 4,
                    }}
                  >
                    {item.step}
                  </span>
                </div>
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
