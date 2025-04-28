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

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.title} className="pb-8">
          <h4 className="mb-4 text-sm font-semibold">{item.title}</h4>
          <ul className="space-y-2 text-sm">
            {item.items.map((subItem) => (
              <li key={subItem.href}>
                <Link
                  href={subItem.href}
                  className={cn(
                    "block py-1 hover:text-foreground transition-colors",
                    pathname === subItem.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {subItem.title}
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
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r pr-4 md:px-4">
        <div className="h-full py-10 pl-2 pr-2 overflow-y-auto">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </div>
      </aside>
      <main className="min-h-screen py-12">
        {children}
      </main>
    </div>
  );
} 