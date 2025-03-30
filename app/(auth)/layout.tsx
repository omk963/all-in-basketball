import { ReactNode } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (session) {
        redirect('/dashboard');
    }

    return (
        <main className='auth-container'>
            <section>
                <div>
                    <div className='flex flex-row gap-3'>
                        <Image src='/logo.svg' alt='logo' width={50} height={50} />
                        <h1 className='text-2xl font-bold'>All in Basketball</h1>
                    </div>

                    <div>
                        {children}
                    </div>
                </div>
            </section>

            <section className='auth-illustration'>
                <Image src='/auth-illustration.jpg' alt='auth illustration' width={1000} height={1000} className='size-full object-cover' />
            </section>
        </main>
    );
};

export default Layout;