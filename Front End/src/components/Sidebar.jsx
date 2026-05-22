import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";

const navItems = [
  {
    id: "dashboard",
    icon: "house-fill",
    labelPt: "Início",
    labelEn: "Home",
    badge: null,
  },
  {
    id: "cards",
    icon: "credit-card-2-front-fill",
    labelPt: "Meus Cartões",
    labelEn: "My Cards",
    badge: null,
  },
  {
    id: "transactions",
    icon: "arrow-left-right",
    labelPt: "Transações",
    labelEn: "Transactions",
    badge: "12",
  },
  {
    id: "statistics",
    icon: "bar-chart-line-fill",
    labelPt: "Estatísticas",
    labelEn: "Statistics",
    badge: null,
  },
  {
    id: "send",
    icon: "send-fill",
    labelPt: "Enviar Dinheiro",
    labelEn: "Send Money",
    badge: null,
  },
  {
    id: "pix",
    icon: "qr-code",
    labelPt: "Pix / Cobrar",
    labelEn: "Pix / Request",
    badge: null,
  },
];

const bottomItems = [
  {
    id: "banks",
    icon: "building-fill",
    labelPt: "Bancos Conectados",
    labelEn: "Connected Banks",
    badge: null,
  },
  {
    id: "profile",
    icon: "person-fill",
    labelPt: "Perfil",
    labelEn: "Profile",
    badge: null,
  },
  {
    id: "settings",
    icon: "gear-fill",
    labelPt: "Configurações",
    labelEn: "Settings",
    badge: null,
  },
];

export default function Sidebar({ active, onNavigate, isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { tr } = useI18n();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const goToPage = (page) => {
    onNavigate(page);
    onClose();
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">D</div>
          <span className="logo-text">
            Dev<span>Bank</span>
          </span>
        </div>

        {/* Main Nav */}
        <div className="sidebar-nav">
          <div className="nav-section-label">
            {tr("Menu Principal", "Main Menu")}
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => goToPage(item.id)}
            >
              <i className={`bi bi-${item.icon}`} />
              {tr(item.labelPt, item.labelEn)}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}

          <div className="nav-section-label">{tr("Conta", "Account")}</div>
          {bottomItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => goToPage(item.id)}
            >
              <i className={`bi bi-${item.icon}`} />
              {tr(item.labelPt, item.labelEn)}
            </button>
          ))}

          <button
            className="nav-item"
            style={{ marginTop: 8, color: "var(--danger)" }}
            onClick={logout}
          >
            <i
              className="bi bi-box-arrow-right"
              style={{ color: "var(--danger)" }}
            />
            {tr("Sair", "Logout")}
          </button>
        </div>

        {/* User Card */}
        {user && (
          <div className="sidebar-footer">
            <div className="user-menu-wrap" ref={profileMenuRef}>
              <button
                className={`user-card ${active === "profile" ? "active" : ""}`}
                onClick={() => goToPage("profile")}
                title={tr("Ir para perfil", "Go to profile")}
                aria-label={tr("Ir para perfil", "Go to profile")}
              >
                <div className="user-avatar">{user.avatar}</div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </button>

              <button
                type="button"
                className="user-menu-trigger"
                title={tr("Abrir opções do perfil", "Open profile options")}
                aria-label={tr(
                  "Abrir opções do perfil",
                  "Open profile options",
                )}
                aria-expanded={isProfileMenuOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileMenuOpen((prev) => !prev);
                }}
              >
                <i className="bi bi-three-dots-vertical" />
              </button>

              {isProfileMenuOpen && (
                <div className="profile-mini-menu">
                  <button
                    type="button"
                    className="profile-mini-item"
                    onClick={() => goToPage("profile")}
                  >
                    <i className="bi bi-person" />
                    {tr("Meu Perfil", "My Profile")}
                  </button>
                  <button
                    type="button"
                    className="profile-mini-item"
                    onClick={() => goToPage("settings")}
                  >
                    <i className="bi bi-gear" />
                    {tr("Configurações", "Settings")}
                  </button>
                  <button
                    type="button"
                    className="profile-mini-item danger"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right" />
                    {tr("Sair", "Logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
