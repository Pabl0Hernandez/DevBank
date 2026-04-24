import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";

export default function Login() {
  const { login, loading, error, setError } = useAuth();
  const { tr } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState("login"); // login | register

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const demoFill = (u) => {
    if (u === 1) {
      setEmail("tanya@devbank.com");
      setPassword("123456");
    } else {
      setEmail("admin@devbank.com");
      setPassword("admin");
    }
    setError("");
  };

  return (
    <div className="login-page">
      {/* Left Panel — Brand */}
      <div className="login-left">
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            className="d-flex align-items-center gap-3 mb-48"
            style={{ marginBottom: 48 }}
          >
            <div
              className="logo-icon"
              style={{ width: 48, height: 48, fontSize: 22, borderRadius: 14 }}
            >
              D
            </div>
            <div className="logo-text" style={{ fontSize: 26 }}>
              Dev<span>Bank</span>
            </div>
          </div>

          <h1
            style={{
              fontFamily: "Syne",
              fontSize: 38,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {tr("Gestão financeira", "Financial management")}
            <br />
            <span style={{ color: "var(--accent-primary)" }}>
              {tr("inteligente", "smart")}
            </span>{" "}
            {tr("para", "for")}
            <br />
            {tr("você.", "you.")}
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            {tr(
              "Conecte todos os seus bancos, acompanhe despesas e tome decisões financeiras com clareza.",
              "Connect all your banks, track expenses, and make financial decisions with clarity.",
            )}
          </p>

          {/* Feature list */}
          {[
            {
              icon: "bank",
              text: tr(
                "Conexão com bancos nacionais via Open Finance",
                "Connection with local banks via Open Finance",
              ),
            },
            {
              icon: "bar-chart-line",
              text: tr(
                "Análises e relatórios automáticos",
                "Automatic analytics and reports",
              ),
            },
            {
              icon: "shield-lock",
              text: tr(
                "Criptografia de ponta a ponta",
                "End-to-end encryption",
              ),
            },
            {
              icon: "phone",
              text: tr(
                "Pix integrado e transferências instantâneas",
                "Integrated Pix and instant transfers",
              ),
            },
          ].map((f) => (
            <div key={f.text} className="d-flex align-items-center gap-3 mb-3">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(137,212,255,0.12)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className={`bi bi-${f.icon}`}
                  style={{ color: "var(--accent-primary)", fontSize: 14 }}
                />
              </div>
              <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="login-right">
        <div className="login-form-wrap">
          {/* Tab toggle */}
          <div
            className="d-flex gap-1 p-1 mb-8"
            style={{
              background: "var(--bg-card)",
              borderRadius: 12,
              display: "inline-flex",
              marginBottom: 32,
              width: "100%",
            }}
          >
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setStep(t);
                  setError("");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  border: "none",
                  background: step === t ? "var(--bg-surface)" : "transparent",
                  color:
                    step === t ? "var(--text-primary)" : "var(--text-muted)",
                  fontSize: 14,
                  fontWeight: step === t ? 700 : 400,
                  cursor: "pointer",
                  fontFamily: step === t ? "Syne" : "Inter",
                }}
              >
                {t === "login"
                  ? tr("Entrar", "Sign in")
                  : tr("Criar conta", "Create account")}
              </button>
            ))}
          </div>

          {step === "login" ? (
            <>
              <h2
                style={{
                  fontFamily: "Syne",
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                {tr("Bem-vindo de volta", "Welcome back")}
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  marginBottom: 28,
                }}
              >
                {tr(
                  "Faça login para acessar sua conta",
                  "Sign in to access your account",
                )}
              </p>

              {/* Demo quick access */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {tr("Acesso rápido (demo)", "Quick access (demo)")}
                </div>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => demoFill(1)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      borderRadius: 8,
                      color: "var(--text-secondary)",
                      fontSize: 12,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--accent-primary), var(--accent-blue))",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#000",
                      }}
                    >
                      TM
                    </div>
                    Tanya ({tr("Usuário", "User")})
                  </button>
                  <button
                    onClick={() => demoFill(2)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      borderRadius: 8,
                      color: "var(--text-secondary)",
                      fontSize: 12,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #D78FEE, #E9B3FB)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      AD
                    </div>
                    Admin
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="db-form-group">
                  <label>{tr("E-mail", "Email")}</label>
                  <div style={{ position: "relative" }}>
                    <i
                      className="bi bi-envelope"
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-muted)",
                      }}
                    />
                    <input
                      className="db-input"
                      style={{ paddingLeft: 40 }}
                      type="email"
                      placeholder={tr("seu@email.com", "you@email.com")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="db-form-group">
                  <div className="d-flex justify-content-between mb-2">
                    <label style={{ margin: 0 }}>
                      {tr("Senha", "Password")}
                    </label>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--accent-primary)",
                        cursor: "pointer",
                      }}
                    >
                      {tr("Esqueci a senha", "Forgot password")}
                    </span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <i
                      className="bi bi-lock"
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-muted)",
                      }}
                    />
                    <input
                      className="db-input"
                      style={{ paddingLeft: 40, paddingRight: 44 }}
                      type={showPw ? "text" : "password"}
                      placeholder={tr("Sua senha", "Your password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <i
                      className={`bi bi-eye${showPw ? "-slash" : ""}`}
                      onClick={() => setShowPw((s) => !s)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div
                    style={{
                      background: "rgba(255,77,106,0.1)",
                      border: "1px solid rgba(255,77,106,0.2)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      marginBottom: 16,
                      fontSize: 13,
                      color: "var(--danger)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <i className="bi bi-exclamation-circle" />
                    {error}
                  </div>
                )}

                <button
                  className="btn-primary-db"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
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
                      {tr("Entrando...", "Signing in...")}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2" />
                      {tr("Entrar", "Sign in")}
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2
                style={{
                  fontFamily: "Syne",
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                {tr("Criar sua conta", "Create your account")}
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 14,
                  marginBottom: 28,
                }}
              >
                {tr(
                  "Junte-se a milhares de usuários",
                  "Join thousands of users",
                )}
              </p>

              <div
                style={{
                  textAlign: "center",
                  padding: "32px 20px",
                  background: "var(--bg-card)",
                  borderRadius: 16,
                  border: "1px solid var(--border-card)",
                }}
              >
                <i
                  className="bi bi-code-slash"
                  style={{
                    fontSize: 40,
                    color: "var(--accent-primary)",
                    marginBottom: 16,
                    display: "block",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 8,
                  }}
                >
                  {tr("API em desenvolvimento", "API in development")}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {tr(
                    "O cadastro será disponibilizado quando a API C# estiver integrada. Por enquanto, use os acessos demo.",
                    "Sign-up will be available when the C# API is integrated. For now, use demo access.",
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
