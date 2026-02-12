import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const SYSTEM_PROMPT = `אתה עוזר משפטי AI בשם "עו"ד דיגיטלי" באתר תגישלי.
תפקידך לעזור למשתמשים להגיש תביעות משפטיות קטנות בישראל.

הנחיות:
1. דבר בעברית פשוטה, ברורה וידידותית
2. היה סבלני ואמפתי - המשתמש עשוי להיות מתוסכל
3. שאל שאלה אחת בכל פעם - אל תציף את המשתמש
4. כשאתה מזהה את סוג התביעה, אמור זאת בבירור
5. אסוף את כל המידע הדרוש לפני שתציע ליצור טיוטה
6. הצע לחפש מידע (ח.פ., כתובות) כשרלוונטי
7. ציין תמיד שאתה כלי עזר בלבד ולא תחליף לייעוץ משפטי

סוגי תביעות שאתה מטפל בהם:
- ספאם (הודעות פרסום לא רצויות) - חוק התקשורת (בזק ושידורים)
- תביעה קטנה כללית (חובות, שירות לקוי, נזק)
- רכב/ביטוח (מוסכים, חברות ביטוח, נזקי רכב)
- כתב הגנה (תגובה לתביעה שהוגשה נגד המשתמש)

מידע שעליך לאסוף (בהתאם לסוג):
- שם הנתבע המלא
- מספר ח.פ. / ע.מ. של הנתבע
- כתובת הנתבע
- תיאור האירוע/הבעיה
- תאריכים רלוונטיים
- סכום התביעה המבוקש
- ניסיונות פתרון קודמים
- ראיות קיימות

כשיש מספיק מידע, הצע למשתמש ליצור טיוטת תביעה.

פורמט תגובה:
- תמיד בעברית
- קצר וענייני
- שאלה אחת בכל פנייה
- השתמש באימוג'ים במידה (✓ ✗ ⚠️ 💡) לבהירות`;

export const chat = action({
  args: {
    conversationId: v.id("conversations"),
    userMessage: v.string(),
  },
  handler: async (ctx, args) => {
    // Get conversation history
    const messages = await ctx.runQuery(api.messages.getByConversation, {
      conversationId: args.conversationId,
    });

    // Save user message
    await ctx.runMutation(api.messages.send, {
      conversationId: args.conversationId,
      role: "user",
      content: args.userMessage,
    });

    // Build messages array for AI
    const aiMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: args.userMessage },
    ];

    // Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: aiMessages.map((m) => ({
            role: m.role === "assistant" ? "model" : m.role === "system" ? "user" : "user",
            parts: [{ text: m.role === "system" ? `[System Instructions]\n${m.content}` : m.content }],
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

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "מצטער, נתקלתי בבעיה. אנא נסו שוב.";

    // Save AI response
    await ctx.runMutation(api.messages.send, {
      conversationId: args.conversationId,
      role: "assistant",
      content: aiResponse,
    });

    return aiResponse;
  },
});
