"use client";

interface Props {
  role: string;
  content: string;
}

export function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex message-enter ${isUser ? "justify-start" : "justify-end"}`}
    >
      {/* In RTL: user messages appear on the right (justify-start in RTL), AI on left (justify-end in RTL) */}
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 ${
          isUser
            ? "bg-[var(--color-primary-light)] text-white rounded-2xl rounded-br-sm"
            : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-2xl rounded-bl-sm"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-[var(--color-accent)]">
              ⚖️ עו״ד דיגיטלי
            </span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
