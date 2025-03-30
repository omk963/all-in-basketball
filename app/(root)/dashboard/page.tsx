import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import React from 'react'

const Page = async () => {
    const session = await auth();

    if (!session) {
        redirect('/sign-in');
    }


    after(async () => {
        if (!session?.user?.id) {
            return; // No user session found
        }

        // Check if the user's last activity date is today
        const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1);

        if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) {
            return;
        }

        // Update last activity to today
        await db.update(users).set({ lastActivityDate: new Date().toISOString().slice(0, 10) }).where(eq(users.id, session?.user?.id))
    });

    return (
        <>
            <h1>Welcome Back, {session.user.firstName}!</h1>
            <form action={async () => {
                'use server';

                await signOut();
            }}>
                <Button>Logout</Button>
            </form>
        </>
    );
};

export default Page;
