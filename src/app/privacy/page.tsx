import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[var(--color-navy-dark)] mb-8">מדיניות פרטיות</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
          <p className="text-sm text-gray-500">עדכון אחרון: פברואר 2026</p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">1. מידע שאנו אוספים</h2>
          <p>במסגרת השירות, אנו אוספים את המידע הבא:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li><strong>פרטים אישיים:</strong> שם מלא, כתובת אימייל, מספר טלפון</li>
            <li><strong>פרטי התביעה:</strong> תיאור המקרה, סכומים, תאריכים, פרטי הנתבע</li>
            <li><strong>מסמכים:</strong> ראיות, קבלות, צילומי מסך שתעלו</li>
            <li><strong>נתוני שימוש:</strong> אינטראקציה עם הצ&apos;אט, זמני שימוש</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">2. שימוש במידע</h2>
          <p>המידע משמש אותנו אך ורק למטרות הבאות:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>הכנת כתב תביעה ומסמכים משפטיים</li>
            <li>העברת המידע לעורך דין לצורך בדיקה ואישור</li>
            <li>תקשורת עמך בנוגע לתביעה</li>
            <li>שיפור השירות שלנו</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">3. אבטחת מידע</h2>
          <p>
            אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלך, לרבות הצפנת נתונים בהעברה (HTTPS),
            אחסון מאובטח בשרתים, והגבלת גישה למידע לצוות המורשה בלבד.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">4. שיתוף מידע</h2>
          <p>
            <strong>לא נשתף את המידע שלך עם צדדים שלישיים</strong>, למעט:
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>עורך דין מוסמך הבודק את התביעה שלך</li>
            <li>בית המשפט - במסגרת הגשת התביעה (על דעתך)</li>
            <li>כנדרש על פי חוק</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">5. שמירת מידע</h2>
          <p>
            נשמור את המידע שלך למשך תקופה סבירה הנדרשת לצורך מתן השירות ובהתאם לדרישות החוק.
            לאחר מכן, המידע יימחק או יעבור אנונימיזציה.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">6. זכויותיך</h2>
          <p>בהתאם לחוק הגנת הפרטיות, תשמ&quot;א-1981, עומדות לך הזכויות הבאות:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>לעיין במידע שנאסף עליך</li>
            <li>לבקש תיקון מידע שגוי</li>
            <li>לבקש מחיקת המידע שלך</li>
            <li>להתנגד לשימוש במידע למטרות שיווקיות</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">7. שימוש ב-AI</h2>
          <p>
            הפלטפורמה משתמשת בבינה מלאכותית (AI) לצורך עיבוד המידע שלך וסיוע בהכנת מסמכים.
            המידע מעובד באמצעות שירותי ענן מאובטחים. השיחות עם ה-AI אינן מהוות ייעוץ משפטי.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-navy-dark)] mt-8">8. יצירת קשר</h2>
          <p>
            לשאלות בנוגע למדיניות הפרטיות או לבקשות הנוגעות למידע שלך,
            ניתן לפנות אלינו דרך <a href="/contact" className="text-[var(--color-primary)] hover:underline">דף יצירת הקשר</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
