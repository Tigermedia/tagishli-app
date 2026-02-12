"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: "טיוטה", color: "bg-gray-100 text-gray-700" },
  review: { label: "בבדיקה", color: "bg-yellow-100 text-yellow-700" },
  submitted: { label: "הוגשה", color: "bg-blue-100 text-blue-700" },
  in_progress: { label: "בטיפול", color: "bg-purple-100 text-purple-700" },
  closed: { label: "נסגרה", color: "bg-green-100 text-green-700" },
};

const typeLabels: Record<string, string> = {
  spam: "📱 ספאם",
  small_claim: "⚖️ תביעה קטנה",
  vehicle: "🚗 רכב/ביטוח",
  defense: "🛡️ כתב הגנה",
};

export default function DashboardPage() {
  const { user } = useUser();

  // TODO: get userId from Clerk ID, then query claims
  // For now show placeholder
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--color-primary)]">
            ⚖️ התביעות שלי
          </h1>
          <Link
            href="/chat"
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] rounded-lg hover:opacity-90 transition"
          >
            + תביעה חדשה
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">אין תביעות עדיין</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            התחילו שיחה עם העוזר המשפטי כדי ליצור את התביעה הראשונה שלכם
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] rounded-xl hover:opacity-90 transition"
          >
            💬 התחילו שיחה
          </Link>
        </div>
      </main>
    </div>
  );
}
