"use client";

interface Props {
  role: string;
  content: string;
}

export function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex items-start gap-3 message-enter ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser
            ? "bg-[var(--color-gold)]/20"
            : "bg-[var(--color-primary)]/20"
        }`}
      >
        <span
          className={`material-icons-outlined text-sm ${
            isUser ? "text-[var(--color-gold)]" : "text-[var(--color-primary)]"
          }`}
        >
          {isUser ? "person" : "smart_toy"}
        </span>
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 ${
          isUser
            ? "bg-[var(--color-navy-dark)] text-white rounded-2xl rounded-tr-none shadow-md md:bg-[var(--color-primary)]/90 md:shadow-lg"
            : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none shadow-sm md:bg-white/5 md:border-white/10 md:text-gray-200 md:shadow-none"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
