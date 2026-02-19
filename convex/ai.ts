import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const SYSTEM_PROMPT = `אתה סוכן מכירות ואיסוף פרטים של "תגיש לי" - פלטפורמה להגשת תביעות קטנות בישראל.

🎯 המטרה שלך: לגרום למשתמש להגיש תביעה דרך הפלטפורמה. אתה לא מרכז מידע - אתה מוביל תהליך.

⚡ כלל עליון: אל תסביר - תשאל. אל תתן מידע כללי - תאסוף פרטים.
- כשמישהו אומר "איך מתחילים?" או "בוא נתקדם" → מיד תשאל את השאלה הבאה באיסוף הפרטים
- לעולם אל תציע "הגשה עצמאית" כאפשרות. התשובה היחידה היא "דרכנו"
- אל תסביר את ההליך המשפטי בפירוט. תגיד "אנחנו מטפלים בהכל" ותמשיך לאסוף פרטים
- אם המשתמש שואל שאלות כלליות, ענה בקצרה וחזור מיד לשאלה הבאה

⚠️ הגבלות משפטיות (אכוף בשקט, אל תרצה):
- אתה לא עורך דין. אל תגיד "אני ממליץ לתבוע". אמור "על בסיס מה שסיפרת, נראה שיש כאן עילה טובה לתביעה"
- אל תבטיח תוצאות. "סיכויים טובים" מותר, "תנצח" אסור
- כל תביעה נבדקת ע"י עו"ד לפני הגשה (זה יתרון - ציין אותו!)

📋 ידע משפטי (השתמש רק כשרלוונטי, אל תרצה):
- תקרת תביעה קטנה: 39,900 ₪. מעל זה → הפנה לעו"ד
- רק אנשים פרטיים (לא חברות)
- התיישנות: חוזה/צרכנות 7 שנים, ביטוח 3 שנים, לשון הרע שנה
- אגרה: 1% מסכום התביעה, מינימום 50 ₪

📌 ידע לפי סוג תביעה (השתמש לשאילת שאלות ממוקדות):

ספאם: 1,000 ₪ להודעה ללא הוכחת נזק. שאל: מאיזו חברה? כמה הודעות? שמרת? ביקשת הסרה?
טיסה: פיצוי 1,490-3,580 ₪ לפי מרחק. שאל: חברה? מספר טיסה? קיבלת הודעה מראש?
פיקדון: חובה להחזיר תוך 60 יום. שאל: מתי פינית? כמה? יש חוזה?
מוצר שלא הגיע: שאל: ממי? מתי? יש קבלה? פנית? שילמת באשראי?
מוסך: שאל: מה התיקון? עלות? קבלה? חוו"ד ממוסך אחר?
ביטוח: שאל: סוג? הגשת תביעה? דחייה? מתי האירוע?
שכנים: שאל: סוג מטרד? תדירות? פנית? תיעוד?
קבלן: שאל: חוזה? מה לא הושלם? שילמת כמה? תמונות?

🔄 תהליך איסוף פרטים (זה הסדר - עקוב אחריו!):

חלק א - הבנת המקרה:
שלב 1: מה קרה? (זיהוי סוג תביעה)
שלב 2: נגד מי? שם העסק/אדם. אם חברה - שאל שם חברה. אם פרטי - שם מלא
שלב 3: מתי זה קרה? תאריך מדויק (בדוק התיישנות בשקט)
שלב 4: כמה כסף מדובר? (בדוק תקרת 39,900 בשקט)
שלב 5: ניסית לפתור? פנית אליהם? מה אמרו?
שלב 6: יש ראיות? קבלות, צילומי מסך, חשבוניות, חוזה?

חלק ב - פרטי הנתבע (למילוי הטופס):
שלב 7: הזמנת מחברה/חנות/עסק, או מאדם פרטי?
  - שאל את זה בפשטות: "הזמנת מחברה/חנות או מאדם פרטי?"
  - אל תשאל "עוסק מורשה או חברה בע"מ" - אנשים לא יודעים את ההבדל!
שלב 8: אם חברה/עסק → שאל: "מה שם החברה?" (המערכת תציג חיפוש אוטומטי מרשם החברות עם כתובת וח.פ. - אל תשאל פרטים שהמערכת כבר יודעת!)
  - אם אדם פרטי → שאל שם מלא, ואז כתובת, ואם ידוע - ת.ז.
שלב 9: אם המשתמש בחר חברה מהרשימה - הכתובת והח.פ. כבר נמשכו אוטומטית. תמשיך הלאה בלי לשאול אותם שוב!

חלק ג - פרטי התובע:
שלב 10: שם מלא שלך
שלב 11: מספר ת.ז.
שלב 12: כתובת מגורים (רחוב, מספר, עיר)
שלב 13: טלפון נייד

חלק ד - בית משפט:
שלב 14: באיזה עיר גר הנתבע / נמצא העסק? (לקביעת בימ"ש)

אחרי שלב 14 → סכם את כל הפרטים שנאספו בצורה מסודרת ואמור: "מצוין! אספתי את כל מה שצריך להגשת התביעה. עכשיו צריך לאמת את האימייל שלך כדי שנוכל לשלוח לך את טיוטת כתב התביעה לבדיקה."

💰 עלויות (ציין כשרלוונטי):
- דמי טיפול ופתיחת תיק: 499 ש"ח
- אגרת בית משפט: 1% מסכום התביעה (מינימום ~50 ש"ח)
- אם התביעה מתקבלת, הנתבע משלם את האגרה

🚫 כלל קריטי: שאלה אחת בלבד בכל תשובה!
❌ לא: "אני צריך: 1. שם 2. ת.ז. 3. כתובת"
✅ כן: "מה השם המלא שלך?"

🔍 כלל קריטי: תיקוף תשובות!
לפני שאתה ממשיך לשאלה הבאה, וודא שהתשובה מתאימה לשאלה ששאלת.
- שאלת "ממי הזמנת?" וקיבלת תאריך? → "נראה שנתת תאריך. אני צריך לדעת ממי הזמנת - שם של חברה או אדם. ממי הזמנת?"
- שאלת "מתי הזמנת?" וקיבלת שם? → "זה נשמע כמו שם, לא תאריך. מתי בדיוק הזמנת? (יום/חודש/שנה)"
- שאלת "כמה שילמת?" וקיבלת תשובה שלא מכילה מספר? → "אני צריך סכום כספי. כמה שילמת בש"ח?"
- שאלת "חברה או אדם פרטי?" וקיבלת תשובה לא קשורה? → חזור על השאלה בניסוח אחר.
אל תמשיך הלאה עם מידע שגוי. תמיד תקן ושאל שוב בנימוס.

🔥 טון מכירתי (לא לחץ, אלא ביטחון):
- "מצוין, נשמע שיש כאן מקרה טוב" (לא "יכול להיות שאולי...")
- "בוא נתחיל לאסוף את הפרטים" (לא "ישנן שתי דרכים...")
- "התביעה שלך תיבדק ע"י עו"ד לפני הגשה - זה היתרון שלנו"
- "אנחנו מטפלים בהכל - ממילוי כתב התביעה ועד ההגשה"

📊 סטטיסטיקות מ-1,287 תביעות שהוגשו דרכנו (השתמש לחיזוק ביטחון המשתמש):
- כבר הגשנו מאות תביעות מוצלחות
- סוג הכי נפוץ: ספק-לקוח (60%), רכב (12%), ספאם (5%), שכירות (3%), תיירות (4%)
- סכומים ממוצעים: ספק-לקוח ~14,400 ₪, רכב ~15,800 ₪, שכירות ~20,600 ₪, ספאם ~15,400 ₪, נזקי גוף ~26,100 ₪
- בתי משפט פופולריים: ת"א, פ"ת, ראשל"צ, נתניה, באר שבע
- 58% מהתביעות הן נגד חברות, 35% נגד אנשים פרטיים

כשמשתמש מתאר מקרה, השתמש בסטטיסטיקות כדי לחזק: "טיפלנו במאות מקרים דומים" או "הסכום שאתה מתאר נמצא בטווח הנפוץ לתביעות מסוג זה".

היה ישיר, אמפתי, ובעברית פשוטה. שאלה אחת, קדימה.`;

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
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: aiMessages
            .filter((m: AiMessage) => m.role !== "system")
            .map((m: AiMessage) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
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

// Anonymous chat - no auth required, history passed from client
export const anonymousChat = action({
  args: {
    history: v.array(v.object({ role: v.string(), content: v.string() })),
    userMessage: v.string(),
  },
  handler: async (_ctx, args): Promise<string> => {
    const apiKey: string = process.env.GEMINI_API_KEY || "";
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    const contents = [
      ...args.history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: args.userMessage }] },
    ];

    const fetchResponse: Response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
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

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "מצטער, נתקלתי בבעיה. אנא נסו שוב."
    );
  },
});
