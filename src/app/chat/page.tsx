"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState, useCallback } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import type { Id } from "../../../convex/_generated/dataModel";

export default function ChatPage() {
  const { user, isLoaded } = useUser();
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [ready, setReady] = useState(false);

  const getOrCreateUser = useMutation(api.users.getOrCreate);
  const createConversation = useMutation(api.conversations.create);

  // Sync user when they authenticate (inline or pre-existing)
  const syncUser = useCallback(async () => {
    if (!user) return null;
    const uid = await getOrCreateUser({
      clerkId: user.id,
      phone: user.primaryPhoneNumber?.phoneNumber || "",
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "משתמש",
      email: user.primaryEmailAddress?.emailAddress,
    });
    setUserId(uid);
    return uid;
  }, [user, getOrCreateUser]);

  useEffect(() => {
    if (!isLoaded) return;

    const init = async () => {
      if (user) {
        // Already authenticated - create user + conversation
        const uid = await syncUser();
        if (uid) {
          const convId = await createConversation({ userId: uid });
          setConversationId(convId);
        }
      }
      // If not authenticated, we still show the chat (anonymous mode)
      setReady(true);
    };

    init();
  }, [isLoaded, user]);

  if (!isLoaded || !ready) {
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
      isAuthenticated={!!user}
      onAuthenticated={async () => {
        // Called after inline phone verification
        // Need to wait for Clerk to update, then sync
        // Small delay to let Clerk session propagate
        setTimeout(async () => {
          window.location.reload();
        }, 500);
      }}
    />
  );
}
