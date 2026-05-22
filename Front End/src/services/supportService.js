// Serviço de suporte com IA inteligente - Entende perguntas de verdade!

// Base de conhecimento com múltiplas variações de perguntas
const knowledgeBase = [
  {
    category: "cartão_bloqueio",
    keywords: [
      "bloquear",
      "bloqueado",
      "desbloquear",
      "cancelar cartão",
      "parar cartão",
      "disable",
      "cartão cancelado",
      "disable card",
      "parar uso",
      "temporário",
      "congelar",
    ],
    responses: [
      "Para bloquear seu cartão, acesse 'Meus Cartões' → selecione o cartão → clique em 'Bloquear'. A operação é imediata! Se precisar desbloquear, é só um clique. 🔒",
      "É fácil! Entra em Meus Cartões, escolhe qual cartão quer bloquear, e é só um toque. Desbloqueia depois se quiser. Sem problema!",
      "Pode deixar comigo! Vá em Meus Cartões → seu cartão → Bloquear. Fica ativo na hora e ninguém consegue usar sem você desbloquear de novo.",
    ],
  },
  {
    category: "cartão_limite",
    keywords: [
      "limite",
      "limite de crédito",
      "aumentar limite",
      "reduzir limite",
      "limite disponível",
      "qual meu limite",
      "levantar limite",
      "boost",
      "limite baixo",
      "aumenta limite aí",
    ],
    responses: [
      "Seu limite é baseado na sua análise de crédito. Para aumentar: Configurações → Limite de Crédito → Solicitar aumento. Análise leva até 2 dias. 📊",
      "Quer mais limite? Tudo bem! Entra em Configurações → Limite de Crédito → Solicitar aumento e a gente analisa tudo (leva 2 dias no máximo).",
      "Seu limite depende de seu histórico e score. Se quiser aumentar, é só ir em Configurações e solicitar. Agora tá baixo? Pode ser porque é novo aqui! 💪",
    ],
  },
  {
    category: "cartão_fatura",
    keywords: [
      "fatura",
      "conta",
      "extrato",
      "saldo devedor",
      "dívida",
      "cobrado",
      "quanto devo",
      "quanto tenho para pagar",
      "minha fatura",
      "qual é meu débito",
      "gastei quanto",
    ],
    responses: [
      "Sua fatura está em 'Transações' com todos os detalhes. Pague via PIX, transferência ou débito automático. Sem juros se pagar no vencimento! 💳",
      "Entra em Transações e vê tudinho! Saldo devedor, data de vencimento, como pagar... A gente aceita PIX, transferência ou débito em conta.",
      "Quer saber quanto deve? É só abrires Transações. Lá tem cada compra que fizeste, e o total que vence no dia X. Paga por PIX na hora!",
    ],
  },
  {
    category: "pix_enviar",
    keywords: [
      "pix",
      "enviar dinheiro",
      "transferir",
      "mandar grana",
      "pagar",
      "envio",
      "mandar pix",
      "fazer pix",
      "passar pix",
      "transferência",
      "enviar para",
      "quanto custa",
      "taxa pix",
    ],
    responses: [
      "PIX é instantâneo 24/7! Use 'Enviar Dinheiro' → escolha a chave (telefone, email, CPF ou aleatória) → confirme. Cai na hora! ⚡",
      "Queres mandar uma grana? PIX é o caminho! 'Enviar Dinheiro' → pega a chave de quem quer receber → manda. Sem taxa, sem demora.",
      "Fácil demais! Vai em 'Enviar Dinheiro', escolhe se quer usar CPF, telefone, email ou chave aleatória da pessoa, e bota o valor. Sai na hora!",
      "PIX é grátis e instantâneo! Qualquer hora, qualquer dia. Tem que ter a chave: pode ser CPF, email, telefone ou até número de conta. Sem taxa mesmo! 🚀",
    ],
  },
  {
    category: "pix_receber",
    keywords: [
      "receber pix",
      "minha chave",
      "copiar chave",
      "gerar chave",
      "dados para receber",
      "como recebo pix",
      "meu cpf",
      "chave pix",
      "como faz para receber",
      "meu telefone",
    ],
    responses: [
      "Suas chaves PIX estão em Configurações → PIX. Copie qualquer uma e compartilhe. Receber é automático e de graça! 🎯",
      "Quer receber pix? Vai em Configurações → PIX e copia qualquer uma das suas chaves. Tem CPF, telefone, email... escolhe qual compartilhar!",
      "Fácil! Suas chaves de PIX já tão prontas em Configurações. Pode usar seu CPF, telefone, email... qual preferir! E receber é 100% de graça.",
    ],
  },
  {
    category: "pix_comprovante",
    keywords: [
      "comprovante",
      "comprovação",
      "proof",
      "nota fiscal",
      "recibo",
      "onde tá",
      "guardar comprovante",
      "baixar comprovante",
      "screenshot",
    ],
    responses: [
      "Todos os comprovantes são salvos automaticamente em 'Transações'. Clique em qualquer transação para ver/baixar o comprovante. 📄",
      "Entra em Transações, procura a transação, e clica nela. Aí aparece tudo: comprovante, data, valor, tudo certinho!",
      "Quer guardar o comprovante? Vai em Transações → clica na transação → baixa o PDF. Fica salvo pro resto da vida!",
    ],
  },
  {
    category: "segurança_senha",
    keywords: [
      "senha",
      "mudar senha",
      "alterar senha",
      "esqueci senha",
      "resetar senha",
      "trocar senha",
      "senha fraca",
      "security",
    ],
    responses: [
      "Vá em Configurações → Segurança → Alterar Senha. Use letras, números e símbolos. Troque a cada 90 dias! 🔐",
      "Quer mudar sua senha? Configurações → Segurança → Alterar Senha. Cria uma bem brava (letras, números, símbolos) e tá feito!",
      "Esqueceu? Clica em 'Esqueci minha senha' e a gente manda email. Perdeu o email? Entra em contato com a gente urgente!",
    ],
  },
  {
    category: "segurança_2fa",
    keywords: [
      "2fa",
      "autenticação",
      "código",
      "sms",
      "verificação",
      "dupla autenticação",
      "two factor",
      "segurança",
      "code",
    ],
    responses: [
      "Ative em Configurações → Segurança → Autenticação 2FA. Você receberá um código via SMS para cada login. Super seguro! 🛡️",
      "Quer mais segurança? Ativa o 2FA em Configurações. Toda vez que loga, a gente manda um código no SMS. Só você consegue entrar!",
      "É bem simples! Vai em Segurança → 2FA → ativa. Recebe um código cada vez que precisa acessar. Fica blindado!",
    ],
  },
  {
    category: "segurança_fraude",
    keywords: [
      "fraude",
      "hackeado",
      "roubado",
      "não reconheço",
      "movimento estranho",
      "transação indevida",
      "transação fake",
      "roubo",
      "criminoso",
      "suspeito",
      "não fui eu",
    ],
    responses: [
      "Bloqueie o cartão IMEDIATAMENTE em 'Meus Cartões'! Depois contate nosso suporte urgente. Sua segurança é prioridade! 🚨",
      "Calma, a gente resolve! BLOQUEIA SEU CARTÃO AGORA em 'Meus Cartões' e depois vem falar com a gente. Vamos reembolsar tudo!",
      "Não é brincadeira, não! Bloqueia agora, abre um atendimento e avisa a gente. Vamos investigar cada movimento e recupera seu grana!",
    ],
  },
  {
    category: "conta_perfil",
    keywords: [
      "perfil",
      "dados",
      "informações",
      "dados pessoais",
      "atualizar dados",
      "editar perfil",
      "meu nome",
      "foto de perfil",
      "bio",
    ],
    responses: [
      "Edite seu perfil em 'Perfil'. Mudanças levam até 24h para processar. Mantenha seus dados sempre atualizados! 👤",
      "Quer atualizar suas informações? Vai em Perfil e mexe no que quiser. Mas ó, muda dados como nome, documento, pode levar 1 dia pra validar.",
    ],
  },
  {
    category: "conta_endereco",
    keywords: [
      "endereço",
      "morar",
      "mudança",
      "localização",
      "rua",
      "residência",
      "mudei de endereço",
      "novo endereço",
      "cep",
    ],
    responses: [
      "Atualize em Configurações → Dados Pessoais → Endereço. Isso é importante para segurança e conformidade legal. 📍",
      "Mudou de endereço? Sem problema! Vai em Configurações → Dados Pessoais e atualiza. Importante pra gente te alcançar e por lei!",
    ],
  },
  {
    category: "conta_saldo",
    keywords: [
      "saldo",
      "quanto tenho",
      "quanto tem",
      "meu dinheiro",
      "disponível",
      "quanto posso",
      "saldo atualizado",
      "saldo real",
      "cash",
    ],
    responses: [
      "Seu saldo está no Dashboard, atualizado a cada 30 segundos. Inclui saldo disponível e bloqueado. 💰",
      "Vê seu saldo ali na tela inicial! Tá sempre atualizado. Se tiver dinheiro bloqueado por alguma compra, aparece separado.",
    ],
  },
  {
    category: "conta_taxas",
    keywords: [
      "taxa",
      "tarifa",
      "cobrado",
      "quanto custa",
      "valor",
      "preço",
      "taxa pix",
      "taxa transferência",
      "grátis",
    ],
    responses: [
      "Ótima notícia! TODAS as nossas operações são GRÁTIS! PIX, transferências, cartão... sem taxa! 🎉",
      "Sem taxa aqui! PIX é grátis, transferência é grátis, manter cartão é grátis... Literalmente tudo é grátis! 😎",
      "Quer saber se tem taxa? Não tem! Nada custa nada. Tudo é incluído pro você usar sem se preocupar com grana.",
    ],
  },
  {
    category: "problema_geral",
    keywords: [
      "problema",
      "não funciona",
      "erro",
      "bug",
      "quebrado",
      "defeito",
      "tá errado",
      "alguma coisa tá estranho",
      "não tá certo",
    ],
    responses: [
      "Sinto ouvir isso! Descreva melhor o que está acontecendo. Quando começou? Em qual página? Vou resolver! 🔧",
      "Opa, desculpa aí! Que tá acontecendo? Descreve bem pra mim: o que tentou fazer, onde tá dando erro, quando começou...",
    ],
  },
  {
    category: "problema_app",
    keywords: [
      "app lento",
      "travado",
      "carregando",
      "não abre",
      "crash",
      "congelado",
      "lag",
      "lento",
      "demora",
      "trava",
    ],
    responses: [
      "Tente: 1) Recarregar página (F5), 2) Limpar cache, 3) Trocar navegador, 4) Usar outro dispositivo. Se continuar, me avisa! ⚙️",
      "Ficou travado? Relaxa, tenta: recarregar a página, limpar cache do navegador, ou abrir em outro navegador/celular. Geralmente resolve!",
    ],
  },
  {
    category: "problema_login",
    keywords: [
      "login",
      "não consigo entrar",
      "senha não funciona",
      "acesso",
      "entrar",
      "bloqueado",
      "conseguir entrar",
      "acesso negado",
    ],
    responses: [
      "Clique em 'Esqueci minha senha' na tela de login. Você receberá um email para resetar. Verifique sua caixa de spam também! 🔑",
      "Não consegue entrar? Clica em 'Esqueci minha senha' e segue as instruções do email. Se não recebe email, verifica spam e depois me chama!",
    ],
  },
  {
    category: "horario",
    keywords: [
      "horário",
      "atendimento",
      "aberto",
      "fecha",
      "funcionamento",
      "quando voces abrem",
      "que horas",
      "aberto agora",
    ],
    responses: [
      "Suporte via chat: 24/7 sempre online! 💬 Telefone: Seg-Sex 8h-20h. Sábado/Domingo: apenas urgências. ⏰",
      "Sempre aberto por aqui! Chat 24 horas, todo dia. Se quiser falar no phone, segunda a sexta das 8h até 20h.",
    ],
  },
  {
    category: "saudacao",
    keywords: [
      "oi",
      "olá",
      "opa",
      "e aí",
      "tudo bem",
      "como vai",
      "hey",
      "bom dia",
      "boa tarde",
      "boa noite",
    ],
    responses: [
      "Opa! Tudo certo por aqui! 👋 Como posso ajudá-lo hoje?",
      "E aí, tudo bem? 😊 Tô aqui pra ajudar com qualquer dúvida sobre seu banco!",
      "Opa, e aí! Bem-vindo! O que posso fazer por você?",
    ],
  },
  {
    category: "agradecimento",
    keywords: [
      "obrigado",
      "valeu",
      "brigado",
      "thanks",
      "thank you",
      "vlw",
      "tmj",
    ],
    responses: [
      "Por nada! Sempre à disposição. Volta qualquer hora que precisar! 😊",
      "De nada! Fico feliz em ajudar. Se tiver mais dúvida, é só chamar!",
      "Que isso! Qualquer coisa me chama de novo. Estou sempre por aqui! 🙌",
    ],
  },
];

