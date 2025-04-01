'use client';

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = ({ session }: { session: Session }) => {
    const pathname = usePathname();

    return (
        <div>
            <div>
                <div>
                    <Image src='../../public/logo.svg' alt='logo' height={37} width={37} className="rounded-full" />
                </div>
                <div>
                    {adminSideBarLinks.map((link) => {
                        const isSelected = (link.route !== '/admin' && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                        return (
                            <Link href={link.route} key={link.route}>
                                <div className={cn('link', isSelected && 'bg-primary-admin shadow-sm')}>
                                    <div>
                                        <Image src={link.img} alt='icon' fill className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`} />
                                    </div>
                                    <p className={cn(isSelected ? 'text-white' : 'text-black')}>{link.text}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div>
                <Avatar>
                    <AvatarImage src={session ? `https://ik.imagekit.io/aibwl${session?.user?.image}` : `../global.svg`} />
                    <AvatarFallback>
                        {session?.user?.firstName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col max-md:hidden">
                    <p className="font-semibold">{session?.user?.firstName}</p>
                    <p className="text-xs">{session?.user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;