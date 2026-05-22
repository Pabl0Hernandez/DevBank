import React, { useState } from "react";
import { useI18n } from "../context/I18nContext";
import { useTheme } from "../context/ThemeContext";

export default function CreditCard({ card, compact = false }) {
  const { tr, formatCurrency } = useI18n();
  const { isDark } = useTheme();
  const [flipped, setFlipped] = useState(false);
  const masked = card.number.replace(
    /(\d{4} \d{4}) \d{4} (\d{4})/,
    "$1 **** $2",
  );
  const lightCardBackgrounds = [
    "var(--card-light-grad-1)",
    "var(--card-light-grad-2)",
    "var(--card-light-grad-3)",
  ];
  const background = isDark
    ? card.color
    : lightCardBackgrounds[(card.id - 1) % lightCardBackgrounds.length];

  return (
    <div
      className="credit-card"
      style={{
        background,
        cursor: "pointer",
        userSelect: "none",
        minHeight: compact ? 160 : 190,
        padding: compact ? "20px 22px" : "28px",
      }}
      onClick={() => setFlipped((f) => !f)}
      title={tr("Clique para ver CVV", "Click to see CVV")}
    >
      {/* Top row */}
      <div className="d-flex justify-content-between align-items-start">
        <div className="card-chip" />
        <div style={{ textAlign: "right", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 2 }}>
            <i className="bi bi-wifi me-1" style={{ fontSize: 12 }} />
            {card.type}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>{card.bank}</div>
        </div>
      </div>

      {/* Middle */}
      {!flipped ? (
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="card-number mb-2">{masked}</div>
          <div className="d-flex align-items-center gap-3">
            <div>
              <div className="card-holder">{tr("Titular", "Cardholder")}</div>
              <div className="card-holder-name">{card.holder}</div>
            </div>
            <div>
              <div className="card-expiry-label">
                {tr("Validade", "Expiry")}
              </div>
              <div className="card-expiry-val">{card.expiry}</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.65)",
              borderRadius: 6,
              padding: "10px 14px",
              backdropFilter: "blur(4px)",
              border: isDark ? "none" : "1px solid rgba(15,23,42,0.1)",
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>
              {tr("Número completo", "Full number")}
            </div>
            <div className="card-number mb-3" style={{ fontSize: 14 }}>
              {card.number}
            </div>
            <div className="d-flex gap-4">
              <div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>CVV</div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3 }}
                >
                  {card.cvv}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>
                  {tr("Saldo", "Balance")}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>
                  {formatCurrency(card.balance)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom row */}
      <div
        className="d-flex justify-content-between align-items-end"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ fontSize: 11, opacity: 0.6 }}>
          {tr("Limite", "Limit")}: {formatCurrency(card.limit)}
        </div>
        <div className="card-circles">
          <div className="c1" />
          <div className="c2" />
        </div>
      </div>
    </div>
  );
}
