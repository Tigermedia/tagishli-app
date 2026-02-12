"use client";

import { useState, useRef, useEffect } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { EmailVerification } from "./EmailVerification";

interface LocalMessage {
  id: string;
  role: string;
  content: string;
}

const VERIFY_AFTER_MESSAGES = 6;

export function HeroChat() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [showVerification, setShowVerification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chat = useAction(api.ai.chat);
  const createConversation = useMutation(api.conversations.create);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages, isTyping, showVerification]);

  useEffect(() => {
    const stored = localStorage.getItem("tagishli_user");
    if (stored) {
      try {
        const { userId } = JSON.parse(stored);
        setIsAuthenticated(true);
        createConversation({ userId: userId as Id<"users"> }).then((convId) => {
          setConversationId(convId);
        });
      } catch { /* ignore */ }
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setInput("");
    setIsTyping(true);
    if (!started) setStarted(true);

    if (isAuthenticated && conversationId) {
      try {
        const newUserMsg: LocalMessage = { id: `user-${Date.now()}`, role: "user", content: text };
        setLocalMessages((prev) => [...prev, newUserMsg]);
        const response = await chat({ conversationId, userMessage: text });
        setLocalMessages((prev) => [...prev, { id: `ai-${Date.now()}`, role: "assistant", content: response }]);
      } catch (error) {
        console.error("Chat error:", error);
      }
    } else {
      const newUserMsg: LocalMessage = { id: `user-${Date.now()}`, role: "user", content: text };
      setLocalMessages((prev) => [...prev, newUserMsg]);
      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);

      await new Promise((r) => setTimeout(r, 1500));

      let aiResponse: string;
      if (newCount === 1) aiResponse = "הבנתי. אני רוצה להבין טוב יותר את המקרה שלך. מי הצד השני? (שם החברה או האדם שאתה רוצה לתבוע)";
      else if (newCount === 2) aiResponse = "תודה. מתי זה קרה? (תאריך משוער)";
      else if (newCount === 3) aiResponse = "וכמה אתה רוצה לתבוע? (סכום בשקלים)";
      else if (newCount >= VERIFY_AFTER_MESSAGES - 2) {
        aiResponse = "מצוין! אספתי מספיק מידע להתחיל לנסח את התביעה. עכשיו אני צריך לאמת את זהותך כדי לשמור הכל.";
        setTimeout(() => setShowVerification(true), 500);
      } else aiResponse = "תודה על המידע. יש לך ראיות או מסמכים שקשורים למקרה? (קבלות, צילומי מסך, התכתבויות)";

      setLocalMessages((prev) => [...prev, { id: `ai-${Date.now()}`, role: "assistant", content: aiResponse }]);
    }

    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleSend = () => sendMessage(input.trim());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative bg-[#0a1628] backdrop-blur-xl border-2 border-[var(--color-gold)]/30 rounded-2xl shadow-[0_0_60px_rgba(197,160,89,0.15),0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#060f1d] border-b border-[var(--color-gold)]/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
              <span className="material-icons-outlined text-white text-lg">smart_toy</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--color-navy-dark)] rounded-full" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">היועץ של תגיש לי</h3>
            <p className="text-gray-400 text-xs">מחובר כעת - מופעל ע&quot;י AI</p>
          </div>
        </div>
        <span className="material-icons-outlined text-gray-500">more_vert</span>
      </div>

      {/* Chat Body */}
      <div className="p-6 h-[420px] overflow-y-auto space-y-4 scrollbar-hide">
        {/* Welcome state */}
        {!started && localMessages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-300 text-sm mb-6">ספרו לי בקצרה מה קרה, או בחרו נושא:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "הזמנתי מוצר שלא הגיע",
                "קיבלתי הודעות ספאם",
                "המוסך לא תיקן כמו שצריך",
                "קיבלתי תביעה נגדי",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {localMessages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === "user" ? "bg-[var(--color-gold)]/20" : "bg-[var(--color-primary)]/20"
            }`}>
              <span className={`material-icons-outlined text-sm ${
                msg.role === "user" ? "text-[var(--color-gold)]" : "text-[var(--color-primary)]"
              }`}>
                {msg.role === "user" ? "person" : "smart_toy"}
              </span>
            </div>
            <div className={`max-w-[85%] p-4 ${
              msg.role === "user"
                ? "bg-[var(--color-primary)]/90 text-white rounded-2xl rounded-tl-none shadow-lg"
                : "bg-white/5 border border-white/10 text-gray-200 rounded-2xl rounded-tr-none"
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Email verification */}
        {showVerification && !isAuthenticated && (
          <EmailVerification
            onVerified={() => {
              setIsAuthenticated(true);
              window.location.reload();
            }}
          />
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex-shrink-0 flex items-center justify-center">
              <span className="material-icons-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-none px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">מנסח תגובה</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[var(--color-gold)] rounded-full typing-dot" />
                  <div className="w-2 h-2 bg-[var(--color-gold)] rounded-full typing-dot" />
                  <div className="w-2 h-2 bg-[var(--color-gold)] rounded-full typing-dot" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#060f1d] border-t border-[var(--color-gold)]/10">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={showVerification && !isAuthenticated ? "אמתו את האימייל כדי להמשיך..." : "הקלידו תשובה..."}
            disabled={isTyping || (showVerification && !isAuthenticated)}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pl-14 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition disabled:opacity-50"
            dir="rtl"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping || (showVerification && !isAuthenticated)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] rounded-full text-[var(--color-navy-dark)] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-md"
          >
            <span className="material-icons-outlined text-lg">arrow_back</span>
          </button>
        </div>
      </div>

      {/* Decorative blurs */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[var(--color-gold)]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
    </div>
  );
}
