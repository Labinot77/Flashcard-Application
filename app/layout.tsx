import type { Metadata } from "next";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import clsx from "clsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Easily track your thoughs with a simple note taking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={clsx(`antialiased`)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <main className="h-screen overflow-hidden">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
     </SessionProvider>
  );
}
