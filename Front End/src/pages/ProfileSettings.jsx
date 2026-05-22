import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useI18n } from "../context/I18nContext";

export function Profile({ onNavigate }) {
  const { user } = useAuth();
  const { tr } = useI18n();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuMsg, setMenuMsg] = useState("");

  const openMenuMessage = (message) => {
    setMenuMsg(message);
    setTimeout(() => setMenuMsg(""), 2600);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-content">
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          {tr("Meu Perfil", "My Profile")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {tr(
            "Informações pessoais e preferências",
            "Personal information and preferences",
          )}
        </p>
      </div>

      {saved && (
        <div
          style={{
            background: "rgba(137,212,255,0.1)",
            border: "1px solid rgba(137,212,255,0.3)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: "var(--success)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i className="bi bi-check-circle-fill" />
          {tr(
            "Perfil atualizado com sucesso!",
            "Profile updated successfully!",
          )}
        </div>
      )}

      {menuMsg && (
        <div
          style={{
            background: "rgba(137,212,255,0.1)",
            border: "1px solid rgba(137,212,255,0.28)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: "var(--info)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i className="bi bi-info-circle-fill" />
          {menuMsg}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-4">
          {/* Avatar Card */}
          <div className="panel text-center mb-4">
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--accent-primary), var(--accent-blue))",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
                fontSize: 28,
                fontWeight: 800,
                color: "#000",
                fontFamily: "Syne",
              }}
            >
              {user?.avatar}
            </div>
            <h3
              style={{
                fontFamily: "Syne",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {user?.name}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 16,
              }}
            >
              {user?.role}
            </p>
            <span className="badge-db badge-success">
              <i className="bi bi-patch-check-fill me-1" />
              {tr("Verificado", "Verified")}
            </span>
            <button
              className="btn-outline-db mt-3"
              style={{ width: "100%", fontSize: 13 }}
              onClick={() => setEditing(true)}
            >
              <i className="bi bi-pencil me-2" />
              {tr("Editar Perfil", "Edit Profile")}
            </button>
          </div>

          {/* Quick info */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Informações", "Information")}</h2>
            </div>
            {[
              {
                icon: "envelope",
                label: tr("E-mail", "Email"),
                value: user?.email,
              },
              {
                icon: "phone",
                label: tr("Telefone", "Phone"),
                value: user?.phone,
              },
              {
                icon: "geo-alt",
                label: tr("Endereço", "Address"),
                value: user?.address,
              },
              {
                icon: "calendar3",
                label: tr("Membro desde", "Member since"),
                value: "Jan 2021",
              },
            ].map((item) => (
              <div key={item.label} className="d-flex gap-3 mb-3">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--bg-surface)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={`bi bi-${item.icon}`}
                    style={{ color: "var(--text-muted)", fontSize: 14 }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-8">
          {editing ? (
            <div className="panel">
              <div className="section-hd">
                <h2>Editar Informações</h2>
                <button className="close-btn" onClick={() => setEditing(false)}>
                  <i className="bi bi-x" />
                </button>
              </div>
              <form onSubmit={handleSave}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="db-form-group">
                      <label>{tr("Nome completo", "Full name")}</label>
                      <input
                        className="db-input"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="db-form-group">
                      <label>{tr("Cargo / Função", "Role")}</label>
                      <input
                        className="db-input"
                        value={form.role}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, role: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="db-form-group">
                      <label>{tr("E-mail", "Email")}</label>
                      <input
                        className="db-input"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="db-form-group">
                      <label>{tr("Telefone", "Phone")}</label>
                      <input
                        className="db-input"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <button
                    type="button"
                    className="btn-outline-db"
                    style={{ flex: 1 }}
                    onClick={() => setEditing(false)}
                  >
                    {tr("Cancelar", "Cancel")}
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-db"
                    style={{ flex: 2 }}
                    disabled={saving}
                  >
                    {saving
                      ? tr("Salvando...", "Saving...")
                      : tr("Salvar Alterações", "Save Changes")}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="panel">
              <div className="section-hd">
                <h2>{tr("Menu do Perfil", "Profile Menu")}</h2>
              </div>
              {[
                {
                  icon: "person",
                  label: tr("Informações Pessoais", "Personal Information"),
                  sub: tr("Nome, e-mail, telefone", "Name, email, phone"),
                  color: "#89D4FF",
                  action: () => {
                    setEditing(true);
                    openMenuMessage(
                      tr("Abrindo edição do perfil.", "Opening profile edit."),
                    );
                  },
                },
                {
                  icon: "credit-card",
                  label: tr("Preferências de Pagamento", "Payment Preferences"),
                  sub: tr("Cartões padrão, limites", "Default cards, limits"),
                  color: "#5DB7E6",
                  action: () => onNavigate && onNavigate("cards"),
                },
                {
                  icon: "building",
                  label: tr("Bancos e Cartões", "Banks and Cards"),
                  sub: tr("Gerenciar conexões", "Manage connections"),
                  color: "#2F8FC4",
                  action: () => onNavigate && onNavigate("banks"),
                },
                {
                  icon: "bell",
                  label: tr("Notificações", "Notifications"),
                  sub: tr("2 pendentes", "2 pending"),
                  color: "#D9F3FF",
                  badge: "2",
                  action: () =>
                    openMenuMessage(
                      tr(
                        "Veja as notificações pelo sino no topo.",
                        "Open notifications from the top bell.",
                      ),
                    ),
                },
                {
                  icon: "chat-text",
                  label: tr("Central de Mensagens", "Message Center"),
                  sub: tr("Suporte e dúvidas", "Support and questions"),
                  color: "#7FCFFF",
                  action: () =>
                    openMenuMessage(
                      tr(
                        "Central de mensagens em breve.",
                        "Message center coming soon.",
                      ),
                    ),
                },
                {
                  icon: "geo-alt",
                  label: tr("Endereço", "Address"),
                  sub: tr("Endereço de cobrança", "Billing address"),
                  color: "#A8E0FF",
                  action: () => {
                    setEditing(true);
                    openMenuMessage(
                      tr(
                        "Edite seu endereço no perfil.",
                        "Edit address in profile.",
                      ),
                    );
                  },
                },
                {
                  icon: "gear",
                  label: tr("Configurações", "Settings"),
                  sub: tr("Segurança, idioma", "Security, language"),
                  color: "#89D4FF",
                  action: () => onNavigate && onNavigate("settings"),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="menu-row-btn d-flex align-items-center gap-3 mb-1 p-3 rounded"
                  onClick={item.action}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: item.color + "22",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`bi bi-${item.icon}`}
                      style={{ color: item.color, fontSize: 16 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {item.sub}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {item.badge && (
                      <span className="badge-db badge-warning">
                        {item.badge}
                      </span>
                    )}
                    <i
                      className="bi bi-chevron-right"
                      style={{ color: "var(--text-muted)", fontSize: 12 }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Settings({ onNavigate }) {
  const { tr, language, setLanguage } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const [biometric, setBiometric] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null);
  const [sharedDataOpen, setSharedDataOpen] = useState(false);
  const [sharedData, setSharedData] = useState({
    analytics: true,
    personalization: true,
    partnerSharing: false,
  });
  const [changePw, setChangePw] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });
  const [pwMsg, setPwMsg] = useState("");
  const [menuMsg, setMenuMsg] = useState("");

  const openMenuMessage = (message) => {
    setMenuMsg(message);
    setTimeout(() => setMenuMsg(""), 2600);
  };

  const openLegalDoc = (title, content) => {
    setLegalDoc({ title, content });
  };

  const closeLegalDoc = () => setLegalDoc(null);

  const saveSharedData = () => {
    setSharedDataOpen(false);
    openMenuMessage(
      tr(
        "Preferências de dados compartilhados atualizadas.",
        "Shared data preferences updated.",
      ),
    );
  };

  const handleChangePw = async (e) => {
    e.preventDefault();
    if (changePw.newPw !== changePw.confirm) {
      setPwMsg(tr("As senhas não coincidem.", "Passwords do not match."));
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setPwMsg(
      tr("Senha alterada com sucesso!", "Password changed successfully!"),
    );
    setChangePw({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setPwMsg(""), 3000);
  };

  const Toggle = ({ checked, onChange }) => (
    <label className="toggle-switch" style={{ flexShrink: 0 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="toggle-track" />
      <div
        className="toggle-thumb"
        style={{
          left: checked ? 23 : 3,
          background: checked ? "var(--accent-primary)" : "var(--text-muted)",
        }}
      />
    </label>
  );

  return (
    <div className="page-content">
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          {tr("Configurações", "Settings")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {tr("Gerencie suas preferências", "Manage your preferences")}
        </p>
      </div>

      {menuMsg && (
        <div
          style={{
            background: "rgba(59,122,246,0.1)",
            border: "1px solid rgba(59,122,246,0.28)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: "var(--info)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i className="bi bi-info-circle-fill" />
          {menuMsg}
        </div>
      )}

      {legalDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{ background: "rgba(6, 12, 28, 0.72)", zIndex: 1080 }}
          onClick={closeLegalDoc}
        >
          <div
            className="panel"
            style={{
              maxWidth: 720,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="section-hd">
              <h2>{legalDoc.title}</h2>
              <button className="close-btn" onClick={closeLegalDoc}>
                <i className="bi bi-x" />
              </button>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              {legalDoc.content}
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button className="btn-primary-db" onClick={closeLegalDoc}>
                {tr("Fechar", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {sharedDataOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{ background: "rgba(6, 12, 28, 0.72)", zIndex: 1080 }}
          onClick={() => setSharedDataOpen(false)}
        >
          <div
            className="panel"
            style={{ maxWidth: 720, width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="section-hd">
              <h2>
                {tr("Gerenciar dados compartilhados", "Manage shared data")}
              </h2>
              <button
                className="close-btn"
                onClick={() => setSharedDataOpen(false)}
              >
                <i className="bi bi-x" />
              </button>
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginBottom: 20,
              }}
            >
              {tr(
                "Escolha quais dados podem ser usados para análises e personalização.",
                "Choose which data can be used for analytics and personalization.",
              )}
            </p>
            {[
              {
                key: "analytics",
                label: tr(
                  "Dados de uso e desempenho",
                  "Usage and performance data",
                ),
                sub: tr(
                  "Ajuda a melhorar estabilidade e velocidade.",
                  "Helps improve stability and speed.",
                ),
              },
              {
                key: "personalization",
                label: tr(
                  "Personalização da experiência",
                  "Experience personalization",
                ),
                sub: tr(
                  "Usado para recomendações e atalhos.",
                  "Used for recommendations and shortcuts.",
                ),
              },
              {
                key: "partnerSharing",
                label: tr(
                  "Compartilhamento com parceiros",
                  "Sharing with partners",
                ),
                sub: tr(
                  "Permite integrações opcionais com serviços externos.",
                  "Allows optional integrations with external services.",
                ),
              },
            ].map((item) => (
              <div
                key={item.key}
                className="d-flex align-items-center gap-3 mb-3"
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {item.sub}
                  </div>
                </div>
                <label className="toggle-switch" style={{ flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    checked={sharedData[item.key]}
                    onChange={(e) =>
                      setSharedData((current) => ({
                        ...current,
                        [item.key]: e.target.checked,
                      }))
                    }
                  />
                  <div className="toggle-track" />
                  <div
                    className="toggle-thumb"
                    style={{
                      left: sharedData[item.key] ? 23 : 3,
                      background: sharedData[item.key]
                        ? "var(--accent-primary)"
                        : "var(--text-muted)",
                    }}
                  />
                </label>
              </div>
            ))}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                className="btn-outline-db"
                onClick={() => setSharedDataOpen(false)}
              >
                {tr("Cancelar", "Cancel")}
              </button>
              <button className="btn-primary-db" onClick={saveSharedData}>
                {tr("Salvar preferências", "Save preferences")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-6">
          {/* General */}
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Geral", "General")}</h2>
            </div>
            {[
              {
                label: tr("Idioma", "Language"),
                sub:
                  language === "pt"
                    ? tr("Português (Brasil)", "Portuguese (Brazil)")
                    : tr("Inglês", "English"),
                icon: "translate",
                value: null,
                action: null,
              },
              {
                label: tr("Moeda padrão", "Default currency"),
                sub: "Real Brasileiro (BRL)",
                icon: "currency-dollar",
                value: null,
                action: () =>
                  openMenuMessage(
                    tr(
                      "Moeda padrão será personalizável em breve.",
                      "Default currency customization is coming soon.",
                    ),
                  ),
              },
              {
                label: tr("Fuso horário", "Timezone"),
                sub: "America/Sao_Paulo (UTC-3)",
                icon: "clock",
                value: null,
                action: () =>
                  openMenuMessage(
                    tr(
                      "Configuração de fuso em breve.",
                      "Timezone settings are coming soon.",
                    ),
                  ),
              },
              {
                label: tr("Contato & Suporte", "Contact & Support"),
                sub: tr("Abrir ticket de suporte", "Open support ticket"),
                icon: "headset",
                value: null,
                action: () =>
                  openMenuMessage(
                    tr(
                      "Canal de suporte disponível em breve.",
                      "Support channel available soon.",
                    ),
                  ),
              },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="menu-row-btn d-flex align-items-center gap-3 mb-3"
                onClick={item.action || undefined}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--bg-surface)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={`bi bi-${item.icon}`}
                    style={{ color: "var(--text-muted)", fontSize: 16 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {item.sub}
                  </div>
                </div>
                {item.icon === "translate" && (
                  <select
                    className="db-input"
                    style={{ maxWidth: 150 }}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                  </select>
                )}
                <i
                  className="bi bi-chevron-right"
                  style={{ color: "var(--text-muted)", fontSize: 12 }}
                />
              </button>
            ))}
          </div>

          {/* Security Toggles */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Segurança", "Security")}</h2>
            </div>
            {[
              {
                label: tr("Biometria", "Biometrics"),
                sub: tr(
                  "Login via impressão digital ou Face ID",
                  "Login with fingerprint or Face ID",
                ),
                icon: "fingerprint",
                checked: biometric,
                onChange: setBiometric,
              },
              {
                label: tr("Notificações Push", "Push Notifications"),
                sub: tr(
                  "Alertas de transações em tempo real",
                  "Real-time transaction alerts",
                ),
                icon: "bell",
                checked: notifications,
                onChange: setNotifications,
              },
              {
                label: tr("Modo Escuro", "Dark Mode"),
                sub: isDark
                  ? tr("Interface dark (ativo)", "Dark interface (active)")
                  : tr("Interface light (ativo)", "Light interface (active)"),
                icon: "moon",
                checked: isDark,
                onChange: toggleTheme,
              },
              {
                label: tr(
                  "Autenticação em 2 fatores",
                  "2-Factor Authentication",
                ),
                sub: tr("Segurança extra no login", "Extra login security"),
                icon: "shield-lock",
                checked: twoFactor,
                onChange: setTwoFactor,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="d-flex align-items-center gap-3 mb-3"
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--bg-surface)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={`bi bi-${item.icon}`}
                    style={{ color: "var(--text-muted)", fontSize: 16 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {item.sub}
                  </div>
                </div>
                <Toggle checked={item.checked} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="col-lg-6">
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Alterar Senha", "Change Password")}</h2>
            </div>
            {pwMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  marginBottom: 16,
                  fontSize: 13,
                  background: pwMsg.includes("sucesso")
                    ? "rgba(137,212,255,0.1)"
                    : "rgba(255,77,106,0.1)",
                  color: pwMsg.includes("sucesso")
                    ? "var(--success)"
                    : "var(--danger)",
                  border: `1px solid ${pwMsg.includes("sucesso") ? "rgba(137,212,255,0.2)" : "rgba(255,77,106,0.2)"}`,
                }}
              >
                {pwMsg}
              </div>
            )}
            <form onSubmit={handleChangePw}>
              <div className="db-form-group">
                <label>{tr("Senha atual", "Current password")}</label>
                <input
                  className="db-input"
                  type="password"
                  value={changePw.current}
                  onChange={(e) =>
                    setChangePw((f) => ({ ...f, current: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="db-form-group">
                <label>{tr("Nova senha", "New password")}</label>
                <input
                  className="db-input"
                  type="password"
                  placeholder={tr(
                    "Mínimo 8 caracteres",
                    "Minimum 8 characters",
                  )}
                  value={changePw.newPw}
                  onChange={(e) =>
                    setChangePw((f) => ({ ...f, newPw: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="db-form-group">
                <label>
                  {tr("Confirmar nova senha", "Confirm new password")}
                </label>
                <input
                  className="db-input"
                  type="password"
                  value={changePw.confirm}
                  onChange={(e) =>
                    setChangePw((f) => ({ ...f, confirm: e.target.value }))
                  }
                  required
                />
              </div>
              <button
                className="btn-primary-db"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? tr("Alterando...", "Updating...")
                  : tr("Alterar Senha", "Change Password")}
              </button>
            </form>
          </div>

          {/* Privacy */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Privacidade", "Privacy")}</h2>
            </div>
            {[
              {
                label: tr("Política de Privacidade", "Privacy Policy"),
                icon: "file-text",
                action: () =>
                  openLegalDoc(
                    tr("Política de Privacidade", "Privacy Policy"),
                    tr(
                      "Esta tela resume como o DevBank trata dados pessoais, autenticação, segurança e telemetria de uso. Os dados são usados para operar a conta, manter recursos essenciais e melhorar a experiência do app.",
                      "This screen summarizes how DevBank handles personal data, authentication, security, and usage telemetry. Data is used to operate the account, keep essential features running, and improve the app experience.",
                    ),
                  ),
              },
              {
                label: tr("Termos de Uso", "Terms of Use"),
                icon: "file-earmark",
                action: () =>
                  openLegalDoc(
                    tr("Termos de Uso", "Terms of Use"),
                    tr(
                      "Ao usar o DevBank, você concorda com o uso da plataforma para gestão financeira, com responsabilidades sobre suas credenciais e com regras básicas de segurança e privacidade.",
                      "By using DevBank, you agree to use the platform for financial management, accept responsibility for your credentials, and follow the basic security and privacy rules.",
                    ),
                  ),
              },
              {
                label: tr(
                  "Gerenciar dados compartilhados",
                  "Manage shared data",
                ),
                icon: "database",
                action: () => setSharedDataOpen(true),
              },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="menu-row-btn d-flex align-items-center gap-3 p-3 mb-1 rounded"
                onClick={item.action}
              >
                <i
                  className={`bi bi-${item.icon}`}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 16,
                    width: 20,
                  }}
                />
                <span style={{ fontSize: 14, flex: 1 }}>{item.label}</span>
                <i
                  className="bi bi-chevron-right"
                  style={{ color: "var(--text-muted)", fontSize: 12 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
