import React from "react";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="text-xl font-bold">
            NativeUI
          </a>
          <nav className="flex gap-6">
            <a href="/docs" className="text-sm font-medium">
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
              className="text-sm font-medium"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
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
