import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "צור קשר - תגיש לי",
  description: "צרו איתנו קשר לשאלות על תביעות קטנות, השירות שלנו, או כל נושא אחר.",
};
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <Navbar />

      <section className="bg-[var(--color-navy-dark)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            <span className="text-gradient-gold">צרו קשר</span>
          </h1>
          <p className="text-lg text-gray-300">נשמח לעזור בכל שאלה</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-navy-dark)] mb-8">דרכי התקשרות</h2>
              <div className="space-y-6">
                {[
                  { icon: "chat", title: "וואטסאפ", desc: "הדרך המהירה ביותר ליצור קשר", value: "דברו איתנו בוואטסאפ", action: "שלח הודעה" },
                  { icon: "email", title: "אימייל", desc: "לפניות כלליות ושאלות", value: "info@tagishli.co.il", action: "שלח אימייל" },
                  { icon: "phone", title: "טלפון", desc: "ימים א'-ה' 09:00-18:00", value: "צרו קשר בטופס", action: "התקשר" },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center">
                      <span className="material-icons-outlined text-[var(--color-gold)] text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--color-navy-dark)]">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">{item.desc}</p>
                      <p className="text-sm font-medium text-[var(--color-primary)]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[var(--color-navy-dark)] mb-2">שעות פעילות</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between"><span>ראשון - חמישי</span><span>09:00 - 18:00</span></div>
                  <div className="flex justify-between"><span>שישי</span><span>09:00 - 13:00</span></div>
                  <div className="flex justify-between text-gray-400"><span>שבת</span><span>סגור</span></div>
                </div>
                <p className="text-xs text-gray-400 mt-3">* הבוט שלנו זמין 24/7</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-navy-dark)] mb-8">שלחו הודעה</h2>
              <form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
                  <input id="contact-name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition" placeholder="הזינו שם מלא" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
                  <input id="contact-phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition" placeholder="05X-XXX-XXXX" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                  <input id="contact-email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition" placeholder="email@example.com" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">נושא</label>
                  <select id="contact-subject" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition bg-white">
                    <option>שאלה כללית</option>
                    <option>בעיה טכנית</option>
                    <option>שאלה על תהליך ההגשה</option>
                    <option>החזר כספי</option>
                    <option>שיתוף פעולה עסקי</option>
                    <option>אחר</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">הודעה</label>
                  <textarea id="contact-message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition resize-none" placeholder="כתבו את ההודעה שלכם..." />
                </div>
                <button type="submit" className="w-full bg-[var(--color-navy-dark)] text-white font-bold py-4 rounded-xl hover:bg-[var(--color-primary)] transition-colors">
                  שלח הודעה
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
