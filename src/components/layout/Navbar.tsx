"use client";

import Link from "next/link";
import { useState } from "react";
// Auth state managed via localStorage after email OTP verification

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-navy-dark)] text-white rounded-lg flex items-center justify-center font-bold text-xl">
              ת
            </div>
            <span className="font-bold text-2xl tracking-tight text-[var(--color-navy-dark)]">
              תגיש לי
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-baseline gap-1">
            <Link href="/claim-types" className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-base font-medium transition-colors">
              סוגי תביעות
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-base font-medium transition-colors">
              איך זה עובד
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-base font-medium transition-colors">
              מחיר
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-base font-medium transition-colors">
              אודות
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-base font-medium transition-colors">
              שאלות נפוצות
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-base font-medium transition-colors">
              צור קשר
            </Link>
          </div>

          {/* CTA / User */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 text-sm font-medium transition-colors"
            >
              התביעות שלי
            </Link>
            <Link
              href="/chat"
              className="bg-[var(--color-navy-dark)] text-white hover:bg-[var(--color-primary)] px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              התחל תביעה
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <span className="material-icons-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 space-y-2">
            <Link href="/claim-types" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>סוגי תביעות</Link>
            <Link href="/#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>איך זה עובד</Link>
            <Link href="/#pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>מחיר</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>אודות</Link>
            <Link href="/faq" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>שאלות נפוצות</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setMobileOpen(false)}>צור קשר</Link>
            <div className="pt-2 border-t border-gray-100">
              <Link href="/chat" className="block w-full text-center bg-[var(--color-gold)] text-[var(--color-navy-dark)] font-bold py-3 rounded-xl" onClick={() => setMobileOpen(false)}>התחל תביעה</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
