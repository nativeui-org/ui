const fs = require('fs');
const path = require('path');

// Configuration
const PUBLIC_REGISTRY_DIR = path.join(process.cwd(), 'public/r');
const DOCS_COMPONENTS_DIR = path.join(process.cwd(), 'app/(site)/docs/components');

// Ensure docs components directory exists
if (!fs.existsSync(DOCS_COMPONENTS_DIR)) {
  fs.mkdirSync(DOCS_COMPONENTS_DIR, { recursive: true });
}

// Get all registry JSON files
const registryFiles = fs.readdirSync(PUBLIC_REGISTRY_DIR)
  .filter(file => file.endsWith('.json'));

// Process each component
registryFiles.forEach(jsonFile => {
  const componentName = path.basename(jsonFile, '.json');
  const jsonPath = path.join(PUBLIC_REGISTRY_DIR, jsonFile);
  
  // Read the component JSON
  const componentJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Create component directory if it doesn't exist
  const componentDir = path.join(DOCS_COMPONENTS_DIR, componentName);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // Get component code from JSON
  const componentCode = componentJson.files[0].content;
  
  // Parse component code to extract variants and sizes
  const variants = extractVariants(componentCode);
  const sizes = extractSizes(componentCode);
  
  // Generate examples based on variants and sizes
  const examples = generateExamples(componentName, variants, sizes);
  
  // Generate page content
  const pageContent = generatePageContent(
    componentName,
    componentJson.description,
    examples,
    componentCode
  );
  
  // Write the page file
  const pagePath = path.join(componentDir, 'page.tsx');
  fs.writeFileSync(pagePath, pageContent);
  
  console.log(`✅ Generated documentation page for ${componentName}`);
});

console.log(`\n🎉 Documentation generation complete!`);

/**
 * Extract variants from component code
 */
function extractVariants(code) {
  // Find the variants section inside buttonVariants (or similar)
  const variantsMatch = code.match(/variant:\s*{([^}]*)}/s);
  if (!variantsMatch) return ['default'];
  
  const variantsBlock = variantsMatch[1];
  
  // Now extract each variant name defined in the component
  const variantRegex = /\s+(\w+):\s*["|']/g;
  const variantMatches = [];
  let match;
  
  while ((match = variantRegex.exec(variantsBlock)) !== null) {
    variantMatches.push(match[1]);
  }
  
  return variantMatches.length > 0 ? variantMatches : ['default'];
}

/**
 * Extract sizes from component code
 */
function extractSizes(code) {
  const sizesMatch = code.match(/size:\s*{([^}]*)}/s);
  if (!sizesMatch) return ['default'];
  
  const sizesBlock = sizesMatch[1];
  // Extract only the size names (without the comments and values)
  const sizeMatches = Array.from(
    sizesBlock.matchAll(/\s+(\w+):\s*/g),
    m => m[1]
  );
  
  // Return unique sizes
  return [...new Set(sizeMatches)];
}

/**
 * Generate examples based on component properties
 */
function generateExamples(componentName, variants, sizes) {
  const formattedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  const examples = [
    {
      title: "Default",
      value: "default",
      content: `import { ${formattedComponentName} } from "@nativeui/ui";

export default function ${formattedComponentName}Demo() {
  return (
    <${formattedComponentName}>
      Click me
    </${formattedComponentName}>
  );
}`,
      language: "tsx",
    }
  ];
  
  if (variants.length > 1) {
    // Add an example showing each variant
    examples.push({
      title: "Variants",
      value: "variants",
      content: `import { ${formattedComponentName} } from "@nativeui/ui";

export default function ${formattedComponentName}Variants() {
  return (
    <div className="flex flex-col gap-4">
      ${variants.map(v => `<${formattedComponentName} variant="${v}">${v.charAt(0).toUpperCase() + v.slice(1)}</${formattedComponentName}>`).join('\n      ')}
    </div>
  );
}`,
      language: "tsx",
    });
  }
  
  if (sizes.length > 1) {
    // Add an example showing each size
    examples.push({
      title: "Sizes",
      value: "sizes",
      content: `import { ${formattedComponentName} } from "@nativeui/ui";

export default function ${formattedComponentName}Sizes() {
  return (
    <div className="flex items-center gap-4">
      ${sizes.map(s => `<${formattedComponentName} size="${s}">${s === 'icon' ? '👋' : s.charAt(0).toUpperCase() + s.slice(1)}</${formattedComponentName}>`).join('\n      ')}
    </div>
  );
}`,
      language: "tsx",
    });
  }
  
  return examples;
}

/**
 * Generate page content for the component
 */
function generatePageContent(componentName, description, examples, componentCode) {
  const formattedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  // Generate preview code
  const previewCode = `import { ${formattedComponentName} } from "@nativeui/ui";

export default function ${formattedComponentName}Demo() {
  return (
    <div className="flex flex-col gap-4">
      <${formattedComponentName}>Default ${formattedComponentName}</${formattedComponentName}>
      <${formattedComponentName} variant="destructive">Delete</${formattedComponentName}>
      <${formattedComponentName} variant="outline">Outline</${formattedComponentName}>
      <${formattedComponentName} variant="secondary">Secondary</${formattedComponentName}>
      <${formattedComponentName} variant="ghost">Ghost</${formattedComponentName}>
      <${formattedComponentName} variant="link">Link</${formattedComponentName}>
    </div>
  );
}`;

  // Safely escape component code to avoid eval errors
  const safeComponentCode = componentCode
    // Remove dynamic expressions that might reference undefined variables
    .replace(/\${([^}]*)}/g, '""')
    // Ensure proper string escaping
    .replace(/`/g, '\\`');

  return `import { ComponentPreview } from "@/components/docs/component-preview";

export default function ${formattedComponentName}Page() {
  return (
    <ComponentPreview
      name="${formattedComponentName}"
      description="${description}"
      examples={${JSON.stringify(examples, null, 2)}}
      componentCode={\`${safeComponentCode}\`}
      previewCode={\`${previewCode.replace(/`/g, '\\`')}\`}
      registryName="${componentName}"
      packageName="@nativeui/ui"
    />
  );
}
`;
}
