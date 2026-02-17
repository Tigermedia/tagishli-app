"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { EmailVerification } from "./EmailVerification";

interface LocalMessage {
  id: string;
  role: string;
  content: string;
}

interface Props {
  conversationId: Id<"conversations"> | null;
  userId: Id<"users"> | null;
  isAuthenticated: boolean;
  onAuthenticated: () => void;
}

// Number of messages before triggering verification
const VERIFY_AFTER_MESSAGES = 8;

export function ChatInterface({
  conversationId,
  userId,
  isAuthenticated,
  onAuthenticated,
}: Props) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only query Convex when authenticated and have a conversationId
  const dbMessages = useQuery(
    api.messages.getByConversation,
    conversationId ? { conversationId } : "skip"
  );
  const chat = useAction(api.ai.chat);
  const anonymousChat = useAction(api.ai.anonymousChat);
  const saveBatchMut = useMutation(api.messages.saveBatch);
  const createConvMut = useMutation(api.conversations.create);

  const messages = conversationId ? dbMessages : undefined;
  const displayMessages = isAuthenticated && messages
    ? messages.map((m) => ({ id: m._id, role: m.role, content: m.content }))
    : localMessages;

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [displayMessages, isTyping, showVerification]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");
    setIsTyping(true);

    if (isAuthenticated && conversationId) {
      // Authenticated mode - use Convex
      try {
        await chat({ conversationId, userMessage: text });
      } catch (error) {
        console.error("Chat error:", error);
      }
    } else {
      // Anonymous mode - use Gemini AI directly
      const newUserMsg: LocalMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };
      const updatedMessages = [...localMessages, newUserMsg];
      setLocalMessages(updatedMessages);
      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);

      try {
        const history = localMessages.map((m) => ({ role: m.role, content: m.content }));
        const aiResponse = await anonymousChat({ history, userMessage: text });

        setLocalMessages((prev) => [
          ...prev,
          { id: `ai-${Date.now()}`, role: "assistant", content: aiResponse },
        ]);

        // Trigger verification after enough messages
        if (newCount >= VERIFY_AFTER_MESSAGES) {
          setTimeout(() => setShowVerification(true), 500);
        }
      } catch (error) {
        console.error("Anonymous chat error:", error);
        setLocalMessages((prev) => [
          ...prev,
          { id: `ai-${Date.now()}`, role: "assistant", content: "מצטער, נתקלתי בבעיה טכנית. אנא נסו שוב." },
        ]);
      }
    }

    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    setTimeout(() => {
      setInput("");
      handleSendText(text);
    }, 50);
  };

  const handleSendText = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setInput("");
    setIsTyping(true);

    if (isAuthenticated && conversationId) {
      try {
        await chat({ conversationId, userMessage: text });
      } catch (error) {
        console.error("Chat error:", error);
      }
    } else {
      const newUserMsg: LocalMessage = { id: `user-${Date.now()}`, role: "user", content: text };
      const updated = [...localMessages, newUserMsg];
      setLocalMessages(updated);
      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);

      try {
        const history = localMessages.map((m) => ({ role: m.role, content: m.content }));
        const aiResponse = await anonymousChat({ history, userMessage: text });
        setLocalMessages((prev) => [...prev, { id: `ai-${Date.now()}`, role: "assistant", content: aiResponse }]);
        if (newCount >= VERIFY_AFTER_MESSAGES) {
          setTimeout(() => setShowVerification(true), 500);
        }
      } catch (error) {
        console.error("Anonymous chat error:", error);
        setLocalMessages((prev) => [...prev, { id: `ai-${Date.now()}`, role: "assistant", content: "מצטער, נתקלתי בבעיה טכנית. אנא נסו שוב." }]);
      }
    }

    setIsTyping(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white md:bg-[var(--color-navy-dark)] overflow-x-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-[var(--color-navy-dark)]/80 backdrop-blur-md border-b border-gray-200 md:border-white/5 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
                <span className="material-icons-outlined text-white text-lg">smart_toy</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--color-navy-dark)] rounded-full" />
            </div>
            <div>
              <h1 className="text-white font-medium text-sm">העוזר של תגיש לי</h1>
              <p className="text-gray-400 text-xs">מחובר כעת - מופעל ע&quot;י AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <a href="/dashboard" className="text-gray-500 hover:text-gray-300 transition-colors">
                <span className="material-icons-outlined text-sm">dashboard</span>
              </a>
            )}
            <a href="/" className="text-gray-500 hover:text-gray-300 transition-colors">
              <span className="material-icons-outlined text-sm">home</span>
            </a>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={chatBodyRef} className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide bg-gray-50 md:bg-transparent">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome */}
          {displayMessages.length === 0 && !showVerification && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
                <span className="material-icons-outlined text-white text-4xl">smart_toy</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 md:text-white mb-2 px-2">שלום! אני העוזר הדיגיטלי שלך</h2>
              <p className="text-gray-500 md:text-gray-400 mb-8 max-w-md mx-auto px-4">
                ספרו לי בקצרה מה קרה, ואני אעזור לכם להכין תביעה מקצועית. אין צורך להתחבר - נתחיל ישר.
              </p>
              <div className="flex flex-wrap gap-3 justify-center px-2">
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
                    onClick={() => handleSuggestion(suggestion)}
                    className="px-3 py-2 text-xs md:text-sm md:px-4 bg-white md:bg-white/5 border border-gray-200 md:border-white/10 rounded-lg md:rounded-full text-gray-700 md:text-gray-300 hover:border-[var(--color-gold)] md:hover:bg-white/10 md:hover:text-white transition-colors shadow-sm md:shadow-none"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {displayMessages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {/* Inline Email Verification */}
          {showVerification && !isAuthenticated && (
            <EmailVerification
              onVerified={async (verifiedUserId) => {
                try {
                  const convId = await createConvMut({ userId: verifiedUserId });
                  if (localMessages.length > 0) {
                    await saveBatchMut({
                      conversationId: convId,
                      messages: localMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                      })),
                    });
                  }
                  // Auto-continue: ask AI to continue with next question
                  setIsTyping(true);
                  if (true) {
                    const continueResponse = await chat({
                      conversationId: convId,
                      userMessage: "[המשתמש אימת את האימייל שלו בהצלחה. המשך לשאול אותו את השאלה הבאה בתהליך - שאלה אחת בלבד]",
                    });
                    setLocalMessages((prev) => [
                      ...prev,
                      { id: `ai-continue-${Date.now()}`, role: "assistant", content: continueResponse },
                    ]);
                  }
                  setIsTyping(false);
                } catch (err) {
                  console.error("Post-auth error:", err);
                  setIsTyping(false);
                }
                setShowVerification(false);
                onAuthenticated();
              }}
            />
          )}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white md:bg-[var(--color-navy-dark)]/60 backdrop-blur-md border-t border-gray-100 md:border-white/5 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={showVerification && !isAuthenticated ? "אמתו את הטלפון כדי להמשיך..." : "הקלידו תשובה..."}
              disabled={isTyping || (showVerification && !isAuthenticated)}
              className="w-full bg-gray-50 md:bg-white/10 border border-gray-200 md:border-white/10 rounded-xl px-4 py-3 pl-14 text-sm text-gray-900 md:text-white placeholder-gray-400 md:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 md:focus:ring-[var(--color-primary)]/50 transition disabled:opacity-50"
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
          <p className="text-center text-xs text-gray-400 md:text-gray-600 mt-2">
            *המערכת מסייעת בניסוח בלבד ואינה מהווה ייעוץ משפטי
          </p>
        </div>
      </div>
    </div>
  );
}
