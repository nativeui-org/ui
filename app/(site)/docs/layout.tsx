"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";

const docsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
        {
          title: "Usage",
          href: "/docs/usage",
        },
      ],
    },
    {
      title: "Components",
      items: registry.items.map((item) => ({
        title: item.title,
        href: `/docs/components/${item.name}`,
      })),
    },
  ],
};

interface DocsSidebarNavProps {
  items: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  }[];
}

function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={item.title} className={cn("pb-6", index === items.length - 1 && "pb-8")}>
          <h4 className="mb-3 text-sm font-semibold text-foreground tracking-tight">
            {item.title}
          </h4>
          <ul className="space-y-1">
            {item.items.map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    pathname === subItem.href
                      ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="truncate">{subItem.title}</span>
                  {pathname === subItem.href && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 container md:gap-10 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] lg:gap-16">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="relative h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          
          <div className="h-full overflow-y-auto scrollbar-hide px-4 py-10">
            <div className="pb-6">
              <DocsSidebarNav items={docsConfig.sidebarNav} />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </div>
      </aside>
      <main className="min-h-screen py-12">
        {children}
      </main>
    </div>
  );
}