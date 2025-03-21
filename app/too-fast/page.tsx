import React from 'react'

const Page = () => {
    return (
        <main className='root-container flex min-h-screen flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold'>Too many attempts</h1>
            <p className='text-center mt-5'>
                You&apos;ve reached your request limit for now. Please try again in a few minutes. To prevent abuse, we have a limit on how many requests can be made within a certain time period.
            </p>
        </main>
    );
};

export default Page;