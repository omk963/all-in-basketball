import JerseyForm from '@/components/admin/forms/JerseyForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className='h-lvh w-lvw px-10 '>
            <Button asChild className='mb-7' >
                <Link href='/admin/jerseys'>Go Back</Link>
            </Button >

            <section className='w-full max-w-2xl'>
                <JerseyForm />
            </section>
        </div >
    )
}

export default Page;