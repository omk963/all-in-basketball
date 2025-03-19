'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathname = usePathname();

    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href='/'>
                <Image src='/logo.svg' alt='logo' width={50} height={50} />
                All in Basketball
            </Link>

            <ul>
                <li>
                    <Link href='/players' className={cn('text-base cursor-pointer capitalize', pathname === '/players' ? 'text-blue-500' : 'text-black')}>Players</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
