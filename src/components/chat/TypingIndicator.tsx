"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 message-enter">
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
  );
}
