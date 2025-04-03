'use server';

import { db } from "@/database/drizzle";
import { borrowRecords, playerJerseys } from "@/database/schema";
import { eq } from "drizzle-orm";
import { BorrowedJerseyParams } from "@/types";

export const borrowJersey = async (params: BorrowedJerseyParams) => {
    const { playerId, jerseyId } = params;

    try {
        // Check if jersey is already been borrowed
        const jersey = await db
            .select()
            .from(playerJerseys)
            .where(eq(playerJerseys.jerseyId, jerseyId) && eq(playerJerseys.status, "BORROWED"))
            .limit(1);

        if (jersey.length > 0) {
            return (
                {
                    success: false,
                    error: 'This jersey is not available to borrow'
                }
            )
        }

        // Create borrow history entry
        const record = db.insert(borrowRecords).values({
            playerId,
            jerseyId,
        });

        // Assign jersey to player
        await db.insert(playerJerseys).values({
            playerId,
            jerseyId,
            status: "BORROWED"
        })

        return ({
            success: true,
            data: JSON.parse(JSON.stringify(record))
        })
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "An error occurred while borrowing the jersey",
        };
    };
};