# Component Documentation System

This directory contains scripts to automate the process of documenting React Native components for your Next.js site.

## Available Scripts

### `npm run update:components`

The main script that performs the entire documentation process:
1. Builds the component registry JSON files from TSX components
2. Generates component documentation pages for the Next.js site

This is the recommended script to run when you update or add new components.

### Individual Scripts

- `npm run build:registry`: Only builds the registry JSON files
- `npm run generate:docs`: Only generates the documentation pages

## How It Works

1. **Component Source**: Your React Native components in `registry/*/component.tsx` are the source of truth.
   
2. **Build Registry**: The build script extracts metadata and code from your components and generates JSON files in `public/r/`.
   
3. **Generate Docs**: The docs generator creates Next.js pages in `app/(site)/docs/components/*/page.tsx` based on the JSON files.

## Adding Documentation to Components

Use JSDoc comments in your component files to improve documentation:

```tsx
/**
 * A detailed description of your component.
 * This will be extracted and used in the documentation.
 */
export const MyComponent = () => {
  // ...
}
```

## Customizing Documentation

You can customize the documentation generation process by modifying the scripts:

- `scripts/build-registry.js`: Customize how component data is extracted and stored
- `scripts/generate-component-docs.js`: Customize how documentation pages are generated
- `scripts/update-components.js`: Customize the workflow for updating components 