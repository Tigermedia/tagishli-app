"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const faqs = [
  {
    category: "כללי",
    questions: [
      { q: "מה זה תגיש לי?", a: "תגיש לי היא פלטפורמה דיגיטלית שמאפשרת לכל אדם להגיש תביעה קטנה בבית המשפט - בלי ידע משפטי ובלי עורך דין. אנחנו משתמשים בבינה מלאכותית מתקדמת כדי לנסח כתב תביעה מקצועי, ועורך דין בודק כל מסמך לפני ההגשה." },
      { q: "האם השירות מחליף עורך דין?", a: "לא. השירות מסייע בניסוח והגשה טכנית של תביעות קטנות. אנחנו לא מספקים ייעוץ משפטי ולא מייצגים בבית המשפט. בתביעות קטנות בישראל, אין צורך בייצוג עורך דין." },
      { q: "מי יכול להשתמש בשירות?", a: "כל אזרח ישראלי מעל גיל 18 יכול להשתמש בשירות. השירות מתאים לאנשים פרטיים ובעלי עסקים קטנים." },
    ],
  },
  {
    category: "התהליך",
    questions: [
      { q: "כמה זמן לוקח להכין תביעה?", a: "התהליך לוקח בממוצע 15-25 דקות, תלוי במורכבות המקרה. פשוט משוחחים עם הבוט שלנו, עונים על שאלות, ומקבלים כתב תביעה מוכן." },
      { q: "איך עובד הבוט?", a: "הבוט שואל אתכם שאלות פשוטות בעברית על המקרה שלכם - מה קרה, מתי, מי הנתבע, כמה אתם רוצים לתבוע. בסוף השיחה, המערכת מנסחת כתב תביעה מקצועי." },
      { q: "מה קורה אחרי שהתביעה מוכנה?", a: "עורך דין מטעמנו בודק את המסמך, אנחנו מגישים את התביעה לבית המשפט, משלמים את האגרה, ומעבירים לכם אישור עם מספר התיק." },
      { q: "האם אני צריך להופיע בבית המשפט?", a: "כן. אנחנו מטפלים בניסוח וההגשה, אבל את הדיון עצמו אתם צריכים לנהל. בתביעות קטנות אין ייצוג עורכי דין." },
    ],
  },
  {
    category: "תשלום",
    questions: [
      { q: "כמה עולה השירות?", a: "השירות עולה ₪450 + מע\"מ, תשלום חד פעמי. המחיר כולל ניסוח AI, בדיקת עו\"ד, ואגרת פתיחת תיק (עד סכום מסוים). אין עמלות נסתרות ואין אחוזים מהזכייה." },
      { q: "מה אם התביעה לא הוגשה?", a: "אם מסיבה כלשהי התביעה לא הוגשה בפועל, תקבלו החזר כספי מלא. אנחנו לוקחים את הסיכון." },
      { q: "אילו אמצעי תשלום מקבלים?", a: "כרטיסי אשראי (ויזה, מאסטרקארד), Apple Pay, Google Pay, והעברה בנקאית." },
    ],
  },
  {
    category: "משפטי",
    questions: [
      { q: "מה הסכום המקסימלי לתביעה קטנה?", a: "נכון ל-2026, הסכום המקסימלי לתביעה קטנה בישראל הוא ₪38,900." },
      { q: "האם AI יכול לנסח מסמך משפטי?", a: "ה-AI שלנו אומן על אלפי כתבי תביעה ופסקי דין. בנוסף, כל מסמך עובר בדיקה של עורך דין מוסמך. השילוב מבטיח מסמך מקצועי ומדויק." },
      { q: "מה עם פרטיות המידע שלי?", a: "כל המידע מוצפן בסטנדרט SSL מחמיר, מאוחסן בשרתים מאובטחים, ואינו משותף עם צדדים שלישיים. אנחנו עומדים בדרישות פרטיות מחמירות." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-right"
      >
        <span className="font-medium text-[var(--color-navy-dark)] text-base">{q}</span>
        <span className={`material-icons-outlined text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-0">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />

      <section className="bg-[var(--color-navy-dark)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            שאלות <span className="text-gradient-gold">נפוצות</span>
          </h1>
          <p className="text-lg text-gray-300">כל מה שצריך לדעת על תגיש לי</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          {faqs.map((cat) => (
            <div key={cat.category} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h2 className="font-bold text-lg text-[var(--color-navy-dark)]">{cat.category}</h2>
              </div>
              <div className="px-6">
                {cat.questions.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[var(--color-navy-dark)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">לא מצאתם תשובה?</h2>
          <p className="text-gray-300 mb-8">צרו איתנו קשר ונשמח לעזור</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy-dark)] font-bold rounded-xl hover:bg-[var(--color-gold-hover)] transition-all">
              צור קשר
            </Link>
            <Link href="/chat" className="px-8 py-4 border border-gray-600 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
              שוחח עם הבוט
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