// Calcula similaridade entre duas strings usando Levenshtein + palavras-chave
const calculateSimilarity = (text, keyword) => {
  const t = text.toLowerCase().trim();
  const k = keyword.toLowerCase().trim();

  // Correspondência exata
  if (t === k) return 100;

  // Contém a palavra inteira
  const words = t.split(/\s+/);
  if (words.includes(k)) return 95;
  if (t.includes(k)) return 90;
  if (k.includes(t)) return 85;

  // Palavras parciais
  if (t.split(" ").some((word) => k.split(" ").includes(word))) return 75;

  // Começa com
  if (t.startsWith(k) || k.startsWith(t)) return 70;

  // Distância Levenshtein melhorada
  let matches = 0;
  let minLen = Math.min(t.length, k.length);
  for (let i = 0; i < minLen; i++) {
    if (t[i] === k[i]) matches++;
  }
  const similarity = (matches / Math.max(t.length, k.length)) * 60;
  return similarity;
};

// Encontra a melhor resposta usando análise de similaridade
const findBestResponse = (message) => {
  let bestMatch = null;
  let bestScore = 0;

  // Procura a melhor categoria
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      const score = calculateSimilarity(message, keyword);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
  }

  // Se encontrou algo com boa similaridade (>50%), retorna uma resposta aleatória
  if (bestMatch && bestScore > 50) {
    const responses = bestMatch.responses || [bestMatch.response];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Respostas variadas quando não entende
  const generalResponses = [
    "Hmm, não tenho certeza se entendi direito. Você tá perguntando sobre cartões, PIX, transferências, segurança ou sua conta? 🤔",
    "Opa, acho que não peguei a pergunta. Pode reformular? Estou por aqui pra ajudar com banco! 😊",
    "Desculpa, não consegui entender. Tenta de novo com outras palavras! Pergunta sobre: cartões, PIX, transferências, segurança, dados da conta...",
    "Não achei resposta pra isso. Mas posso ajudar com: saldo, cartão, PIX, segurança, fatura... qual desses te interessa?",
  ];

  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

export const supportService = {
  async sendMessage(message) {
    // Simula latência mais realista de IA (mais longa para perguntas complexas)
    return new Promise((resolve) => {
      const baseDelay = 300;
      const messageLength = message.length;
      const complexity = Math.min(1, messageLength / 50); // Complexidade baseada no tamanho
      const randomDelay = Math.random() * 700;
      const totalDelay = baseDelay + randomDelay + complexity * 300;

      setTimeout(() => {
        const response = findBestResponse(message);
        resolve({
          id: Date.now(),
          text: response,
          sender: "ai",
          timestamp: new Date(),
        });
      }, totalDelay);
    });
  },

  getInitialMessage() {
    const greetings = [
      "Opa! 👋 Bem-vindo ao suporte DevBank. Sou seu assistente IA e entendo de tudo aqui: cartões, PIX, segurança, saldo... pode perguntar! 🤖",
      "Oi! Bem-vindo! 👋 Sou a IA do DevBank. Tô aqui pra responder qualquer dúvida sobre conta, cartão, PIX, segurança... manda a pergunta!",
      "E aí! 🤖 Bem-vindo ao suporte DevBank. Você tem dúvida sobre algo? Cartão, PIX, segurança, saldo, qualquer coisa... me chama!",
    ];

    return {
      id: 1,
      text: greetings[Math.floor(Math.random() * greetings.length)],
      sender: "ai",
      timestamp: new Date(),
    };
  },
};
