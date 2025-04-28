const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const REGISTRY_DIR = path.join(process.cwd(), 'registry');
const OUTPUT_DIR = path.join(process.cwd(), 'public/r');
const REGISTRY_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all component directories
const componentDirs = fs.readdirSync(REGISTRY_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Process each component
componentDirs.forEach(componentName => {
  const componentDir = path.join(REGISTRY_DIR, componentName);
  const mainComponentFile = path.join(componentDir, `${componentName}.tsx`);
  
  if (!fs.existsSync(mainComponentFile)) {
    console.warn(`Main component file not found for ${componentName}`);
    return;
  }
  
  // Read component file content
  const componentContent = fs.readFileSync(mainComponentFile, 'utf8');
  
  // Extract component description from JSDoc comments if present
  let description = `A ${componentName} component for React Native applications.`;
  const descriptionMatch = componentContent.match(/\/\*\*\s*\n\s*\*\s*(.*?)\s*\n/);
  if (descriptionMatch && descriptionMatch[1]) {
    description = descriptionMatch[1];
  }
  
  // Determine dependencies
  const dependencies = [];
  
  // Check for common dependencies in the imports
  if (componentContent.includes('class-variance-authority')) {
    dependencies.push('class-variance-authority');
  }
  if (componentContent.includes('@radix-ui/react-slot')) {
    dependencies.push('@radix-ui/react-slot');
  }
  
  // Create registry item
  const registryItem = {
    "$schema": REGISTRY_SCHEMA,
    "name": componentName,
    "type": "registry:component",
    "title": componentName.charAt(0).toUpperCase() + componentName.slice(1),
    "description": description,
    "dependencies": dependencies,
    "registryDependencies": [],
    "files": [
      {
        "path": `registry/${componentName}/${componentName}.tsx`,
        "content": componentContent,
        "type": "registry:component"
      }
    ]
  };
  
  // Write to output file
  const outputFile = path.join(OUTPUT_DIR, `${componentName}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(registryItem, null, 2));
  
  console.log(`✅ Generated registry item for ${componentName}`);
});

console.log(`\n🎉 Registry build complete! Generated ${componentDirs.length} components.`); 