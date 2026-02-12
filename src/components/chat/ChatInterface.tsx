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

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="flex-shrink-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] flex items-center justify-center text-white text-lg">
            ⚖️
          </div>
          <div>
            <h1 className="font-semibold text-[var(--color-text)]">
              עו״ד דיגיטלי
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)]">
              העוזר המשפטי של תגישלי
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message if no messages yet */}
          {isFirstMessage && (!messages || messages.length === 0) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚖️</div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
                שלום! אני העוזר המשפטי שלך
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                ספרו לי על מה אתם רוצים לתבוע, ואני אעזור לכם להכין תביעה
                מקצועית.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  "קיבלתי הודעות ספאם",
                  "המוסך לא תיקן כמו שצריך",
                  "חברה חייבת לי כסף",
                  "קיבלתי תביעה נגדי",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="px-4 py-2 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full hover:border-[var(--color-primary-light)] hover:text-[var(--color-primary-light)] transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          {messages?.map((msg) => (
            <ChatMessage key={msg._id} role={msg.role} content={msg.content} />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="כתבו את ההודעה שלכם..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-[var(--color-primary-light)] focus:bg-white focus:outline-none transition text-right"
            dir="rtl"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-xl bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            שלח
          </button>
        </div>
        <p className="max-w-3xl mx-auto text-center text-xs text-[var(--color-text-secondary)] mt-2">
          ⚠️ כלי עזר טכנולוגי בלבד. אינו מהווה ייעוץ משפטי.
        </p>
      </div>
    </div>
  );
}
