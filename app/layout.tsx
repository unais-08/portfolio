import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import { ThemeProvider } from "@/context/ThemeContext";
import { ProjectProvider } from "@/context/ProjectContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaikh Unais | Software Engineer Portfolio",
  description:
    "Software Engineer skilled in React, Next.js, MERN Stack, and C++. View projects and resume.",
  keywords: [
    "Shaikh Unais",
    "Software Engineer Portfolio",
    "Next.js Developer",
    "React Developer India",
  ],
  authors: [{ name: "Shaikh Unais" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ThemeProvider>
          <ProjectProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                className: "bg-background text-foreground",
                style: {
                  fontFamily: "var(--font-geist-sans)",
                },
              }}
            />
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
