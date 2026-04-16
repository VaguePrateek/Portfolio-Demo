const fs = require('fs');
const path = require('path');

// 1. Generate config.js
const config = `
const ENV = Object.freeze({
  EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY || ''}",
  EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID || ''}",
  EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID || ''}",
});
`;
fs.writeFileSync('config.js', config.trim());
console.log("config.js successfully generated from Vercel Environment Variables.");

// 2. Vercel Output Folder Fix
// Because we have a build script, Vercel expects a 'public' output directory.
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Copy all necessary files into the public directory
const files = fs.readdirSync('.');
const staticExtensions = ['.html', '.css', '.png', '.jpg', '.js'];

for (const file of files) {
  // We only copy static assets to the public folder, ignoring build.js itself
  if (staticExtensions.includes(path.extname(file)) && file !== 'build.js') {
    fs.copyFileSync(file, path.join('public', file));
  }
}

console.log("Successfully copied static files to the public/ directory for Vercel deployment.");
