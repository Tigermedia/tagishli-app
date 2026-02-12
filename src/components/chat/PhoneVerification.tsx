"use client";

import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/nextjs";

type VerificationStep = "phone" | "code" | "verified";

interface Props {
  onVerified: () => void;
  onPhoneCollected: (phone: string) => void;
}

export function PhoneVerification({ onVerified, onPhoneCollected }: Props) {
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const [step, setStep] = useState<VerificationStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatPhone = (input: string): string => {
    // Convert Israeli format to E.164
    let cleaned = input.replace(/[\s\-()]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "+972" + cleaned.slice(1);
    }
    if (!cleaned.startsWith("+")) {
      cleaned = "+972" + cleaned;
    }
    return cleaned;
  };

  const handleSendCode = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setError("");

    const formattedPhone = formatPhone(phone);
    onPhoneCollected(formattedPhone);

    try {
      // Try sign-up first (new user)
      if (signUp) {
        await signUp.create({ phoneNumber: formattedPhone });
        await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
        setStep("code");
      }
    } catch (err: unknown) {
      // If user already exists, try sign-in
      const clerkError = err as { errors?: Array<{ code?: string }> };
      if (
        clerkError?.errors?.[0]?.code === "form_identifier_exists"
      ) {
        try {
          if (signIn) {
            const result = await signIn.create({
              identifier: formattedPhone,
              strategy: "phone_code",
            });
            // For sign-in, prepareFirstFactor sends the code
            if (result.status === "needs_first_factor") {
              await signIn.prepareFirstFactor({
                strategy: "phone_code",
                phoneNumberId: result.supportedFirstFactors?.find(
                  (f: { strategy: string }) => f.strategy === "phone_code"
                )?.phoneNumberId || "",
              });
            }
            setStep("code");
          }
        } catch (signInErr) {
          console.error("Sign-in error:", signInErr);
          setError("שגיאה בשליחת הקוד. נסו שוב.");
        }
      } else {
        console.error("Sign-up error:", err);
        setError("שגיאה בשליחת הקוד. בדקו את מספר הטלפון.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length < 6) return;
    setLoading(true);
    setError("");

    try {
      // Try sign-up verification first
      if (signUp && signUp.status !== null) {
        try {
          const result = await signUp.attemptPhoneNumberVerification({ code });
          if (result.status === "complete" && result.createdSessionId) {
            await setSignUpActive!({ session: result.createdSessionId });
            setStep("verified");
            onVerified();
            return;
          }
        } catch {
          // Fall through to sign-in attempt
        }
      }

      // Try sign-in verification
      if (signIn) {
        const result = await signIn.attemptFirstFactor({
          strategy: "phone_code",
          code,
        });
        if (result.status === "complete" && result.createdSessionId) {
          await setSignInActive!({ session: result.createdSessionId });
          setStep("verified");
          onVerified();
          return;
        }
      }

      setError("קוד שגוי. נסו שוב.");
    } catch (err) {
      console.error("Verification error:", err);
      setError("קוד שגוי. נסו שוב.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "verified") return null;

  if (step === "phone") {
    return (
      <div className="flex items-start gap-3 message-enter">
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex-shrink-0 flex items-center justify-center">
          <span className="material-icons-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
          <p className="text-gray-200 text-sm leading-relaxed mb-3">
            מצוין! אספתי מספיק מידע כדי להתחיל לנסח את התביעה. כדי לשמור את התביעה שלך, אני צריך לאמת את מספר הטלפון שלך. 📱
          </p>
          <div className="flex gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="050-123-4567"
              dir="ltr"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
              onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
            />
            <button
              onClick={handleSendCode}
              disabled={loading || !phone.trim()}
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
          שלחתי קוד אימות ל-{phone}. הזינו את הקוד בן 6 הספרות: ✉️
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
