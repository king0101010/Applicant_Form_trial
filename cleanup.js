const fs = require('fs');
const path = require('path');

// Remove any cached references to i18n
const cleanFiles = [
  'node_modules/.vite',
  'node_modules/.cache',
  'build',
  'dist'
];

cleanFiles.forEach(file => {
  try {
    fs.rmSync(path.resolve(file), { recursive: true, force: true });
    console.log(`Cleaned: ${file}`);
  } catch (e) {
    console.log(`No ${file} to clean`);
  }
});