'use server';

import { db } from "@/database/drizzle";
import { jerseys } from "@/database/schema";
import { JerseyParams } from "@/types";

export const createJersey = async (params: JerseyParams) => {
    try {
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