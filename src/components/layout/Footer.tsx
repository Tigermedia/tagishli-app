import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy-dark)] text-white border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white text-[var(--color-navy-dark)] rounded-lg flex items-center justify-center font-bold text-xl">ת</div>
              <span className="font-bold text-2xl tracking-tight">תגיש לי</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              פלטפורמת הליגל-טק המובילה בישראל להגשת תביעות קטנות. מנגישים את הצדק לכולם באמצעות טכנולוגיה.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-[var(--color-gold)]">שירותים</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/claim-types#consumer" className="hover:text-white transition-colors">תביעות צרכנות</Link></li>
              <li><Link href="/claim-types#spam" className="hover:text-white transition-colors">תביעות ספאם</Link></li>
              <li><Link href="/claim-types#vehicle" className="hover:text-white transition-colors">נזקי רכוש</Link></li>
              <li><Link href="/claim-types#defense" className="hover:text-white transition-colors">כתב הגנה</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-[var(--color-gold)]">חברה</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">אודות</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">בלוג משפטי</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">צור קשר</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">שאלות נפוצות</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-[var(--color-gold)]">משפטי</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">הצהרת נגישות</Link></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 border border-gray-700 rounded-lg p-2">
              <span className="material-icons-outlined">lock</span>
              <span>מאובטח בסטנדרט SSL מחמיר</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 space-y-4">
          <p className="text-xs text-gray-400 text-center leading-relaxed max-w-3xl mx-auto">
            ⚖️ תגיש לי היא פלטפורמת מידע משפטי בלבד ואינה מהווה תחליף לייעוץ משפטי מקצועי. המידע המוצג באתר הוא כללי ואינו מותאם למקרה הספציפי שלך. כל תביעה נבדקת ומאושרת על ידי עורך דין מוסמך לפני הגשה. לפני קבלת החלטות משפטיות, מומלץ להתייעץ עם עורך דין.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2026 תגיש לי. כל הזכויות שמורות.</p>
            <div className="mt-2 md:mt-0 flex gap-4">
              <Link href="/terms" className="hover:text-[var(--color-gold)] transition-colors">תנאי שימוש</Link>
              <Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">מדיניות פרטיות</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
