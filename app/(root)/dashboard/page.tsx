import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
    const session = await auth();

    if (!session) {
        redirect('/sign-in');
    }

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
