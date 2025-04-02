'use server';

import { db } from "@/database/drizzle";
import { borrowRecords, jerseys } from "@/database/schema";
import { eq } from "drizzle-orm";
import { BorrowedJerseyParams } from "@/types";

export const borrowJersey = async (params: BorrowedJerseyParams) => {
    const { userId, jerseyId } = params;

    try {
        const jersey = await db
            .select()
            .from(jerseys)
            .where(eq(jerseys.id, jerseyId))
            .limit(1);

        if (!jersey) {
            return (
                {
                    success: false,
                    error: 'This jersey is not available to borrow'
                }
            )
        }

        const record = db.insert(borrowRecords).values({
            userId,
            jerseyId,
            status: "BORROWED"
        });

        await db
            .update(jerseys)
            .set({ borrowed: true })
            .where(eq(jerseys.id, jerseyId))

        return ({
            success: true,
            data: JSON.parse(JSON.stringify(record))
        })
    } catch (error) {
        console.log(error)
    }
}