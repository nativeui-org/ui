"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // Ajout de l'import Link
import { CommandMenu } from "@/components/command-menu";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme, theme } = useTheme(); // Suppression de theme non utilisé
  const [mounted, setMounted] = React.useState(false);

  console.log(theme);
  

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold"> {/* Remplacement de <a> par <Link> */}
              <div className="w-8 h-8" /> {/* Placeholder for logo */}
              NativeUI
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-[200px]" /> {/* Placeholder for menu */}
            </div>
          </div>
        </header>
        <main className="flex-1 mt-16">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold"> {/* Remplacement de <a> par <Link> */}
            <Image 
              src={resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-wout-bg.png'}
              alt="NativeUI Logo" 
              width={32} 
              height={32} 
            />
            <span className="hidden sm:inline">NativeUI</span>
          </Link>
          <div className="flex items-center gap-4">
            <CommandMenu />
            <nav className="flex items-center gap-4">
              <a 
                href="/docs" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Documentation
              </a>
              {/* TODO : Put uwalk examples here */}
              {/* <a href="/examples" className="text-sm font-medium">
                Examples
              </a> */}
              <a
                href="https://github.com/nativeui-org/ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 mt-16">{children}</main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NativeUI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
