import { supabase } from "./supabaseClient";

const normalizeUser = (user) => ({
  ...user,
  id: user.id,
  email: user.email,
  name: user.user_metadata?.name || user.email,
});

const handleResponse = async (response) => {
  const { error, data } = response;
  if (error) throw new Error(error.message);
  return data;
};

export const authApi = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    if (!data?.user) throw new Error("Usuário não encontrado.");
    return {
      user: normalizeUser(data.user),
      token: data.session?.access_token || null,
    };
  },

  async register(name, email, password) {
    // Registrar usuário
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      },
    );
    if (signUpError) throw new Error(signUpError.message);

    // Auto-login após registrar (funciona se email confirmation estiver desabilitado)
    try {
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (!loginError && loginData?.user) {
        return {
          user: normalizeUser(loginData.user),
          token: loginData.session?.access_token || null,
        };
      }
    } catch (err) {
      // Se auto-login falhar, retorna dados do sign-up
    }

    return {
      user: normalizeUser(signUpData.user),
      token: signUpData.session?.access_token || null,
    };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return { success: true };
  },
};

export const cardsApi = {
  async list(userId) {
    const data = await handleResponse(
      await supabase
        .from("cards")
        .select("*")
        .eq("user_id", userId)
        .order("id", { ascending: false }),
    );
    return data;
  },

  async create(cardData) {
    const data = await handleResponse(
      await supabase.from("cards").insert([
        {
          ...cardData,
          user_id: cardData.userId,
          balance: cardData.balance ?? 0,
          limit: cardData.limit ?? 0,
        },
      ]),
    );
    return data[0];
  },

  async remove(cardId) {
    await handleResponse(
      await supabase.from("cards").delete().eq("id", cardId),
    );
    return { success: true };
  },
};

export const transactionsApi = {
  async list(userId, filters = {}) {
    let query = supabase.from("transactions").select("*").eq("user_id", userId);
    if (filters.category) query = query.eq("category", filters.category);
    if (filters.type) query = query.eq("type", filters.type);
    if (filters.search) query = query.ilike("name", `%${filters.search}%`);
    const data = await handleResponse(
      await query.order("date", { ascending: false }),
    );
    return data;
  },

  async summary(userId) {
    const data = await this.list(userId);
    const income = data
      .filter((t) => t.type === "credit")
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const expenses = Math.abs(
      data
        .filter((t) => t.type === "debit")
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0),
    );
    return { income, expenses, balance: income - expenses };
  },
};

export const banksApi = {
  async list() {
    return handleResponse(await supabase.from("banks").select("*"));
  },

  async connect(bankId) {
    const data = await handleResponse(
      await supabase.from("banks").update({ connected: true }).eq("id", bankId),
    );
    return { success: true, bank: data[0] };
  },

  async disconnect(bankId) {
    await handleResponse(
      await supabase
        .from("banks")
        .update({ connected: false })
        .eq("id", bankId),
    );
    return { success: true };
  },
};

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const statsApi = {
  async monthlyBalance(userId) {
    const transactions = await transactionsApi.list(userId);
    const result = monthNames.map((month) => ({
      month,
      receita: 0,
      despesa: 0,
    }));

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const month = monthNames[date.getMonth()];
      const entry = result.find((item) => item.month === month);
      if (!entry) return;
      if (tx.type === "credit") entry.receita += Number(tx.amount || 0);
      if (tx.type === "debit")
        entry.despesa += Math.abs(Number(tx.amount || 0));
    });

    return result;
  },

  async categorySpend(userId) {
    const transactions = await transactionsApi.list(userId);
    const expenses = transactions.filter((tx) => tx.type === "debit");
    const bucket = expenses.reduce((acc, tx) => {
      const category = tx.category || "Outros";
      acc[category] = (acc[category] || 0) + Math.abs(Number(tx.amount || 0));
      return acc;
    }, {});
    return Object.entries(bucket).map(([name, value]) => ({ name, value }));
  },
};

export const pixApi = {
  async list(userId) {
    const data = await handleResponse(
      await supabase
        .from("pix_keys")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
    );
    return data;
  },

  async create(userId, keyType, keyValue) {
    // Remover pontuação para validação
    const cleanValue = keyValue.replace(/\D/g, "");

    const data = await handleResponse(
      await supabase.from("pix_keys").insert([
        {
          user_id: userId,
          key_type: keyType,
          key_value: keyValue,
          is_primary: false,
        },
      ]),
    );
    return data[0];
  },

  async remove(pixKeyId) {
    await handleResponse(
      await supabase.from("pix_keys").delete().eq("id", pixKeyId),
    );
    return { success: true };
  },

  async setPrimary(pixKeyId) {
    const data = await handleResponse(
      await supabase
        .from("pix_keys")
        .update({ is_primary: true })
        .eq("id", pixKeyId),
    );
    return data[0];
  },

  async recordTransaction(
    userId,
    type,
    amount,
    description,
    category = "Transação",
  ) {
    // Registra uma transação de PIX
    // type: "credit" (recebimento) ou "debit" (envio)
    const today = new Date().toISOString().split("T")[0];
    const data = await handleResponse(
      await supabase.from("transactions").insert([
        {
          user_id: userId,
          name:
            description || `PIX ${type === "credit" ? "Recebido" : "Enviado"}`,
          category,
          amount: Math.abs(Number(amount || 0)),
          date: today,
          type,
          icon: type === "credit" ? "arrow-down-circle" : "arrow-up-circle",
          color: type === "credit" ? "#00e5a0" : "#ff6b6b",
        },
      ]),
    );
    return data[0];
  },
};
