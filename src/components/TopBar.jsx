import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useI18n } from "../context/I18nContext";

const INITIAL_NOTIFICATIONS = [
  { id: 1, page: "transactions", read: false },
  { id: 2, page: "cards", read: false },
  { id: 3, page: "banks", read: true },
];

export default function TopBar({ title, onMenuClick, onNavigate }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { tr, language } = useI18n();
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const translatedNotifications = useMemo(() => {
    const copy = {
      1: {
        title: tr("Pix recebido", "Pix received"),
        description: tr(
          "Você recebeu R$ 240,00 agora.",
          "You received R$ 240.00 just now.",
        ),
      },
      2: {
        title: tr("Fatura próxima do vencimento", "Invoice due soon"),
        description: tr(
          "Seu cartão vence em 3 dias.",
          "Your card bill is due in 3 days.",
        ),
      },
      3: {
        title: tr("Novo banco conectado", "New bank connected"),
        description: tr(
          "Conta Nubank sincronizada com sucesso.",
          "Nubank account synced successfully.",
        ),
      },
    };

    return notifications.map((item) => ({
      ...item,
      title: copy[item.id]?.title || "",
      description: copy[item.id]?.description || "",
    }));
  }, [notifications, tr, language]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOpenNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    setUserMenuOpen(false);
  };

  const handleNotificationClick = (id, page) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
    setNotificationsOpen(false);
    if (page && onNavigate) onNavigate(page);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const handleUserAction = async (action) => {
    setUserMenuOpen(false);

    if (action === "profile" && onNavigate) {
      onNavigate("profile");
      return;
    }

    if (action === "settings" && onNavigate) {
      onNavigate("settings");
      return;
    }

    if (action === "logout") {
      await logout();
    }
  };

  return (
    <div className="topbar">
      <button className="hamburger" onClick={onMenuClick}>
        <i className="bi bi-list" />
      </button>

      <h1 className="topbar-title">{title}</h1>

      <div className="search-bar" style={{ display: "flex" }}>
        <i className="bi bi-search" />
        <input
          placeholder={tr("Buscar transações...", "Search transactions...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <div className="menu-anchor" ref={notificationsRef}>
          <button
            className="icon-btn"
            onClick={handleOpenNotifications}
            title={tr("Notificações", "Notifications")}
            aria-label={tr("Notificações", "Notifications")}
          >
            <i className="bi bi-bell" />
            {unreadCount > 0 && <span className="notif-dot" />}
          </button>

          {notificationsOpen && (
            <div className="topbar-menu notifications-menu">
              <div className="topbar-menu-head">
                <strong>{tr("Notificações", "Notifications")}</strong>
                <button className="menu-link-btn" onClick={markAllAsRead}>
                  {tr("Marcar todas", "Mark all")}
                </button>
              </div>

              <div className="menu-list">
                {translatedNotifications.map((item) => (
                  <button
                    key={item.id}
                    className={`menu-item ${item.read ? "" : "unread"}`}
                    onClick={() => handleNotificationClick(item.id, item.page)}
                  >
                    <div className="menu-item-title">{item.title}</div>
                    <div className="menu-item-desc">{item.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={
            isDark
              ? tr("Ativar tema claro", "Enable light theme")
              : tr("Ativar tema escuro", "Enable dark theme")
          }
          aria-label={
            isDark
              ? tr("Ativar tema claro", "Enable light theme")
              : tr("Ativar tema escuro", "Enable dark theme")
          }
        >
          <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"}`} />
        </button>

        <div className="menu-anchor" ref={userMenuRef}>
          <button
            className="user-avatar user-avatar-btn"
            onClick={() => {
              setUserMenuOpen((prev) => !prev);
              setNotificationsOpen(false);
            }}
            title={tr("Menu do usuário", "User menu")}
            aria-label={tr("Menu do usuário", "User menu")}
          >
            {user?.avatar || "U"}
          </button>

          {userMenuOpen && (
            <div className="topbar-menu user-menu">
              <div className="topbar-menu-head user-menu-head">
                <strong>{user?.name || tr("Usuário", "User")}</strong>
                <span>{user?.email}</span>
              </div>
              <div className="menu-list">
                <button
                  className="menu-item menu-item-action"
                  onClick={() => handleUserAction("profile")}
                >
                  <i className="bi bi-person" />
                  {tr("Meu perfil", "My profile")}
                </button>
                <button
                  className="menu-item menu-item-action"
                  onClick={() => handleUserAction("settings")}
                >
                  <i className="bi bi-gear" />
                  {tr("Configurações", "Settings")}
                </button>
                <button
                  className="menu-item menu-item-action danger"
                  onClick={() => handleUserAction("logout")}
                >
                  <i className="bi bi-box-arrow-right" />
                  {tr("Sair", "Logout")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
