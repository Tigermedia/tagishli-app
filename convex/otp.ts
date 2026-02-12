import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

// Generate a 6-digit OTP code
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP in database
export const createOTP = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Delete any existing OTPs for this email
    const existing = await ctx.db
      .query("otpCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    for (const otp of existing) {
      await ctx.db.delete(otp._id);
    }

    const code = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await ctx.db.insert("otpCodes", {
      email: args.email,
      code,
      expiresAt,
      verified: false,
    });

    return code;
  },
});

// Verify OTP code
export const verifyOTP = mutation({
  args: {
    email: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const otp = await ctx.db
      .query("otpCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!otp) return { success: false, error: "לא נמצא קוד. נסו שוב." };
    if (otp.expiresAt < Date.now()) return { success: false, error: "הקוד פג תוקף. שלחו קוד חדש." };
    if (otp.code !== args.code) return { success: false, error: "קוד שגוי. נסו שוב." };

    // Mark as verified
    await ctx.db.patch(otp._id, { verified: true });

    // Create or get user
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    let userId;
    if (existingUser) {
      userId = existingUser._id;
    } else {
      userId = await ctx.db.insert("users", {
        clerkId: "", // not using Clerk anymore
        phone: "",
        fullName: "",
        email: args.email,
        createdAt: Date.now(),
      });
    }

    // Clean up OTP
    await ctx.db.delete(otp._id);

    return { success: true, userId };
  },
});

// Send OTP email via Resend
export const sendOTP = action({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean; error?: string }> => {
    // Generate and store OTP
    const code = await ctx.runMutation(api.otp.createOTP, {
      email: args.email,
    });

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const response: Response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "תגיש לי <noreply@resend.dev>",
        to: [args.email],
        subject: `קוד אימות: ${code}`,
        html: `
          <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 32px; text-align: center;">
            <h2 style="color: #0D1B2A; margin-bottom: 8px;">⚖️ תגיש לי</h2>
            <p style="color: #666; margin-bottom: 24px;">קוד האימות שלך:</p>
            <div style="background: #f6f6f8; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0D1B2A;">${code}</span>
            </div>
            <p style="color: #999; font-size: 12px;">הקוד תקף ל-10 דקות. אם לא ביקשתם קוד זה, התעלמו מהודעה זו.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText: string = await response.text();
      console.error("Resend error:", errorText);
      return { success: false, error: "שגיאה בשליחת האימייל. נסו שוב." };
    }

    return { success: true };
  },
});
