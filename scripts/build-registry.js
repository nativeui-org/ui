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
  const descriptionMatch = componentContent.match(/\/\*\*\s*\n\s*\*\s*(.*)\s*\n/);
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
  
  // Extract changelog information if available
  let changelog = [];
  const changelogFile = path.join(componentDir, 'CHANGELOG.md');
  
  if (fs.existsSync(changelogFile)) {
    const changelogContent = fs.readFileSync(changelogFile, 'utf8');
    // Parse changelog content - exemple simple
    const versions = changelogContent.split('## ');
    versions.shift(); // Ignorer le premier élément (vide ou titre)
    
    changelog = versions.map(version => {
      const lines = version.split('\n');
      const versionLine = lines[0]; // Ex: "1.1.0 (2023-10-15)"
      const [versionNumber, datePart] = versionLine.split(' ');
      const date = datePart ? datePart.replace(/[()]/g, '') : '';
      
      // Extraire les changements (lignes commençant par -)
      const changes = lines
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim());
      
      return {
        version: versionNumber,
        date,
        changes
      };
    });
  }
  
  // Read customUsage from component.usage.tsx if it exists
  let customUsage = null;
  const usageFile = path.join(componentDir, `${componentName}.usage.tsx`);
  if (fs.existsSync(usageFile)) {
    customUsage = fs.readFileSync(usageFile, 'utf8');
  }
  
  // Read customPreview from component.preview.tsx if it exists
  let customPreview = null;
  const previewFile = path.join(componentDir, `${componentName}.preview.tsx`);
  if (fs.existsSync(previewFile)) {
    customPreview = fs.readFileSync(previewFile, 'utf8');
  }
  
  // Create registry item
  const registryItem = {
    "$schema": REGISTRY_SCHEMA,
    "name": componentName,
    "type": "registry:ui",
    "title": componentName.charAt(0).toUpperCase() + componentName.slice(1),
    "description": description,
    "dependencies": dependencies,
    "registryDependencies": [],
    "files": [
      {
        "path": `registry/${componentName}/${componentName}.tsx`,
        "content": componentContent,
        "type": "registry:ui"
      }
    ],
    "changelog": changelog
  };
  
  // Add customUsage and customPreview if they exist
  if (customUsage) {
    registryItem.customUsage = customUsage;
  }
  
  if (customPreview) {
    registryItem.customPreview = customPreview;
  }
  
  // Write to output file
  const outputFile = path.join(OUTPUT_DIR, `${componentName}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(registryItem, null, 2));
  
  console.log(`✅ Generated registry item for ${componentName}`);
});

console.log(`\n🎉 Registry build complete! Generated ${componentDirs.length} components.`);