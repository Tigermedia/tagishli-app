import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { hebrewClerkLocalization } from "@/lib/clerk-localization";
import "./globals.css";

export const metadata: Metadata = {
  title: "תגיש לי - הגשת תביעות קטנות בעזרת AI",
  description:
    "פלטפורמה משפטית חכמה לניהול תביעות קטנות. ללא צורך בידע משפטי מוקדם, בליווי בינה מלאכותית ובדיקת מומחים.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
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
        <ClerkProvider localization={hebrewClerkLocalization}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
