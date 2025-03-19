'use server';

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params;

    try {
        const res = await signIn('credentials', { email, password, redirect: false });

        if (res?.error) {
            return { success: false, error: res.error }
        }

        return { success: true };
    } catch (error) {
        console.log('Signin error')
        return { success: false, error: 'Signin error' };
    }
}

export const signUp = async (params: AuthCredentials) => {
    const { image, firstName, lastName, email, password } = params;

    // Check if user exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return { success: false, error: 'User already exists' };
    }

    // Create user
    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            image,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        await signInWithCredentials({ email, password });
        
        return { success: true };
    } catch (error) {
        console.log('Signup error')
        return { success: false, error: 'Signup error' };
    }
}