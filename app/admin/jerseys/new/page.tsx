import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <>
            <Button asChild>
                <Link href='/admin/books'>Go Back</Link>
            </Button>

            <section className='w-full max-w-2xl'>
                <p>Book form</p>
            </section>
        </>
    )
}

export default Page