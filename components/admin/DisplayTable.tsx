'use client';

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
    PaginationItem,
} from "@/components/ui/pagination";
import { fetchDataJersey, fetchDataUser } from "@/lib/admin/actions/fetchData";

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
};

const DisplayTable = ({ type }: { type: String }) => {
    return (
        <>
            {
                type === 'jerseys' ? <JerseyTable /> : <UserTable />
            }
        </>
    )
}

const JerseyTable = () => {
    const [jerseyList, setJerseyList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        fetchDataJersey({ pageNum: page })
            .then((res) => {
                if (res.success) {
                    console.log(res)
                    setJerseyList(res.data);
                    setTotalPage(res.totalPages); // Set the total pages from the response
                } else {
                    console.error(res.message);
                }
            })
    }, [page])

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPage) {
            return;
        }
        setPage(pageNumber);
    }

    const TableRows = ({ jersey, index }: { jersey: JerseyList, index: number }) => {
        return (
            <TableRow className='hover:bg-amber-200 transition-colors duration-200 w-5/6 grid grid-cols-7 sm:grid-cols-8 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7'>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{jersey.number}</TableCell>
                <TableCell>{jersey.color}</TableCell>
                <TableCell>{jersey.size}</TableCell>
                <TableCell>{jersey.status ? jersey.status : "Available"}</TableCell>
                <TableCell className='col-span-2'>{jersey.description}</TableCell>
            </TableRow>
        )
    }

    return (
        <>
            <Accordion type='multiple'>
                <Table>
                    <TableCaption>Jersey Inventory.</TableCaption>
                    <TableHeader>
                        <TableRow className='jersey-table'>
                            <TableHead>No.</TableHead>
                            <TableHead>Number</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className='col-span-2'>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jerseyList && jerseyList.length > 0 && (

                            jerseyList.map((jersey, index) => (
                                jersey.status === "BORROWED" ? (
                                    <AccordionItem value={jersey.id} key={jersey.id}>
                                        <AccordionTrigger>
                                            <TableRows
                                                jersey={jersey}
                                                index={index}
                                            />
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <span>Borrowed Date:</span>
                                                    <p>{jersey.borrowDate}</p>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <span>Borrowed By:</span>
                                                    <p>{`${jersey.firstName} ${jersey.lastName}`}</p>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <span>Registered:</span>
                                                    <p>season, team, jersey</p>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>) : (
                                    <div className='flex flex-row'>
                                        <TableRows
                                            jersey={jersey}
                                            index={index}
                                        />
                                        <span className='invisible'>####</span>
                                    </div>
                                ))))}
                    </TableBody>
                </Table>
            </Accordion>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                        >
                            Previous
                        </button>
                    </PaginationItem>
                    <PaginationItem>
                        <div>
                            Page <span aria-live='polite' >{page}</span> of {totalPage}
                        </div>
                    </PaginationItem>
                    <PaginationItem>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPage}
                            className={page >= totalPage ? "pointer-events-none opacity-50" : undefined}
                        >
                            Next
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

const UserTable = () => {
    const [userList, setUserList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        fetchDataUser({ pageNum: page })
            .then((res) => {
                if (res.success) {
                    console.log(res)
                    setUserList(res.data);
                    setTotalPage(res.totalPages); // Set the total pages from the response
                } else {
                    console.error(res.message);
                }
            })
    }, [page])

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPage) {
            return;
        }
        setPage(pageNumber);
    }

    const TableRows = ({ user, index }: { user: any, index: number }) => {
        return (
            <TableRow className='hover:bg-amber-200 transition-colors duration-200 user-table'>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
            </TableRow>
        )
    }

    return (
        <>
            <Accordion type='multiple' >
                <Table>
                    <TableCaption>User List.</TableCaption>
                    <TableHeader>
                        <span>
                            <TableRow className='user-table'>
                                <TableHead>No.</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </span>
                    </TableHeader>
                    <TableBody>
                        {userList && userList.length > 0 && (

                            userList.map((user, index) => (
                                user.role === "PLAYER" ? (
                                    <AccordionItem value={user.id} key={user.id} >
                                        <AccordionTrigger className=''>
                                            <TableRows
                                                user={user}
                                                index={index}
                                            />
                                        </AccordionTrigger>

                                        <AccordionContent className=''>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <span>Years of Experience:</span>
                                                    <p>{user.years_of_experience}</p>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <span>Position(s):</span>
                                                    <p>{user.position}</p>
                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <span>Registered:</span>
                                                    <p>season, team, jersey</p>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <div className='flex flex-row'>
                                        <TableRows
                                            user={user}
                                            index={index}
                                        />
                                        <span className='invisible'>####</span>
                                    </div>
                                )
                            )))}
                    </TableBody>
                </Table>
            </Accordion>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                        >
                            Previous
                        </button>
                    </PaginationItem>
                    <PaginationItem>
                        <div>
                            Page <span aria-live='polite' >{page}</span> of {totalPage}
                        </div>
                    </PaginationItem>
                    <PaginationItem>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPage}
                            className={page >= totalPage ? "pointer-events-none opacity-50" : undefined}
                        >
                            Next
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default DisplayTable;