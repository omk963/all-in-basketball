import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from 'next-auth/react'
import { auth } from "@/auth";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIBWL - ALL IN BASKETBALL",
  description: "ALL IN BASKETBALL AIMS TO PROVIDE HIGH QUALITY, INNOVATIVE, CHALLENGING AND FUN WAYS TO LEARN & IMPROVE YOUR BASKETBALL GAME.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-white`}
        >
          {children}

          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;