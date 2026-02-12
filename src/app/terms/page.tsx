import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[var(--color-navy-dark)] mb-8">תנאי שימוש</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
          <p className="text-sm text-gray-500">עדכון אחרון: פברואר 2026</p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">1. כללי</h2>
          <p>
            תגיש לי (&quot;הפלטפורמה&quot;) היא שירות מקוון לסיוע בהגשת תביעות קטנות בבית המשפט בישראל.
            השימוש בפלטפורמה כפוף לתנאים המפורטים להלן. בשימוש בפלטפורמה, אתה מסכים לתנאים אלה.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">2. מהות השירות</h2>
          <p>
            <strong>הפלטפורמה מספקת מידע משפטי כללי בלבד ואינה מהווה ייעוץ משפטי.</strong>
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>השירות כולל איסוף מידע, ארגון עובדות, וסיוע בהכנת מסמכים לתביעה קטנה</li>
            <li>כל תביעה נבדקת ומאושרת על ידי עורך דין מוסמך לפני הגשה</li>
            <li>הפלטפורמה אינה מתחייבת לתוצאות כלשהן של ההליך המשפטי</li>
            <li>המידע המוצג באתר הוא כללי ואינו מותאם למקרה הספציפי שלך</li>
            <li>הפלטפורמה אינה מהווה תחליף לייעוץ משפטי מקצועי</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">3. זכאות לשימוש</h2>
          <p>
            השירות מיועד לאנשים פרטיים בלבד (לא לתאגידים או חברות) המעוניינים להגיש תביעה קטנה
            בבית המשפט בישראל, עד לתקרה הקבועה בחוק (39,900 ₪ נכון ל-2025/2026).
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">4. אחריות המשתמש</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>לספק מידע מדויק ואמיתי</li>
            <li>לוודא שהתביעה לא התיישנה (בהתאם לסוג התביעה)</li>
            <li>לשלם את אגרת בית המשפט הנדרשת (בנפרד מעלות השירות)</li>
            <li>להתייצב לדיון בבית המשפט</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">5. מחירים ותשלום</h2>
          <p>
            עלות השירות: 450 ₪ (כולל מע&quot;מ). העלות כוללת סיוע בהכנת כתב תביעה ובדיקת עורך דין.
            אגרת בית המשפט (1% מסכום התביעה, מינימום 50 ₪) אינה כלולה ומשולמת ישירות לבית המשפט.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">6. ביטול עסקה</h2>
          <p>
            ניתן לבטל את השירות תוך 14 יום מיום הרכישה, בתנאי שטרם הוגשה התביעה לבית המשפט,
            בהתאם לחוק הגנת הצרכן. לאחר הגשה לבית המשפט, לא ניתן לבטל.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">7. הגבלת אחריות</h2>
          <p>
            הפלטפורמה אינה אחראית לתוצאות ההליך המשפטי. אנו מסייעים בהכנה וארגון המידע בלבד.
            ההחלטה להגיש תביעה היא של המשתמש בלבד, ומומלץ להתייעץ עם עורך דין בכל מקרה של ספק.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">8. שינויים בתנאים</h2>
          <p>
            אנו שומרים לעצמנו את הזכות לעדכן תנאים אלה מעת לעת. שינויים ייכנסו לתוקף עם פרסומם באתר.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">9. יצירת קשר</h2>
          <p>
            לשאלות בנוגע לתנאי השימוש, ניתן לפנות אלינו דרך <a href="/contact" className="text-[var(--color-primary)] hover:underline">דף יצירת הקשר</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
