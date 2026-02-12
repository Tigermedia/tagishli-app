"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DashboardPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("tagishli_user");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setIsAuth(true);
        setEmail(data.email || "");
      } catch {
        // Not authenticated
      }
    }
  }, []);

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-light)]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold mb-2">צריך להתחבר</h2>
          <p className="text-gray-500 mb-6">התחילו שיחה עם העוזר הדיגיטלי כדי להתחבר</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-[var(--color-navy-dark)] rounded-xl hover:bg-[var(--color-primary)] transition"
          >
            💬 התחילו שיחה
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-navy-dark)]">⚖️ התביעות שלי</h1>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <Link
            href="/chat"
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-l from-[var(--color-primary)] to-blue-600 rounded-lg hover:opacity-90 transition"
          >
            + תביעה חדשה
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">אין תביעות עדיין</h2>
          <p className="text-gray-500 mb-6">
            התחילו שיחה עם העוזר המשפטי כדי ליצור את התביעה הראשונה שלכם
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-[var(--color-navy-dark)] rounded-xl hover:bg-[var(--color-primary)] transition"
          >
            💬 התחילו שיחה
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
