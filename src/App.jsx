import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/globals.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { I18nProvider, useI18n } from "./context/I18nContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import Transactions from "./pages/Transactions";
import Statistics from "./pages/Statistics";
import SendMoney from "./pages/SendMoney";
import Pix from "./pages/Pix";
import Banks from "./pages/Banks";
import { Profile, Settings } from "./pages/ProfileSettings";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ChatSupport from "./components/ChatSupport";

const getPageTitles = (tr) => ({
  dashboard: tr("Início", "Home"),
  cards: tr("Meus Cartões", "My Cards"),
  transactions: tr("Transações", "Transactions"),
  statistics: tr("Estatísticas", "Statistics"),
  send: tr("Enviar Dinheiro", "Send Money"),
  pix: "Pix",
  banks: tr("Bancos Conectados", "Connected Banks"),
  profile: tr("Perfil", "Profile"),
  settings: tr("Configurações", "Settings"),
});

function AppShell() {
  const { user } = useAuth();
  const { tr } = useI18n();
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pageTitles = getPageTitles(tr);

  if (!user) return <Login />;

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={setPage} />;
      case "cards":
        return <Cards />;
      case "transactions":
        return <Transactions />;
      case "statistics":
        return <Statistics />;
      case "send":
        return <SendMoney />;
      case "pix":
        return <Pix />;
      case "banks":
        return <Banks />;
      case "profile":
        return <Profile onNavigate={setPage} />;
      case "settings":
        return <Settings onNavigate={setPage} />;
      default:
        return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        active={page}
        onNavigate={setPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <TopBar
          title={pageTitles[page] || "DevBank"}
          onMenuClick={() => setSidebarOpen((o) => !o)}
          onNavigate={setPage}
        />
        {renderPage()}
      </div>
      <ChatSupport />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
    