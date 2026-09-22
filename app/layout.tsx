
import "./globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/context/ThemeContext";
import { ProjectProvider } from "@/context/ProjectContext";


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

      >
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
                className: "bg-background text-foreground"
              }}
            />
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
