import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { db } from '@/database/drizzle';
import { eq, sql } from "drizzle-orm";
import { jerseys, playerJerseys, players, users } from '@/database/schema';

interface JerseyList {
    id: string,
    number: string,
    color: string,
    size: string,
    description: string,
    status: string,
    borrowDate?: string,
    firstName?: string,
    lastName?: string,
}

const DisplayTable = (type: string) => {
    return (
        <>
            {
                type === 'jerseys' ? <JerseyTable /> : <UserTable />
            }
        </>
    )
}

const JerseyTable = async () => {
    const [jerseyList, setJerseyList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        const fetchList = async () => {
            const list = await db
                .select({
                    id: jerseys.id,
                    number: jerseys.number,
                    color: jerseys.color,
                    size: jerseys.size,
                    description: jerseys.description,
                    status: playerJerseys.status,
                    borrowDate: playerJerseys.borrowDate,
                    firstName: users.firstName,
                    lastName: users.lastName,
                })
                .from(jerseys)
                .leftJoin(playerJerseys, eq(jerseys.id, playerJerseys.jerseyId))
                .leftJoin(players, eq(playerJerseys.playerId, players.id))
                .leftJoin(users, eq(players.userId, users.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize);

            setJerseyList(list);

            const total = await db
                .select({ count: sql<number>`COUNT(*)` })
                .from(jerseys)
                .leftJoin(playerJerseys, eq(jerseys.id, playerJerseys.jerseyId))

            setTotalPage(Math.ceil(total[0].count / pageSize));
        };

        fetchList();
    }, [page])

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPage) {
            return;
        }
        setPage(pageNumber);
    }

    return (
        <>
            <Accordion type='multiple'>
                <Table>
                    <TableCaption>Jersey Inventory.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AccordionItem value='idk'>
                            <AccordionTrigger>
                                <TableRow>
                                    <TableCell>number = index  + 1</TableCell>
                                    <TableCell>first name + last name</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-row justify-between'>
                                        <span>Years of Experience:</span>
                                        <p>#</p>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <span>Position(s):</span>
                                        <p>list</p>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <span>Registered:</span>
                                        <p>season, team, jersey</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </TableBody>
                </Table>
            </Accordion>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
};

const UserTable = () => {
    return (
        <Accordion type='multiple'>
            <Table>
                <TableCaption>Jersey Inventory.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AccordionItem value='idk'>
                        <AccordionTrigger>
                            <TableRow>
                                <TableCell>number = index  + 1</TableCell>
                                <TableCell>first name + last name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row justify-between'>
                                    <span>Years of Experience:</span>
                                    <p>#</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <span>Position(s):</span>
                                    <p>list</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <span>Registered:</span>
                                    <p>season, team, jersey</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </TableBody>
            </Table>
        </Accordion>
    )
};

export default DisplayTable;