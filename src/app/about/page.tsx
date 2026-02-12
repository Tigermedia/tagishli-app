import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[var(--color-navy-dark)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            מנגישים את <span className="text-gradient-gold">הצדק</span> לכולם
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            תגיש לי נולדה מתוך אמונה שכל אדם זכאי להגן על זכויותיו - בלי לשלם אלפי שקלים לעורך דין.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[var(--color-navy-dark)] mb-6">המשימה שלנו</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              מדי שנה, מאות אלפי ישראלים מוותרים על זכויותיהם כי הם חוששים מהמורכבות של ההליך המשפטי. עלויות גבוהות, בירוקרטיה מסובכת ואי ודאות מרתיעים אנשים מלממש את זכותם הבסיסית - גישה לצדק.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              אנחנו ב<strong>תגיש לי</strong> משלבים בינה מלאכותית מתקדמת עם מומחיות משפטית כדי להפוך את תהליך הגשת תביעות קטנות לפשוט, מהיר ונגיש לכולם.
            </p>
            <p className="text-gray-600 leading-relaxed">
              המערכת שלנו מנסחת כתבי תביעה מקצועיים, עורך דין בודק כל מסמך, ואנחנו אפילו מגישים את התביעה בשמכם. הכל בתשלום קבוע ושקוף - בלי הפתעות.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5,000+", label: "תביעות שנוסחו" },
              { value: "92%", label: "שביעות רצון" },
              { value: "20 דק'", label: "זמן ממוצע" },
              { value: "₪450", label: "מחיר קבוע" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy-dark)] mb-1">{stat.value}</div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we're different */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-[var(--color-navy-dark)] mb-12">מה מייחד אותנו</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "smart_toy", title: "AI מתקדם", desc: "המערכת מבינה את המקרה שלכם, מזהה עילות תביעה ומנסחת מסמך משפטי מקצועי - הכל בשיחה פשוטה בעברית." },
              { icon: "verified_user", title: "בדיקת עו\"ד", desc: "כל כתב תביעה עובר בדיקה של עורך דין מוסמך לפני ההגשה. אנחנו לא סומכים רק על AI." },
              { icon: "rocket_launch", title: "הגשה מלאה", desc: "אנחנו לא רק מנסחים - אנחנו מגישים את התביעה בשמכם לבית המשפט ומספקים מספר תיק." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center">
                  <span className="material-icons-outlined text-[var(--color-gold)] text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-navy-dark)] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-navy-dark)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">מוכנים להגן על הזכויות שלכם?</h2>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy-dark)] font-bold rounded-xl hover:bg-[var(--color-gold-hover)] transition-all"
          >
            התחל תביעה עכשיו
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
