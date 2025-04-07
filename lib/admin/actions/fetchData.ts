'use server';

import { db } from '@/database/drizzle';
import { eq, sql } from "drizzle-orm";
import { jerseys, playerJerseys, players, users } from '@/database/schema';

export const fetchDataJersey = async ({ pageNum }: { pageNum: number }) => {
    const pageSize: number = 8; // Number of items per page
    let page: number = pageNum; // Default to the first page
    let totalPages: number = 1; // Total number of pages

    try {
        const res = await db
            .select({
                id: jerseys.id,
                number: jerseys.number,
                color: jerseys.color,
                size: jerseys.size,
                description: jerseys.description,
                status: playerJerseys.status,
                borrowDate: playerJerseys.borrowDate,
                firstName: users.firstName,
                lastName: users.lastName,
            })
            .from(jerseys)
            .leftJoin(playerJerseys, eq(jerseys.id, playerJerseys.jerseyId))
            .leftJoin(players, eq(playerJerseys.playerId, players.id))
            .leftJoin(users, eq(players.userId, users.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize);

        const total = await db
            .select({ count: sql<number>`COUNT(*)` })
            .from(jerseys)
            .leftJoin(playerJerseys, eq(jerseys.id, playerJerseys.jerseyId))

        totalPages = (Math.ceil(total[0].count / pageSize));

        return {
            success: true,
            data: JSON.parse(JSON.stringify(res)),
            totalPages: totalPages,
            message: 'Data fetched successfully'
        }
    } catch (error) {
        console.error('Error in fetchData:', error);
        return {
            success: false,
            message: 'An error occurred while fetching data'
        };
    };
};

export const fetchDataUser = async ({ pageNum }: { pageNum: number }) => {
    const pageSize: number = 8; // Number of items per page
    let page: number = pageNum; // Default to the first page
    let totalPages: number = 1; // Total number of pages

    try {
        const res = await db
            .select()
            .from(users)
            .limit(pageSize)
            .offset((page - 1) * pageSize);

        const total = await db
            .select({ count: sql<number>`COUNT(*)` })
            .from(users)

        totalPages = (Math.ceil(total[0].count / pageSize));

        return {
            success: true,
            data: JSON.parse(JSON.stringify(res)),
            totalPages: totalPages,
            message: 'Data fetched successfully'
        }
    } catch (error) {
        console.error('Error in fetchData:', error);
        return {
            success: false,
            message: 'An error occurred while fetching data'
        };
    };
};