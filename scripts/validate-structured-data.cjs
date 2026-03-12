/* global __dirname, console, process */
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(filePath, "utf-8");

const hasJsonLd = /<script type="application\/ld\+json">/.test(html);

if (!hasJsonLd) {
  console.error("Structured data JSON-LD script tag not found in index.html");
  process.exit(1);
}

console.log("Structured data JSON-LD tag found.");
