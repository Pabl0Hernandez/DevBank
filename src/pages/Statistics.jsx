import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { statsApi, transactionsApi } from "../services/fakeApi";
import { useI18n } from "../context/I18nContext";

const CustomTooltip = ({ active, payload, label, formatCurrency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--bg-card-2)",
        border: "1px solid var(--border-card)",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 13,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 6,
          color: "var(--text-primary)",
        }}
      >
        {label}
      </div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </div>
      ))}
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function Statistics() {
  const { user } = useAuth();
  const { tr, formatCurrency, translateCategory, translateMonth } = useI18n();
  const [monthly, setMonthly] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("6m");

  useEffect(() => {
    if (!user) return;
    Promise.all([
      statsApi.monthlyBalance(),
      statsApi.categorySpend(),
      transactionsApi.summary(user.id),
    ])
      .then(([m, c, s]) => {
        setMonthly(m);
        setCategories(c);
        setSummary(s);
      })
      .finally(() => setLoading(false));
  }, [user]);

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

  const savings = summary ? summary.income - summary.expenses : 0;
  const savingsRate = summary
    ? ((savings / summary.income) * 100).toFixed(1)
    : 0;
  const monthlyLocalized = monthly.map((item) => ({
    ...item,
    month: translateMonth(item.month),
  }));
  const categoriesLocalized = categories.map((item) => ({
    ...item,
    name: translateCategory(item.name),
  }));

  return (
    <div className="page-content">
      <div className="mb-4">
        <h2 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700 }}>
          {tr("Estatísticas", "Statistics")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {tr(
            "Análise detalhada das suas finanças",
            "Detailed analysis of your finances",
          )}
        </p>
      </div>

      {/* KPI Row */}
      <div className="row g-3 mb-4">
        {[
          {
            label: tr("Receita Total", "Total Income"),
            value: formatCurrency(summary?.income || 0),
            icon: "arrow-down-circle",
            color: "var(--accent-primary)",
            bg: "rgba(137,212,255,0.1)",
          },
          {
            label: tr("Despesa Total", "Total Expense"),
            value: formatCurrency(summary?.expenses || 0),
            icon: "arrow-up-circle",
            color: "var(--accent-blue)",
            bg: "rgba(93,183,230,0.1)",
          },
          {
            label: tr("Economias", "Savings"),
            value: formatCurrency(savings),
            icon: "piggy-bank",
            color: "var(--accent-blue)",
            bg: "rgba(137,212,255,0.12)",
          },
          {
            label: tr("Taxa de Poupança", "Savings Rate"),
            value: `${savingsRate}%`,
            icon: "graph-up-arrow",
            color: "var(--accent-dark)",
            bg: "rgba(217,243,255,0.1)",
          },
        ].map((item) => (
          <div key={item.label} className="col-6 col-md-3">
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{ background: item.bg, color: item.color }}
              >
                <i className={`bi bi-${item.icon}`} />
              </div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-value" style={{ fontSize: 20 }}>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Area Chart */}
        <div className="col-lg-8">
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Receitas vs Despesas", "Income vs Expenses")}</h2>
              <div className="d-flex gap-1">
                {["3m", "6m", "1a"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      border: "1px solid",
                      borderColor:
                        period === p
                          ? "var(--accent-primary)"
                          : "var(--border-card)",
                      background:
                        period === p ? "rgba(137,212,255,0.12)" : "transparent",
                      color:
                        period === p
                          ? "var(--accent-primary)"
                          : "var(--text-muted)",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={monthlyLocalized}
                margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#8B9EC2", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#8B9EC2", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={<CustomTooltip formatCurrency={formatCurrency} />}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Bar
                  dataKey="receita"
                  name={tr("Receita", "Income")}
                  fill="#89D4FF"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="despesa"
                  name={tr("Despesa", "Expense")}
                  fill="#5DB7E6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Table */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Gastos por Categoria", "Spending by Category")}</h2>
            </div>
            {categoriesLocalized.map((cat) => (
              <div key={cat.name} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: cat.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>
                      {cat.name}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {formatCurrency(cat.value)}
                  </span>
                </div>
                <div className="progress-bar-db">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(cat.value / Math.max(...categoriesLocalized.map((c) => c.value))) * 100}%`,
                      background: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-lg-4">
          <div className="panel mb-4">
            <div className="section-hd">
              <h2>{tr("Distribuição", "Distribution")}</h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoriesLocalized}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={95}
                  innerRadius={40}
                  dataKey="value"
                >
                  {categoriesLocalized.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2">
              {categoriesLocalized.map((cat) => (
                <div
                  key={cat.name}
                  className="d-flex align-items-center justify-content-between mb-2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cat.color,
                      }}
                    />
                    <span
                      style={{ fontSize: 12, color: "var(--text-secondary)" }}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>
                    {formatCurrency(cat.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="panel">
            <div className="section-hd">
              <h2>{tr("Tendência", "Trend")}</h2>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart
                data={monthlyLocalized}
                margin={{ top: 5, right: 5, left: -30, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#89D4FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#89D4FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#8B9EC2", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  content={<CustomTooltip formatCurrency={formatCurrency} />}
                />
                <Area
                  type="monotone"
                  dataKey="receita"
                  name={tr("Receita", "Income")}
                  stroke="#89D4FF"
                  strokeWidth={2}
                  fill="url(#trendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
