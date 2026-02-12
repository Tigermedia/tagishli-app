import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { hebrewClerkLocalization } from "@/lib/clerk-localization";
import "./globals.css";

export const metadata: Metadata = {
  title: "תגישלי - הגשת תביעות קטנות בעזרת AI",
  description:
    "הגישו תביעות קטנות בקלות עם עוזר AI שיחתי. ספרו את הסיפור שלכם, ואנחנו נכין את התביעה.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap"
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
