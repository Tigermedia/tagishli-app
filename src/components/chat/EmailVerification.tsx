"use client";

import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

type Step = "email" | "code" | "verified";

interface Props {
  onVerified: (userId: Id<"users">) => void;
}

export function EmailVerification({ onVerified }: Props) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = useAction(api.otp.sendOTP);
  const verifyOTP = useMutation(api.otp.verifyOTP);

  const handleSendCode = async () => {
    if (!email.trim() || !email.includes("@")) {
      setError("הזינו כתובת אימייל תקינה");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const result = await sendOTP({ email: email.trim().toLowerCase() });
      if (result.success) {
        setStep("code");
      } else {
        setError(result.error || "שגיאה בשליחת הקוד");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setError("שגיאה בשליחת הקוד. נסו שוב.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length < 6) return;
    setLoading(true);
    setError("");

    try {
      const result = await verifyOTP({
        email: email.trim().toLowerCase(),
        code,
      });
      if (result.success && result.userId) {
        setStep("verified");
        // Store auth state
        localStorage.setItem("tagishli_user", JSON.stringify({
          userId: result.userId,
          email: email.trim().toLowerCase(),
        }));
        onVerified(result.userId as Id<"users">);
      } else {
        setError(result.error || "קוד שגוי");
      }
    } catch (err) {
      console.error("Verify error:", err);
      setError("שגיאה באימות. נסו שוב.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "verified") return null;

  if (step === "email") {
    return (
      <div className="flex items-start gap-3 message-enter">
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex-shrink-0 flex items-center justify-center">
          <span className="material-icons-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
          <p className="text-gray-200 text-sm leading-relaxed mb-3">
            מעולה! אספתי מספיק מידע כדי להתחיל לנסח את התביעה. כדי לשמור את התביעה שלך, צריך לאמת את כתובת האימייל שלך. 📧
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              dir="ltr"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
              onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
            />
            <button
              onClick={handleSendCode}
              disabled={loading || !email.trim()}
              className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy-dark)] font-medium text-sm rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "שלח קוד"}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  // step === "code"
  return (
    <div className="flex items-start gap-3 message-enter">
      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex-shrink-0 flex items-center justify-center">
        <span className="material-icons-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
        <p className="text-gray-200 text-sm leading-relaxed mb-3">
          שלחתי קוד אימות ל-<span className="text-[var(--color-gold)]" dir="ltr">{email}</span>. הזינו את הקוד בן 6 הספרות: ✉️
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="000000"
            dir="ltr"
            maxLength={6}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 text-center tracking-[0.5em] font-mono"
            onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
            autoFocus
          />
          <button
            onClick={handleVerifyCode}
            disabled={loading || code.length < 6}
            className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy-dark)] font-medium text-sm rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "אמת"}
          </button>
        </div>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        <button
          onClick={handleSendCode}
          className="text-xs text-gray-500 hover:text-gray-300 mt-2 transition-colors"
        >
          לא קיבלתי קוד - שלח שוב
        </button>
      </div>
    </div>
  );
}
