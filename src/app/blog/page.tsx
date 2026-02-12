import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "בלוג משפטי - תגיש לי | מידע על תביעות קטנות",
  description: "מאמרים ומדריכים על תביעות קטנות בישראל. זכויות צרכנים, חוק הספאם, פיקדון שכירות, ביטוח ועוד.",
};
import { Footer } from "@/components/layout/Footer";

const posts = [
  {
    title: "איך להגיש תביעה קטנה - מדריך מלא 2026",
    excerpt: "כל מה שצריך לדעת על הגשת תביעה קטנה בישראל: מהסכום המקסימלי ועד הדיון בבית המשפט.",
    date: "12 בפברואר 2026",
    category: "מדריכים",
    icon: "school",
  },
  {
    title: "מה עושים כשמקבלים הודעות ספאם? זכויות וחוקים",
    excerpt: "חוק הספאם מאפשר לתבוע עד 1,000 ₪ לכל הודעה. הנה איך לעשות את זה נכון.",
    date: "10 בפברואר 2026",
    category: "זכויות צרכן",
    icon: "sms_failed",
  },
  {
    title: "5 טיפים להכנה לדיון בתביעות קטנות",
    excerpt: "הגשתם תביעה? יופי. עכשיו צריך להתכונן לדיון. הנה 5 טיפים שישפרו את הסיכויים שלכם.",
    date: "8 בפברואר 2026",
    category: "טיפים",
    icon: "tips_and_updates",
  },
  {
    title: "AI ומשפטים: העתיד של הגשת תביעות",
    excerpt: "איך בינה מלאכותית משנה את עולם המשפט ומנגישה צדק לציבור הרחב.",
    date: "5 בפברואר 2026",
    category: "טכנולוגיה",
    icon: "smart_toy",
  },
  {
    title: "המוסך לא תיקן כמו שצריך? כך תתבעו",
    excerpt: "מדריך מעשי להגשת תביעה קטנה נגד מוסך - מאיסוף ראיות ועד הדיון.",
    date: "2 בפברואר 2026",
    category: "מדריכים",
    icon: "directions_car",
  },
  {
    title: "כתב הגנה: מה לעשות כשתובעים אתכם",
    excerpt: "קיבלתם תביעה? אל תיבהלו. הנה מה שצריך לדעת על הגשת כתב הגנה תוך 15 יום.",
    date: "30 בינואר 2026",
    category: "מדריכים",
    icon: "shield",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />

      <section className="bg-[var(--color-navy-dark)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            בלוג <span className="text-gradient-gold">משפטי</span>
          </h1>
          <p className="text-lg text-gray-300">מדריכים, טיפים וחדשות מעולם התביעות הקטנות</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <Link key={post.title} href={`/blog#post-${idx}`}>
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer h-full">
                  <div className="h-40 bg-gradient-to-bl from-[var(--color-navy-dark)] to-[var(--color-navy-light)] flex items-center justify-center">
                    <span className="material-icons-outlined text-white/30 text-6xl group-hover:text-white/50 transition-colors">{post.icon}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-medium">{post.category}</span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h2 className="font-bold text-[var(--color-navy-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">{post.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
