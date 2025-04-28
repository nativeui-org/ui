const { execSync } = require('child_process');
const path = require('path');

console.log('🔄 Updating component registry and documentation...\n');

// Step 1: Build the registry JSON files
console.log('📦 Building component registry...');
try {
  execSync('node scripts/build-registry.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to build component registry:', error);
  process.exit(1);
}

// Step 2: Generate documentation pages
console.log('\n📝 Generating component documentation...');
try {
  execSync('node scripts/generate-component-docs.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to generate component documentation:', error);
  process.exit(1);
}

console.log('\n✨ Component update complete! The registry and documentation have been updated.');
console.log('   You can now run "npm run dev" to see the changes in your site.'); 