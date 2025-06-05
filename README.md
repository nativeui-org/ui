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


*

# Composants NativeUI

Ce fichier liste tous les composants disponibles dans la bibliothèque NativeUI avec leurs commandes d'installation.

## Installation

Pour installer un composant, utilisez la commande suivante :

```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/[nom-du-composant]
```

## Liste des composants

### Accordion
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/accordion
```
Description : Un composant accordion pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Alert
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/alert
```
Description : Un composant alert pour les applications React Native.
Dépendances : react-native, class-variance-authority

### Alert Dialog
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/alert-dialog
```
Description : Un composant alert dialog pour les applications React Native.
Dépendances : react-native

### Avatar
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/avatar
```
Description : Un composant avatar pour les applications React Native.
Dépendances : react-native

### Badge
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/badge
```
Description : Un composant badge pour les applications React Native.
Dépendances : react-native, class-variance-authority

### Breadcrumb
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/breadcrumb
```
Description : Un composant breadcrumb pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Button
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/button
```
Description : Un composant button avec plusieurs variantes pour les applications React Native.
Dépendances : react-native, class-variance-authority

### Calendar
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/calendar
```
Description : Un composant calendar pour les applications React Native.
Dépendances : react-native, date-fns, @expo/vector-icons, @react-native-community/datetimepicker

### Card
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/card
```
Description : Un composant card pour les applications React Native.
Dépendances : react-native

### Carousel
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/carousel
```
Description : Un composant carousel pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Checkbox
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/checkbox
```
Description : Un composant checkbox pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Collapsible
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/collapsible
```
Description : Un composant collapsible pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Combobox
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/combobox
```
Description : Un composant combobox pour les applications React Native.
Dépendances : react-native, @expo/vector-icons
Dépendances de registry : drawer, input

### Date Time Picker
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/date-time-picker
```
Description : Un composant date time picker pour les applications React Native.
Dépendances : react-native, date-fns, @expo/vector-icons
Dépendances de registry : calendar

### Dialog
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/dialog
```
Description : Un composant dialog pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Drawer
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/drawer
```
Description : Un composant drawer pour les applications React Native.
Dépendances : react-native, react-native-safe-area-context

### Dropdown
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/dropdown
```
Description : Un composant dropdown pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Input
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/input
```
Description : Un composant input pour les applications React Native.
Dépendances : react-native

### Input OTP
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/input-otp
```
Description : Un composant input OTP pour les applications React Native.
Dépendances : react-native

### Label
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/label
```
Description : Un composant label pour les applications React Native.
Dépendances : react-native

### Pagination
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/pagination
```
Description : Un composant pagination pour les applications React Native.
Dépendances : react-native, @expo/vector-icons

### Popover
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/popover
```
Description : Un composant popover pour les applications React Native.
Dépendances : react-native

### Progress
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/progress
```
Description : Un composant progress pour les applications React Native.
Dépendances : react-native

### Radio Group
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/radio-group
```
Description : Un composant radio group pour les applications React Native.
Dépendances : react-native

### Select
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/select
```
Description : Un composant select pour les applications React Native.
Dépendances : react-native, @expo/vector-icons
Dépendances de registry : drawer

### Separator
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/separator
```
Description : Un composant separator pour les applications React Native.
Dépendances : react-native

### Sheet
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/sheet
```
Description : Un composant sheet pour les applications React Native.
Dépendances : react-native, react-native-safe-area-context, @expo/vector-icons

### Skeleton
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/skeleton
```
Description : Un composant skeleton pour les applications React Native.

### Slider
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/slider
```
Description : Un composant slider pour les applications React Native.
Dépendances : react-native

### Switch
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/switch
```
Description : Un composant switch pour les applications React Native.
Dépendances : react-native

### Table
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/table
```
Description : Un composant table pour les applications React Native.
Dépendances : react-native

### Tabs
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/tabs
```
Description : Un composant tabs pour les applications React Native.
Dépendances : react-native

### Textarea
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/textarea
```
Description : Un composant textarea pour les applications React Native.
Dépendances : react-native

### Toggle
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/toggle
```
Description : Un composant toggle pour les applications React Native.
Dépendances : react-native

### Toggle Group
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/toggle-group
```
Description : Un composant toggle group pour les applications React Native.
Dépendances : react-native

### Tooltip
```bash
npx shadcn@latest add http://127.0.0.1:3000/registry/tooltip
```
Description : Un composant tooltip pour les applications React Native.
Dépendances : react-native
