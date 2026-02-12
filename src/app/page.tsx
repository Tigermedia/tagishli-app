import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroChat } from "@/components/chat/HeroChat";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text)] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-[var(--color-navy-dark)]">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#C5A059", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-5 text-center lg:text-right mb-12 lg:mb-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-medium mb-6">
                <span className="ml-2 w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse-gold" />
                חדש: עזרה בהכנת תביעה קטנה בליווי AI
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                התביעה שלך <br />
                <span className="text-gradient-gold">מתחילה כאן.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                פלטפורמה לסיוע בהגשת תביעות קטנות. ללא צורך בידע משפטי
                מוקדם, בליווי טכנולוגיה חכמה ובדיקת עורך דין מוסמך. מהיר, פשוט והוגן.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-[var(--color-navy-dark)] bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]"
                >
                  התחל עכשיו
                  <span className="material-icons-outlined mr-2">arrow_back</span>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  איך זה עובד?
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="material-icons-outlined text-[var(--color-gold)] text-lg">verified_user</span>
                  מאובטח ומוצפן
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons-outlined text-[var(--color-gold)] text-lg">gavel</span>
                  בדיקת עו&quot;ד
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="lg:col-span-7 relative">
              <HeroChat />
              
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm font-medium text-gray-400 mb-6">
            גופים שסיקרו אותנו ומשתפים פעולה
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { icon: "article", name: "כלכליסט" },
              { icon: "feed", name: "גלובס" },
              { icon: "gavel", name: "לשכת עורכי הדין" },
              { icon: "tv", name: "החדשות" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <span className="material-icons-outlined">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[var(--color-bg-light)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy-dark)] mb-4">
              תהליך פשוט, חכם ומהיר
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              אנחנו הופכים את הבירוקרטיה המשפטית לתהליך דיגיטלי נגיש ב-4 שלבים פשוטים.
            </p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200 -z-0 mx-16" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {[
                { icon: "chat", title: "1. שיחה עם הבוט", desc: "עונים על מספר שאלות פשוטות בשפה טבעית. ה-AI שלנו מבין את המקרה שלך.", color: "text-[var(--color-primary)]", hoverBorder: "group-hover:border-[var(--color-primary)]" },
                { icon: "description", title: "2. בניית כתב תביעה", desc: "המערכת מייצרת מסמך משפטי מקצועי ומנומק, מוכן להגשה, בהתבסס על המידע.", color: "text-[var(--color-gold)]", hoverBorder: "group-hover:border-[var(--color-gold)]" },
                { icon: "fact_check", title: "3. בדיקת עו\"ד", desc: "עורך דין מטעמנו עובר על המסמכים כדי לוודא דיוק מקסימלי לפני ההגשה.", color: "text-[var(--color-primary)]", hoverBorder: "group-hover:border-[var(--color-primary)]" },
                { icon: "account_balance", title: "4. הגשה לבית המשפט", desc: "אנחנו מגישים את התביעה באופן מקוון לבית המשפט. הטיפול עובר לידיך לדיון.", color: "text-[var(--color-gold)]", hoverBorder: "group-hover:border-[var(--color-gold)]" },
              ].map((step) => (
                <div key={step.title} className="group text-center">
                  <div className={`w-24 h-24 mx-auto bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm ${step.hoverBorder} group-hover:shadow-lg transition-all duration-300`}>
                    <span className={`material-icons-outlined text-4xl ${step.color} group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-navy-dark)] mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy-dark)] mb-6">
                למה לבחור ב<span className="text-[var(--color-primary)]">תגיש לי</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                רוב האנשים מוותרים על זכויותיהם כי הם חוששים מההליך המשפטי. אנחנו משנים את המשוואה עם טכנולוגיה.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "psychology", title: "ניסוח משפטי מדויק", desc: "המערכת משתמשת במאגר של אלפי פסקי דין כדי לנסח את הטיעונים הטובים ביותר למקרה שלך.", iconBg: "bg-[var(--color-gold)]/20", iconColor: "text-[var(--color-gold)]" },
                  { icon: "savings", title: "חיסכון אדיר בעלויות", desc: "במקום לשלם אלפי שקלים לעורך דין, קבל שירות מקצועי במחיר קבוע ושקוף.", iconBg: "bg-[var(--color-primary)]/20", iconColor: "text-[var(--color-primary)]" },
                  { icon: "speed", title: "מהירות שיא", desc: "התהליך אצלנו לוקח בממוצע 20 דקות. מכל מקום, בכל זמן.", iconBg: "bg-gray-200", iconColor: "text-gray-600" },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 rounded-xl hover:bg-[var(--color-bg-light)] transition-colors cursor-default">
                    <div className={`flex-shrink-0 w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center`}>
                      <span className={`material-icons-outlined ${feature.iconColor} text-2xl`}>{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--color-navy-dark)]">{feature.title}</h4>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Preview Card */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">case_file_preview.pdf</span>
                </div>
                <div className="space-y-3 opacity-60">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                  <div className="h-20 bg-gray-100 rounded w-full border border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-400">חתימה דיגיטלית מאושרת</span>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-6 -left-6 bg-[var(--color-gold)] text-[var(--color-navy-dark)] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
                  <span className="material-icons-outlined text-2xl">stars</span>
                  <div>
                    <p className="font-bold text-sm">מוכן להגשה</p>
                    <p className="text-xs opacity-80">בדיוק לפי התקנות</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[var(--color-primary)]/10 to-transparent rounded-full -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[var(--color-bg-light)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-navy-dark)] mb-3">מחיר פשוט ושקוף</h2>
            <p className="text-gray-500">הכל כלול. אין עמלות נסתרות, אין אחוזים מהזכייה.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              הכי משתלם
            </div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--color-navy-dark)] mb-2">חבילת הגשה מלאה</h3>
                <p className="text-gray-500 mb-6 text-sm">אנחנו דואגים להכל, מהניסוח ועד קבלת מספר התיק.</p>
                <ul className="space-y-4">
                  {[
                    'ניסוח כתב תביעה ע"י AI',
                    'בדיקה ואישור ע"י עורך דין',
                    "אגרת פתיחת תיק כלולה (עד סכום מסוים)",
                    "תמיכה בוואטסאפ לאורך התהליך",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm md:text-base text-gray-700">
                      <span className="material-icons-outlined text-green-500">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-auto bg-[var(--color-bg-light)] p-6 rounded-2xl text-center min-w-[250px]">
                <p className="text-gray-500 text-sm mb-1">תשלום חד פעמי</p>
                <div className="text-5xl font-bold text-[var(--color-navy-dark)] mb-1">₪450</div>
                <p className="text-gray-400 text-xs mb-6">+ מע&quot;מ</p>
                <Link
                  href="/chat"
                  className="block w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] text-[var(--color-navy-dark)] font-bold py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 text-center"
                >
                  התחל תביעה עכשיו
                </Link>
                <p className="text-xs text-gray-400 mt-4">החזר כספי מלא במידה ולא הוגש</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-[var(--color-navy-dark)] mb-12">
            מה אומרים הלקוחות?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "הייתי סקפטי בהתחלה לגבי AI ומשפטים, אבל הניסוח היה כל כך מקצועי שהנתבע העדיף להתפשר עוד לפני הדיון. שירות מדהים.", name: "רון לוי", type: "תביעת צרכנות, תל אביב" },
              { quote: "פשוט הצלתם לי 3000 שקל. התהליך היה כל כך פשוט, כמו להתכתב בוואטסאפ. ממליצה בחום לכל מי שמפחד מבירוקרטיה.", name: "דנה כהן", type: "תביעת נזיקין, חיפה" },
              { quote: "המהירות שבה הכל קרה הפתיעה אותי. תוך יומיים התביעה כבר הייתה במערכת 'נט המשפט'. תודה על השירות!", name: "יוסי ב.", type: "תביעת ספק, ראשון לציון" },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-[var(--color-bg-light)] p-8 rounded-2xl relative">
                <span className="material-icons-outlined text-4xl text-[var(--color-primary)]/20 absolute top-4 left-4">
                  format_quote
                </span>
                <p className="text-gray-600 mb-6 relative z-10 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="material-icons-outlined text-gray-500 text-sm">person</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-navy-dark)] text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">{testimonial.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Chat Button */}
      <Link
        href="/chat"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-3 bg-[var(--color-primary)] hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-105 group"
      >
        <span className="font-bold hidden group-hover:block transition-all pl-2">התחל צ&apos;אט</span>
        <span className="material-icons-outlined">chat</span>
      </Link>
    </div>
  );
}
