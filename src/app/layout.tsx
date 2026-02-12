import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "תגיש לי - סיוע בהגשת תביעות קטנות בישראל",
    template: "%s | תגיש לי",
  },
  description:
    "פלטפורמה ישראלית לסיוע בהגשת תביעות קטנות עד 39,900 ₪. בליווי טכנולוגיה חכמה ובדיקת עורך דין מוסמך. מהיר, פשוט והוגן.",
  keywords: ["תביעות קטנות", "תביעה קטנה", "בית משפט", "ישראל", "חוק הספאם", "פיקדון שכירות", "תביעת צרכנות", "הגשת תביעה"],
  openGraph: {
    title: "תגיש לי - סיוע בהגשת תביעות קטנות בישראל",
    description: "פלטפורמה ישראלית לסיוע בהגשת תביעות קטנות עד 39,900 ₪. בליווי טכנולוגיה חכמה ובדיקת עורך דין מוסמך.",
    locale: "he_IL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&family=Manrope:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
