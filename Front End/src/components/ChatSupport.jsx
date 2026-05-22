import React, { useState, useRef, useEffect } from "react";
import { supportService } from "../services/supportService";
import "./ChatSupport.css";

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    supportService.getInitialMessage(),
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll para mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Chama o serviço de IA
      const response = await supportService.sendMessage(inputValue);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage = {
        id: Date.now(),
        text: "Desculpa, ocorreu um erro. Tente de novo! 😅",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Sugestões rápidas
  const quickSuggestions = [
    "Como bloquear meu cartão?",
    "Como fazer um PIX?",
    "Qual meu saldo?",
    "Como aumentar meu limite?",
  ];

  const handleQuickSuggestion = async (suggestion) => {
    // Adiciona a sugestão como mensagem
    const userMessage = {
      id: Date.now(),
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await supportService.sendMessage(suggestion);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          className="chat-support-btn"
          onClick={() => setIsOpen(true)}
          title="Abrir suporte"
        >
          <i className="bi bi-chat-dots"></i>
          <span className="chat-badge">SAC</span>
        </button>
      )}

      {/* Janela do chat */}
      {isOpen && (
        <div className="chat-support-container">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-title">
              <i className="bi bi-robot"></i>
              <div>
                <span>Suporte DevBank</span>
                <p className="chat-status">Assistente IA Online</p>
              </div>
            </div>
            <button
              className="chat-close-btn"
              onClick={handleClose}
              title="Fechar chat"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Mensagens */}
          <div className="chat-messages">
            {messages.length === 1 && !isLoading && (
              <div className="chat-suggestions">
                <p>Dúvidas comuns:</p>
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="suggestion-btn"
                    onClick={() => handleQuickSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === "user" ? "user-message" : "ai-message"}`}
              >
                {msg.sender === "ai" && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">{msg.text}</div>
                {msg.sender === "user" && (
                  <div className="message-avatar">👤</div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="message ai-message">
                <div className="message-avatar">🤖</div>
                <div className="message-content loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="chat-input"
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="chat-send-btn"
              title="Enviar"
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
