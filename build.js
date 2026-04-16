const fs = require('fs');

const config = `
const ENV = Object.freeze({
  EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY || ''}",
  EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID || ''}",
  EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID || ''}",
});
`;

fs.writeFileSync('config.js', config.trim());
console.log("config.js successfully generated from Vercel Environment Variables.");
