'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from 'next-auth';
import { auth } from '@/auth';

const Header = async () => {
    const pathname = usePathname();
    const session = await auth();

    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href='/'>
                <Image src='/logo.svg' alt='logo' width={50} height={50} />
                All in Basketball
            </Link>

            <ul>
                <li>
                    {session ? (
                        <Link href='/profile' className={cn('text-base cursor-pointer capitalize', pathname === '/profile' ? 'text-blue-500' : 'text-black')}>
                            {/* <Avatar>
                            <AvatarImage src={session?.user?.image} />
                            <AvatarFallback>
                                {session?.user?.firstName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar> */}
                            Profile
                        </Link>
                    ) : (
                        <Link href='/sign-in' className={cn('text-base cursor-pointer capitalize', pathname === '/sign-in' ? 'text-blue-500' : 'text-black')}>
                            Sign in
                        </Link>
                    )}
                </li>
            </ul>
        </header>
    )
}

export default Header
