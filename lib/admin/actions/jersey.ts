'use server';

import { db } from "@/database/drizzle";
import { jerseys } from "@/database/schema";
import { JerseyParams } from "@/types";

export const createJersey = async (params: JerseyParams) => {
    try {
        // Check number
        if (!/^(00|[0-9]{1,2})$/.test(params.number)) {
            return ({
                success: false,
                message: "Invalid jersey number: Must be between 00 and 99"
            });
        };
        if (!params.color || !params.size) {
            return ({
                success: false,
                message: "Please fill out all fields"
            });
        }

        const newJersey = await db.insert(jerseys).values({ ...params }).returning();

        return ({
            success: true,
            data: JSON.parse(JSON.stringify(newJersey[0]))
        })
    } catch (error) {
        console.log(error);
        return ({
            success: false,
            message: error
        });
    };
};