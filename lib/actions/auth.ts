'use server';

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { auth, signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { AuthCredentials } from "@/types";
import { workflowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params;

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip)

    if (!success) {
        redirect('/too-fast');
    }

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

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip)

    if (!success) {
        redirect('/too-fast');
    }

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

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
            body: {
                email,
                firstName,
            }
        })

        await signInWithCredentials({ email, password });

        return { success: true };
    } catch (error) {
        console.log('Signup error')
        return { success: false, error: 'Signup error' };
    }
}

export const getSession = async () => {
    try {
        const session = await auth();
        return session ? true : false;

    } catch (error) {
        console.log('Get session error')
        return false;
    }
}