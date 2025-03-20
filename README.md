# NativeUI

NativeUI is a modern React Native component library designed to make building beautiful and accessible mobile applications easier than ever.

## Project Structure

This project follows the official shadcn/ui registry template structure:

1. **Website**: Contains the landing page, documentation, and examples
   - Located at `/app/(site)`
   - Built using Next.js, React, and shadcn/ui components in `/components`

2. **Component Registry**: Following the shadcn/ui registry structure
   - Component definitions in `/registry/[style]/[component-name]`
   - Registry configuration in `registry.json`
   - Built JSON files in `public/r`

## Important Distinction

There are two sets of components in this project:

- **Website UI Components**: Located in `/components` - These are shadcn/ui components used to build this documentation website (web only)
- **NativeUI Library Components**: Defined in `/registry` - These are the actual React Native components that make up the NativeUI library

## Getting Started

```bash
# Install dependencies
npm install

# Build the registry
npm run registry:build

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

## Component Registry Structure

Each component in the registry is defined in the structure:

```
registry/
├── new-york/
│   └── button/
│       └── button.tsx
```

And registered in the `registry.json` file:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "nativeui",
  "homepage": "https://nativeui.yourdomain.com",
  "items": [
    {
      "name": "button",
      "type": "registry:component",
      "title": "Button",
      "description": "A button component with multiple variants for React Native applications.",
      "files": [
        {
          "path": "registry/new-york/button/button.tsx",
          "type": "registry:component"
        }
      ],
      "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
      "registryDependencies": []
    }
  ]
}
```

## Accessing Component Definitions

You can access the JSON definitions of components via:

- Web routes: `/r/[componentName].json` (e.g., `/r/button.json`)
- API routes: `/api/registry/[componentName]` (e.g., `/api/registry/button`)

## Adding New Components

To add a new component to the NativeUI library:

1. Create the component in the appropriate directory: `registry/[style]/[component-name]/`
2. Add the component to the `registry.json` file
3. Run `npm run registry:build` to generate the JSON files
4. Document the component in the "Components" section of the website

## Installing Components with shadcn CLI

Users can install your components using the shadcn CLI:

```bash
npx shadcn@latest add https://your-registry-url.com/r/button.json
```

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- shadcn/ui components (for the website)
- shadcn CLI (for building the registry)

## License

MIT
