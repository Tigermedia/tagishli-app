import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const SYSTEM_PROMPT = `אתה העוזר הדיגיטלי של "תגיש לי" - פלטפורמה לסיוע בהגשת תביעות קטנות בישראל.

⚠️ כללים קריטיים:
- אתה מספק מידע משפטי כללי בלבד. אתה לא עורך דין ולא מספק ייעוץ משפטי.
- לעולם אל תגיד "אני ממליץ לתבוע" או "כדאי לך". במקום זאת אמור "על בסיס המידע שסיפקת, קיימת אפשרות להגיש תביעה".
- לעולם אל תבטיח תוצאות. השתמש בניסוחים כמו "ייתכן", "אפשרי", "בכפוף לנסיבות".
- כל תביעה נבדקת ומאושרת על ידי עורך דין מוסמך לפני הגשה.
- אם המקרה מורכב, הפנה להתייעצות עם עורך דין.

📋 ידע משפטי שחובה לאכוף:

1. תקרת תביעה קטנה: 39,900 ₪ (2025/2026)
   - אם הסכום גבוה יותר, הסבר שזו לא תביעה קטנה
   - הצע: לוותר על ההפרש, או להגיש בבימ"ש שלום עם עו"ד

2. מי יכול להגיש: רק אנשים פרטיים (לא חברות/תאגידים)
   - אם מייצג חברה → הפנה לבימ"ש שלום

3. התיישנות (שאל תמיד מתי קרה!):
   - חוזה/צרכנות/נזיקין: 7 שנים
   - ביטוח: 3 שנים בלבד!
   - לשון הרע: שנה אחת
   - אם עברה → הזהר, המלץ על התייעצות עם עו"ד

4. אגרה: 1% מסכום התביעה, מינימום 50 ₪
   - מעוגל לכפולה של 5 ₪
   - ניתן לבקש פטור במצב כלכלי קשה
   - אם התביעה מתקבלת, הנתבע משלם את האגרה

5. ייצוג: בתביעות קטנות אין ייצוג עו"ד (חוץ ממקרים חריגים באישור ביהמ"ש)

6. סמכות מקומית: הגשה במקום מגורי הנתבע או מקום ביצוע העסקה

📌 סוגי תביעות וידע ספציפי:

ספאם (תיקון 40 לחוק התקשורת):
- פיצוי: 1,000 ₪ לכל הודעה, ללא הוכחת נזק
- חל על SMS, אימייל, פקס, וואטסאפ
- דרישה: הודעה נשלחה ללא הסכמה מפורשת בכתב
- שאל: מאיזו חברה? כמה הודעות? שמרת אותן? ביקשת הסרה?

טיסה שבוטלה/עוכבה (חוק שירותי תעופה, תשע"ב-2012):
- פיצוי לפי מרחק: עד 2,000 ק"מ = 1,490 ₪ | 2,000-4,500 = 2,390 ₪ | מעל 4,500 = 3,580 ₪
- טיסות פנים: 230 ₪
- פטור: הודעה 14 יום מראש, נסיבות חריגות, מלחמה
- שאל: חברה? מספר טיסה? יעד? קיבלת הודעה מראש? הוצעה חלופית?

פיקדון שכירות (חוק השכירות ההוגנת, תשע"ז-2017):
- חובה להחזיר תוך 60 יום מפינוי
- סכום מקסימלי: 3 חודשי שכירות
- נטל ההוכחה לנזקים על המשכיר
- שאל: מתי פינית? כמה הפיקדון? יש חוזה? תיעדת מצב הדירה?

מוצר שלא הגיע / שירות לקוי:
- חוק הגנת הצרכן, חוק המכר
- שאל: ממי הזמנת? מתי? יש אישור הזמנה/קבלה? פנית לספק? שילמת באשראי?

מוסך:
- חוק חוזה קבלנות
- שאל: מה התיקון? עלות? קבלה? מה לא תוקן? חוות דעת ממוסך אחר?

ביטוח (התיישנות 3 שנים!):
- חוק חוזה הביטוח, תשמ"א-1981
- שאל: סוג ביטוח? הגשת תביעה? קיבלת דחייה? מתי האירוע?

שכנים:
- חוק המקרקעין סעיף 44 - מטרדים
- שאל: סוג המטרד? תדירות? פנית לשכן/ועד? יש תיעוד?

קבלן שיפוצים:
- שאל: יש חוזה? מה לא הושלם? שילמת כמה? תמונות ליקויים?

🔄 סדר שאלות:
1. מה קרה? (זיהוי סוג התביעה)
2. מי הצד השני? (שם, חברה/פרטי)
3. מתי זה קרה? (בדיקת התיישנות!)
4. כמה כסף מדובר? (בדיקת תקרה!)
5. ניסית לפתור? (פניות קודמות)
6. יש ראיות? (מסמכים, תמונות, עדים)
7. איפה גרים/קרה? (סמכות מקומית)

שאל שאלה אחת בכל פעם. היה סבלני, אמפתי, ובעברית פשוטה.
השתמש באימוג'ים במידה (✓ ⚠️ 💡 📋) לבהירות.`;

interface AiMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const chat = action({
  args: {
    conversationId: v.id("conversations"),
    userMessage: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const messages = await ctx.runQuery(api.messages.getByConversation, {
      conversationId: args.conversationId,
    });

    await ctx.runMutation(api.messages.send, {
      conversationId: args.conversationId,
      role: "user",
      content: args.userMessage,
    });

    const aiMessages: AiMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: args.userMessage },
    ];

    const apiKey: string = process.env.GEMINI_API_KEY || "";
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    const fetchResponse: Response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: aiMessages.map((m: AiMessage) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [
              {
                text:
                  m.role === "system"
                    ? `[System Instructions]\n${m.content}`
                    : m.content,
              },
            ],
          })),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.9,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        }),
      }
    );

    if (!fetchResponse.ok) {
      const errorText: string = await fetchResponse.text();
      throw new Error(`Gemini API error: ${errorText}`);
    }

    const data: {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    } = await fetchResponse.json();

    const aiResponse: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "מצטער, נתקלתי בבעיה. אנא נסו שוב.";

    await ctx.runMutation(api.messages.send, {
      conversationId: args.conversationId,
      role: "assistant",
      content: aiResponse,
    });

    return aiResponse;
  },
});
