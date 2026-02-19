"use client";

import { useState, useRef, useEffect } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { EmailVerification } from "./EmailVerification";
import { CompanySearch } from "./CompanySearch";

interface CompanyData {
  name: string;
  number: string;
  type: string;
  status: string;
  city: string;
  street: string;
  houseNumber: string;
}

interface LocalMessage {
  id: string;
  role: string;
  content: string;
  timestamp: number;
}

const VERIFY_AFTER_MESSAGES = 4;

export function HeroChat() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [showVerification, setShowVerification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [started, setStarted] = useState(false);
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [sessionId] = useState(() => `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chat = useAction(api.ai.chat);
  const anonymousChat = useAction(api.ai.anonymousChat);
  const createConversation = useMutation(api.conversations.create);
  const saveBatch = useMutation(api.messages.saveBatch);
  const upsertChatLog = useMutation(api.chatLogs.upsert);

  useEffect(() => {
    // Scroll only within the chat container, not the page
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
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

    const now = Date.now();

    if (isAuthenticated && conversationId) {
      try {
        const newUserMsg: LocalMessage = { id: `user-${now}`, role: "user", content: text, timestamp: now };
        setLocalMessages((prev) => [...prev, newUserMsg]);
        const response = await chat({ conversationId, userMessage: text });
        const aiTime = Date.now();
        setLocalMessages((prev) => [...prev, { id: `ai-${aiTime}`, role: "assistant", content: response, timestamp: aiTime }]);
        // Show company search if AI asks about the defendant company
        if (shouldShowCompanySearch(response)) {
          setTimeout(() => setShowCompanySearch(true), 300);
        }
      } catch (error) {
        console.error("Chat error:", error);
      }
    } else {
      const newUserMsg: LocalMessage = { id: `user-${now}`, role: "user", content: text, timestamp: now };
      setLocalMessages((prev) => [...prev, newUserMsg]);
      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);

      try {
        const history = localMessages.map((m) => ({ role: m.role, content: m.content }));
        const aiResponse = await anonymousChat({ history, userMessage: text });
        const aiTime = Date.now();

        const updatedMessages = [...localMessages, newUserMsg, { id: `ai-${aiTime}`, role: "assistant", content: aiResponse, timestamp: aiTime }];
        setLocalMessages((prev) => [
          ...prev,
          { id: `ai-${aiTime}`, role: "assistant", content: aiResponse, timestamp: aiTime },
        ]);

        // Show company search if AI asks about the defendant
        if (shouldShowCompanySearch(aiResponse)) {
          setTimeout(() => setShowCompanySearch(true), 300);
        }

        // Save chat log after every exchange
        try {
          await upsertChatLog({
            sessionId,
            messages: updatedMessages.map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
          });
        } catch (e) {
          console.error("Failed to save chat log:", e);
        }

        if (newCount >= VERIFY_AFTER_MESSAGES) {
          setTimeout(() => setShowVerification(true), 500);
        }
      } catch (error) {
        console.error("Anonymous chat error:", error);
        setLocalMessages((prev) => [
          ...prev,
          { id: `ai-${Date.now()}`, role: "assistant", content: "מצטער, נתקלתי בבעיה טכנית. אנא נסו שוב.", timestamp: Date.now() },
        ]);
      }
    }

    setIsTyping(false);
    inputRef.current?.focus();
  };

  const shouldShowCompanySearch = (text: string): boolean => {
    if (selectedCompany) return false;
    const triggers = [
      "נגד מי", "שם החברה", "שם העסק", "נגד איזו חברה", "שם הנתבע",
      "מי הצד השני", "נגד מי התביעה", "מה שם", "את מי", "ממי הזמנת",
      "איזו חברה", "מאיזו חברה", "באיזה חנות", "מאיזה עסק", "מי הספק",
      "נגד מי רוצה", "שם הנתבע"
    ];
    return triggers.some((t) => text.includes(t));
  };

  const handleCompanySelect = (company: CompanyData) => {
    setSelectedCompany(company);
    setShowCompanySearch(false);
    // Build comprehensive message with all details from the registry
    const parts = [company.name];
    if (company.number) parts.push(`ח.פ. ${company.number}`);
    if (company.status) parts.push(`סטטוס: ${company.status}`);
    const address = [company.street, company.houseNumber, company.city].filter(Boolean).join(" ");
    if (address) parts.push(`כתובת: ${address}`);
    // Send as structured data so AI knows it has all defendant details
    const msg = `[נבחרה חברה מרשם החברות]\nשם: ${company.name}\nח.פ.: ${company.number}\nכתובת: ${address || "לא צוינה ברשם"}\nסטטוס: ${company.status || "לא ידוע"}\nסוג: ${company.type || "חברה"}`;
    sendMessage(msg);
  };

  const handleCompanyManual = (name: string) => {
    setShowCompanySearch(false);
    sendMessage(name);
  };

  const handleSend = () => sendMessage(input.trim());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-[var(--color-navy-dark)] rounded-t-2xl border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
              <span className="material-icons-outlined text-white text-lg">smart_toy</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--color-navy-dark)] rounded-full" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">העוזר של תגיש לי</h3>
            <p className="text-gray-400 text-xs">מחובר כעת - מופעל ע&quot;י AI</p>
          </div>
        </div>
        <span className="material-icons-outlined text-gray-500">more_vert</span>
      </div>

      {/* Chat Body */}
      <div ref={chatBodyRef} className="p-4 sm:p-6 h-[50dvh] sm:h-[420px] overflow-y-auto space-y-4 bg-gray-50 scrollbar-hide">
        {/* Welcome state */}
        {!started && localMessages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-1">ספרו לי בקצרה מה קרה, או בחרו נושא:</p>
            <p className="text-gray-400 text-[10px] mb-4">⚠️ מידע כללי בלבד - אינו מהווה ייעוץ משפטי. כל תביעה נבדקת ע&quot;י עו&quot;ד מוסמך.</p>
            <div className="flex flex-wrap gap-2 justify-center max-h-[200px] overflow-y-auto scrollbar-hide px-2">
              {[
                "הזמנתי מוצר שלא הגיע",
                "חברת תעופה ביטלה/עיכבה טיסה",
                "המוסך לא תיקן כמו שצריך",
                "בעל הבית לא מחזיר פיקדון",
                "חויבתי על שירות שלא קיבלתי",
                "קבלן שיפוצים לא סיים עבודה",
                "ביטוח מסרב לשלם תביעה",
                "קיבלתי הודעות ספאם",
                "שכן גורם למטרדים",
                "קיבלתי תביעה נגדי",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="px-3 py-2 text-xs bg-white border border-gray-200 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 rounded-lg text-gray-700 transition-colors shadow-sm"
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
                ? "bg-[var(--color-navy-dark)] text-white rounded-2xl rounded-tr-none shadow-md"
                : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none shadow-sm"
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Company search */}
        {showCompanySearch && (
          <CompanySearch
            onSelect={handleCompanySelect}
            onManualEntry={handleCompanyManual}
          />
        )}

        {/* Email verification */}
        {showVerification && !isAuthenticated && (
          <EmailVerification
            onVerified={async (verifiedUserId) => {
              setIsAuthenticated(true);
              setShowVerification(false);
              // Mark chat log as converted
              try {
                await upsertChatLog({
                  sessionId,
                  messages: localMessages.map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
                  converted: true,
                });
              } catch (e) { console.error("Log update error:", e); }
              try {
                const convId = await createConversation({ userId: verifiedUserId });
                setConversationId(convId);
                if (localMessages.length > 0) {
                  await saveBatch({
                    conversationId: convId,
                    messages: localMessages.map((m) => ({
                      role: m.role,
                      content: m.content,
                    })),
                  });
                }
                // Auto-continue: send a continuation prompt to AI
                setIsTyping(true);
                const continueResponse = await chat({
                  conversationId: convId,
                  userMessage: "[המשתמש אימת את האימייל שלו בהצלחה. המשך לשאול אותו את השאלה הבאה בתהליך - שאלה אחת בלבד]",
                });
                setLocalMessages((prev) => [
                  ...prev,
                  { id: `ai-continue-${Date.now()}`, role: "assistant", content: continueResponse, timestamp: Date.now() },
                ]);
                setIsTyping(false);
              } catch (err) {
                console.error("Post-auth setup error:", err);
                setIsTyping(false);
              }
              inputRef.current?.focus();
            }}
          />
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex-shrink-0 flex items-center justify-center">
              <span className="material-icons-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
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

      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={showVerification && !isAuthenticated ? "אמתו את האימייל כדי להמשיך..." : "הקלידו תשובה..."}
            disabled={isTyping || (showVerification && !isAuthenticated)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-14 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 transition disabled:opacity-50"
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
