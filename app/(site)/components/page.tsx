"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Component {
  name: string;
  href: string;
}

export default function ComponentsPage() {
  const [components, setComponents] = React.useState<Component[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/components')
      .then(res => res.json())
      .then(data => {
        setComponents(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch components:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Components</h1>
          <div className="grid gap-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Components</h1>
        
        <div className="grid gap-2">
          {components.map((component) => (
            <Link key={component.name} href={component.href}>
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{component.name}</span>
                  <span className="text-muted-foreground">→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 