"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

interface Props {
  conversationId: Id<"conversations">;
  userId: Id<"users">;
}

export function ChatInterface({ conversationId, userId }: Props) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messages = useQuery(api.messages.getByConversation, { conversationId });
  const chat = useAction(api.ai.chat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");
    setIsTyping(true);
    setIsFirstMessage(false);

    try {
      await chat({ conversationId, userMessage: text });
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--color-navy-dark)]">
      {/* Header */}
      <header className="flex-shrink-0 bg-[var(--color-navy-dark)]/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
                <span className="material-icons-outlined text-white text-lg">smart_toy</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--color-navy-dark)] rounded-full" />
            </div>
            <div>
              <h1 className="text-white font-medium text-sm">היועץ של תגיש לי</h1>
              <p className="text-gray-400 text-xs">מחובר כעת - מופעל ע&quot;י AI</p>
            </div>
          </div>
          <a href="/dashboard" className="text-gray-500 hover:text-gray-300 transition-colors">
            <span className="material-icons-outlined">dashboard</span>
          </a>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome */}
          {isFirstMessage && (!messages || messages.length === 0) && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
                <span className="material-icons-outlined text-white text-4xl">smart_toy</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">שלום! אני היועץ המשפטי שלך</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                ספרו לי בקצרה מה קרה, ואני אעזור לכם להכין תביעה מקצועית.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  "הזמנתי מוצר שלא הגיע",
                  "קיבלתי הודעות ספאם",
                  "המוסך לא תיקן כמו שצריך",
                  "קיבלתי תביעה נגדי",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages?.map((msg) => (
            <ChatMessage key={msg._id} role={msg.role} content={msg.content} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-[var(--color-navy-dark)]/60 backdrop-blur-md border-t border-white/5 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="הקלידו תשובה..."
              disabled={isTyping}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pl-14 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition disabled:opacity-50"
              dir="rtl"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] rounded-lg text-[var(--color-navy-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-icons-outlined text-sm">send</span>
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-2">
            *המערכת מסייעת בניסוח בלבד ואינה מהווה ייעוץ משפטי
          </p>
        </div>
      </div>
    </div>
  );
}
