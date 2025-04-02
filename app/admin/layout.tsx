import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { auth } from "@/auth";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import '@/styles/admin.css'

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/sign-in')
    }

    const isAdmin = await db
        .select({ isAdmin: users.role })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1)
        .then((res) => res[0]?.isAdmin === "ADMIN" || res[0]?.isAdmin === "MODERATOR");

    if (!isAdmin) {
        redirect('/dashboard')
    }

    return (
        <main className="flex min-h-screen sm:max-h-screen w-full flex-row text-black overflow-hidden" >
            <Sidebar session={session} />
            <div className="admin-container">
                <Header session={session} />
                {children}
            </div>
        </main>
    );
};

export default Layout;