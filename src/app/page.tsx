import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const claimTypes = [
  {
    icon: "📱",
    title: "תביעת ספאם",
    description: "קיבלתם הודעות פרסום לא רצויות? הגישו תביעה בקלות",
  },
  {
    icon: "⚖️",
    title: "תביעה קטנה",
    description: "חוב, שירות לקוי, או נזק - נכין את התביעה ביחד",
  },
  {
    icon: "🚗",
    title: "רכב וביטוח",
    description: "בעיות עם מוסך או חברת ביטוח? אנחנו כאן",
  },
  {
    icon: "🛡️",
    title: "כתב הגנה",
    description: "קיבלתם תביעה? נעזור לכם להכין כתב הגנה",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">
            ⚖️ תגישלי
          </h1>
          <div className="flex gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition"
              >
                התחברות
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-light)] hover:bg-blue-600 rounded-lg transition"
              >
                הרשמה
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/chat"
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-light)] hover:bg-blue-600 rounded-lg transition"
              >
                התחילו שיחה
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition"
              >
                התביעות שלי
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-6 leading-tight">
          הגישו תביעה קטנה
          <br />
          <span className="bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] bg-clip-text text-transparent">
            בעזרת AI
          </span>
        </h2>
        <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
          ספרו את הסיפור שלכם בשיחה פשוטה, ואנחנו נכין תביעה משפטית מקצועית
          תוך דקות. בלי טפסים מסובכים, בלי ידע משפטי.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] rounded-xl hover:opacity-90 transition shadow-lg"
        >
          💬 התחילו שיחה עם העוזר המשפטי
        </Link>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">איך זה עובד?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "ספרו את הסיפור",
              desc: "שוחחו עם העוזר המשפטי שלנו בשפה פשוטה - כמו שיחה עם חבר",
            },
            {
              step: "2",
              title: "קבלו טיוטת תביעה",
              desc: "ה-AI מנתח את המידע ויוצר מסמך תביעה מקצועי עם סעיפי חוק רלוונטיים",
            },
            {
              step: "3",
              title: "הגישו לבית המשפט",
              desc: "עיברו על הטיוטה, ערכו במידת הצורך, והורידו PDF מוכן להגשה",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[var(--color-surface)] rounded-2xl p-8 text-center shadow-sm border border-[var(--color-border)]"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] flex items-center justify-center text-white font-bold text-lg">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-[var(--color-text-secondary)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Claim types */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">
          סוגי תביעות שאנחנו מטפלים בהם
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {claimTypes.map((type) => (
            <div
              key={type.title}
              className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-sm border border-[var(--color-border)] hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{type.title}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-l from-[var(--color-ai-gradient-from)] to-[var(--color-ai-gradient-to)] rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">מוכנים להגיש תביעה?</h3>
          <p className="text-lg mb-8 opacity-90">
            התביעה הראשונה שלכם - בחינם. בלי כרטיס אשראי.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-[var(--color-primary)] bg-white rounded-xl hover:bg-gray-100 transition"
          >
            הרשמו עכשיו - חינם
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-[var(--color-text-secondary)]">
          <p className="mb-2">
            ⚠️ תגישלי הוא כלי עזר טכנולוגי בלבד ואינו מהווה תחליף לייעוץ
            משפטי מקצועי.
          </p>
          <p>© {new Date().getFullYear()} תגישלי. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
