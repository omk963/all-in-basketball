import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <section className='w-7/12 rounded-2xl bg-white p-7'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <h2 className='text-xl font-semibold'>All Users</h2>
                <Button className='bg-[#DB4C40]' asChild>
                    <Link href='/admin/jerseys/new'>Add ???</Link>
                </Button>
            </div>

            <div className='mt-7 w-auto overflow-hidden'>
                <p>Table</p>
            </div>
        </section>
    )
}

export default Page
