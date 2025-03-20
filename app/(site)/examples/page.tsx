import React from 'react'
import { Button } from '@/components/ui/button'

export default function ExamplesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Examples</h1>
      
      <div className="grid gap-12 max-w-4xl">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Basic Form</h2>
          <div className="p-6 border rounded-lg shadow-sm">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your message"
                />
              </div>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              This example demonstrates a simple form implementation using NativeUI components.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Card Layout</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">Card Title {item}</h3>
                  <p className="text-gray-600 text-sm">
                    This is a sample card that shows how to structure content in a card layout.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 