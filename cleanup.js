// This is just a reference script to manually clean up empty directories
// You would run this with Node.js to remove empty directories
const fs = require("fs")
const path = require("path")

const dirsToRemove = ["src/pages", "src/entities", "src/features"]

dirsToRemove.forEach((dir) => {
  try {
    fs.rmdirSync(dir, { recursive: true })
    console.log(`Removed directory: ${dir}`)
  } catch (err) {
    console.error(`Error removing directory ${dir}:`, err)
  }
})
