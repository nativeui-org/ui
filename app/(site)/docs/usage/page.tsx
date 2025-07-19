"use client"

export default function UsagePage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Using NativeUI Components</h1>
          <p className="text-xl text-muted-foreground leading-7">
            Get started with NativeUI components in your mobile applications. Our official playground project is the perfect way to learn and experiment.
          </p>
        </div>

        <div className="rounded-lg border-2 border-primary/10 bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium text-primary">
              NativeUI is primarily designed for iOS and Android. Web components are currently experimental.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <a 
            href="https://github.com/nativeui-org/playground"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try the Playground
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Interactive Learning with the Playground</h2>
          <p className="text-muted-foreground text-lg leading-7">
            Our <a href="https://github.com/nativeui-org/playground" className="text-primary hover:underline">official playground project</a> provides a complete, hands-on environment for mastering NativeUI components.
          </p>

          <div className="mt-8 space-y-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What You Can Do</h3>
              <p className="text-muted-foreground">
                The playground is your sandbox for exploring NativeUI:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Test components in a real mobile environment</li>
                <li>Experiment with properties and configurations</li>
                <li>View live previews of your changes</li>
                <li>Learn from practical, real-world examples</li>
                <li>Understand component interactions in context</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Start with Mobile First</strong>: Design your components with mobile interfaces in mind</li>
                <li><strong>Use the Playground for Learning</strong>: Experiment before implementation</li>
                <li><strong>Component Composition</strong>: Learn from example implementations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Platform Support</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>iOS & Android</strong>: Fully supported and thoroughly tested</li>
                <li><strong>Web</strong>: Experimental support with potential limitations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contributing</h3>
              <p className="text-muted-foreground">
                We welcome contributions to the <a href="https://github.com/nativeui-org/playground" className="text-primary hover:underline">playground project</a>! Whether it&apos;s bug fixes, new features,
                documentation improvements, or component enhancements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}