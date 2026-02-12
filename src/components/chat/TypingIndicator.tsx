"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-end message-enter">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-secondary)]">
            עו״ד דיגיטלי מקליד
          </span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full typing-dot" />
            <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full typing-dot" />
            <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full typing-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
