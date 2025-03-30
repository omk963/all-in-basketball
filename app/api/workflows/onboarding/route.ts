import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";

type UserState = "non-active" | "active";
type InitialData = {
    email: string;
    firstName: string;
};

const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day in milliseconds
const THREE_DAYS = 3 * ONE_DAY; // 3 days in milliseconds
const ONE_MONTH = 30 * ONE_DAY; // 30 days in milliseconds

const getUserState = async (email: string): Promise<UserState> => {
    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1);

    if (user.length === 0) {
        return "non-active"; // Default to non-active if user not found
    }

    const lastActivityDate = new Date(user[0].lastActivityDate!);
    const now = new Date();
    const timeSinceLastActivity = now.getTime() - lastActivityDate.getTime();

    if (timeSinceLastActivity > THREE_DAYS && timeSinceLastActivity <= ONE_MONTH) {
        // User has been inactive for more than 3 days but less than or equal to 1 month
        return "non-active";
    }
}

export const { POST } = serve<InitialData>(async (context) => {
    const { email, firstName } = context.requestPayload

    // Welcome Email
    await context.run("new-signup", async () => {
        await sendEmail({ email, subject: "Welcome to the league", message: `Welcome ${firstName!}` })
    })

    await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

    while (true) {
        const state = await context.run("check-user-state", async () => {
            return await getUserState(email);
        })

        if (state === "non-active") {
            await sendEmail({
                email,
                subject: "We miss you at All In Basketball!",
                message: `Hi ${firstName},\n\nWe noticed you haven't been active for a while. We miss having you around! If there's anything we can do to help you get back into the game, please let us know.\n\nBest,\nThe All In Basketball Team`
            })
        } else if (state === "active") {
            await sendEmail({
                email,
                subject: "Great to see you back at All In Basketball!",
                message: `Hi ${firstName},\n\nWelcome back! We're thrilled to see you active again on All In Basketball. Keep up the great work and enjoy the game!\n\nBest,\nThe All In Basketball Team`
            })
        }

        await context.sleep("wait-for-1-month", ONE_MONTH)
    }
})