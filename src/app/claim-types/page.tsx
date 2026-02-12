import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const claimTypes = [
  {
    id: "consumer",
    icon: "shopping_cart",
    title: "תביעת צרכנות",
    subtitle: "שירות לקוי, מוצר פגום, אי עמידה בהתחייבויות",
    description: "הזמנתם מוצר שלא הגיע? קיבלתם שירות לקוי? חברה לא עמדה בהתחייבויותיה? חוק הגנת הצרכן מגן עליכם ומאפשר לתבוע פיצוי.",
    maxAmount: "₪38,900",
    timeline: "15-20 דקות לניסוח",
    examples: ["מוצר שלא סופק", "שירות לקוי", "הפרת אחריות", "חיוב שלא כדין", "ביטול עסקה"],
    laws: ["חוק הגנת הצרכן, תשמ\"א-1981", "חוק המכר, תשכ\"ח-1968"],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "spam",
    icon: "sms_failed",
    title: "תביעת ספאם",
    subtitle: "הודעות פרסום לא רצויות - SMS, WhatsApp, אימייל",
    description: "לפי חוק הספאם, אדם שקיבל הודעות פרסום ללא הסכמה מפורשת רשאי לתבוע פיצוי של עד 1,000 ₪ לכל הודעה, ללא הוכחת נזק.",
    maxAmount: "עד ₪1,000 להודעה",
    timeline: "10-15 דקות לניסוח",
    examples: ["SMS פרסומי", "הודעות WhatsApp", "אימיילים שיווקיים", "שיחות טלמרקטינג"],
    laws: ["חוק התקשורת (בזק ושידורים), תשמ\"ב-1982, סעיף 30א"],
    color: "from-red-500 to-orange-500",
  },
  {
    id: "vehicle",
    icon: "directions_car",
    title: "תביעת רכב וביטוח",
    subtitle: "מוסכים, חברות ביטוח, תאונות, נזקי רכב",
    description: "בעיות עם מוסך שלא תיקן כראוי? חברת ביטוח שמסרבת לשלם? תאונת דרכים עם נזק לרכב? אפשר לתבוע פיצוי בתביעות קטנות.",
    maxAmount: "₪38,900",
    timeline: "20-25 דקות לניסוח",
    examples: ["תיקון לקוי במוסך", "סירוב ביטוח", "נזקי תאונה", "ירידת ערך", "אי גילוי פגם"],
    laws: ["פקודת הנזיקין", "חוק חוזה הביטוח, תשמ\"א-1981"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "defense",
    icon: "shield",
    title: "כתב הגנה",
    subtitle: "תגובה לתביעה שהוגשה נגדכם",
    description: "קיבלתם תביעה? חשוב להגיש כתב הגנה תוך 15 יום. המערכת תנתח את התביעה, תזהה נקודות חולשה ותעזור לנסח הגנה מקצועית.",
    maxAmount: "הגנה מול תביעה",
    timeline: "25-30 דקות לניסוח",
    examples: ["תגובה לתביעת צרכנות", "הגנה מול תביעת ספאם", "כתב הגנה שכנגד", "בקשה לדחייה"],
    laws: ["תקנות שיפוט בתביעות קטנות (סדרי דין), תשל\"ז-1976"],
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "wages",
    icon: "payments",
    title: "הלנת שכר",
    subtitle: "שכר שלא שולם, זכויות עובדים",
    description: "המעסיק לא שילם שכר? לא העביר תנאים סוציאליים? חוק הגנת השכר מאפשר לתבוע פיצויי הלנת שכר משמעותיים.",
    maxAmount: "₪38,900",
    timeline: "20-25 דקות לניסוח",
    examples: ["אי תשלום שכר", "הלנת שכר", "אי הפרשה לפנסיה", "פיטורין שלא כדין"],
    laws: ["חוק הגנת השכר, תשי\"ח-1958", "חוק זכויות העובד"],
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "property",
    icon: "home_repair_service",
    title: "נזקי רכוש",
    subtitle: "נזק לדירה, רכוש, שכנים",
    description: "נגרם נזק לרכוש שלכם? נזילה מהשכן? קבלן שלא סיים עבודה? תביעה קטנה היא הדרך המהירה ביותר לפיצוי.",
    maxAmount: "₪38,900",
    timeline: "20-25 דקות לניסוח",
    examples: ["נזילה מדירת שכן", "קבלן שלא סיים", "נזק לרכוש משותף", "ליקויי בנייה"],
    laws: ["פקודת הנזיקין", "חוק המקרקעין, תשכ\"ט-1969"],
    color: "from-teal-500 to-cyan-500",
  },
];

export default function ClaimTypesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[var(--color-navy-dark)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            סוגי תביעות <span className="text-gradient-gold">שאנחנו מטפלים בהם</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            המערכת שלנו מטפלת במגוון רחב של תביעות קטנות. בחרו את סוג התביעה שלכם והתחילו תוך דקות.
          </p>
        </div>
      </section>

      {/* Claim Types Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {claimTypes.map((type) => (
              <div
                key={type.id}
                id={type.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Header */}
                <div className={`bg-gradient-to-l ${type.color} p-6`}>
                  <span className="material-icons-outlined text-white text-4xl mb-3 block">
                    {type.icon}
                  </span>
                  <h3 className="text-xl font-bold text-white">{type.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{type.subtitle}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{type.description}</p>

                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="material-icons-outlined text-sm">attach_money</span>
                      {type.maxAmount}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="material-icons-outlined text-sm">schedule</span>
                      {type.timeline}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">דוגמאות:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {type.examples.map((ex) => (
                        <span key={ex} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-700 mb-1">חקיקה רלוונטית:</p>
                    {type.laws.map((law) => (
                      <p key={law} className="text-xs text-gray-500">{law}</p>
                    ))}
                  </div>

                  <Link
                    href="/chat"
                    className="block w-full text-center bg-[var(--color-navy-dark)] text-white font-medium py-3 rounded-xl hover:bg-[var(--color-primary)] transition-colors"
                  >
                    התחל תביעה
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-navy-dark)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">לא בטוחים איזה סוג תביעה מתאים?</h2>
          <p className="text-gray-300 mb-8">אין בעיה - התחילו שיחה עם הבוט שלנו והוא יזהה אוטומטית את סוג התביעה המתאים למקרה שלכם.</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy-dark)] font-bold rounded-xl hover:bg-[var(--color-gold-hover)] transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)]"
          >
            <span className="material-icons-outlined">chat</span>
            התחל שיחה עם היועץ
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
