"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import type { Id } from "../../../convex/_generated/dataModel";

export default function ChatPage() {
  const { user, isLoaded } = useUser();
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  const getOrCreateUser = useMutation(api.users.getOrCreate);
  const createConversation = useMutation(api.conversations.create);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const init = async () => {
      // Sync user to Convex
      const uid = await getOrCreateUser({
        clerkId: user.id,
        phone: user.primaryPhoneNumber?.phoneNumber || "",
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "משתמש",
        email: user.primaryEmailAddress?.emailAddress,
      });
      setUserId(uid);

      // Create new conversation
      const convId = await createConversation({ userId: uid });
      setConversationId(convId);
    };

    init();
  }, [isLoaded, user]);

  if (!isLoaded || !conversationId || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[var(--color-primary-light)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">מכין את העוזר המשפטי...</p>
        </div>
      </div>
    );
  }

  return <ChatInterface conversationId={conversationId} userId={userId} />;
}
