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
              <li><a href="#" className="hover:text-white transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a></li>
              <li><a href="#" className="hover:text-white transition-colors">הצהרת נגישות</a></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 border border-gray-700 rounded-lg p-2">
              <span className="material-icons-outlined">lock</span>
              <span>מאובטח בסטנדרט SSL מחמיר</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 תגיש לי בע&quot;מ. כל הזכויות שמורות.</p>
          <p className="mt-2 md:mt-0 text-center md:text-right max-w-xl">
            *השירות אינו מהווה ייעוץ משפטי ותחליף לייצוג ע&quot;י עורך דין בבית המשפט. המערכת מסייעת בניסוח והגשה טכנית בלבד.
          </p>
        </div>
      </div>
    </footer>
  );
}
