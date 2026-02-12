"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState, useCallback } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import type { Id } from "../../../convex/_generated/dataModel";

export default function ChatPage() {
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  const createConversation = useMutation(api.conversations.create);

  useEffect(() => {
    // Check if user is already verified (from localStorage)
    const stored = localStorage.getItem("tagishli_user");
    if (stored) {
      try {
        const { userId: storedUserId } = JSON.parse(stored);
        setUserId(storedUserId as Id<"users">);
        setIsAuthenticated(true);

        // Create conversation for authenticated user
        createConversation({ userId: storedUserId as Id<"users"> }).then((convId) => {
          setConversationId(convId);
        });
      } catch {
        localStorage.removeItem("tagishli_user");
      }
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy-dark)]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">מכין את היועץ המשפטי...</p>
        </div>
      </div>
    );
  }

  return (
    <ChatInterface
      conversationId={conversationId}
      userId={userId}
      isAuthenticated={isAuthenticated}
      onAuthenticated={() => {
        // Auth state already saved in localStorage by EmailVerification
        // No reload needed - messages are preserved
        const stored = localStorage.getItem("tagishli_user");
        if (stored) {
          try {
            const { userId: storedUserId } = JSON.parse(stored);
            setUserId(storedUserId as Id<"users">);
            setIsAuthenticated(true);
          } catch { /* ignore */ }
        }
      }}
    />
  );
}
