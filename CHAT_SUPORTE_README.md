# 🤖 Chat de Suporte com IA

Um componente de chat interativo para suporte ao cliente integrado ao DevBank. O chat fica como um botão flutuante no canto inferior direito da página.

## 📋 Arquivos Criados

- **`src/components/ChatSupport.jsx`** - Componente React do chat
- **`src/components/ChatSupport.css`** - Estilos do chat
- **`src/services/supportService.js`** - Serviço de lógica de IA/respostas

## 🚀 Como Usar

O chat já está integrado ao `App.jsx` e aparece automaticamente em todas as páginas autenticadas. Clique no botão roxa no canto inferior direito para abrir.

## 💬 Funcionalidades

- ✅ Interface elegante com animações suaves
- ✅ Respostas automáticas para perguntas comuns
- ✅ Suporte a tópicos: Cartões, PIX, Segurança, Conta, Problemas
- ✅ Animação de digitação (loading)
- ✅ Responsivo para mobile
- ✅ Histórico de conversa
- ✅ Auto-scroll para mensagens novas

## 🔌 Integração com IA Real

Para conectar com uma IA real (OpenAI, Hugging Face, etc.), modifique o arquivo `src/services/supportService.js`:

### Exemplo com OpenAI:

```javascript
import axios from "axios";

export const supportService = {
  async sendMessage(message) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Você é um agente de suporte do DevBank...",
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        },
      );

      return {
        id: Date.now(),
        text: response.data.choices[0].message.content,
        sender: "ai",
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Erro ao chamar OpenAI:", error);
      return {
        id: Date.now(),
        text: "Desculpe, ocorreu um erro. Tente novamente.",
        sender: "ai",
        timestamp: new Date(),
      };
    }
  },

  getInitialMessage() {
    return {
      id: 1,
      text: "Olá! 👋 Bem-vindo ao suporte DevBank. Como posso ajudá-lo?",
      sender: "ai",
      timestamp: new Date(),
    };
  },
};
```

### Variáveis de Ambiente

Adicione ao arquivo `.env`:

```
VITE_OPENAI_API_KEY=sua_chave_aqui
```

Instale a dependência:

```bash
npm install axios
```

## 🎨 Personalizações

### Cores

Encontre `.gradient` nos estilos CSS e modifique:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Respostas

Edite o objeto `responses` em `supportService.js` para adicionar mais tópicos:

```javascript
const responses = {
  "sua-palavra-chave": "Sua resposta aqui",
  // ...
};
```

### Posição

Para mover o botão, procure por `.chat-support-btn` e modifique `bottom` e `right`.

## 📱 Responsividade

O chat se adapta automaticamente para mobile, ocupando a tela toda em dispositivos pequenos.

## 🔒 Segurança

- As mensagens não são armazenadas no servidor (apenas no frontend temporariamente)
- Adicione validação de entrada se conectar com um backend real
- Proteja suas chaves de API usando variáveis de ambiente

## 🐛 Troubleshooting

- **Chat não aparece?** Verifique se está na página autenticada (após login)
- **Respostas não funcionam?** Verifique o console para erros
- **CSS não carrega?** Certifique-se que `ChatSupport.css` está no mesmo diretório que `ChatSupport.jsx`

## 📝 Próximas Melhorias

- [ ] Persistência de histórico (localStorage)
- [ ] Upload de imagens
- [ ] Categorias/tags de tickets
- [ ] Integração com backend para tickets reais
- [ ] Tipagem com TypeScript
- [ ] Testes unitários

---

**Desenvolvido com ❤️ para DevBank**
