'use server';

import { db } from "@/database/drizzle";
import { Player } from "@/types";

export const registerPlayer = async ({ params: Player }) => {
    const { color, height, size, captain, yearsOfExperience, position, teamName, userId } = Player;

    try {
        await db.insert(players).values({

        })

        return {
            success: true,
            message: 'Player registered successfully',
        };
    } catch (error) {
        console.error('Registration failed:', error);
        return {
            success: false,
            error: 'An error occurred during registration',
        };
    }
};

export const registerTeam = async ({ }) => {

    try {

        return {
            success: true,
            message: 'Team registered successfully',
        };
    } catch (error) {
        console.error('Registration failed:', error);
        return {
            success: false,
            error: 'An error occurred during team registration',
        };
    }
}