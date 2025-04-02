'use client';

import React from 'react'
import { Button } from './ui/button'

/* ! need to figure out jersey availability */

interface Props {
    userId: string;
    jerseyId: string;
};

const BorrowJersey = ({ userId, jerseyId }: Props) => {
    return (
        <Button>
            <p>Borrow</p>
        </Button>
    )
}

export default BorrowJersey