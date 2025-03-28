const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create a placeholder image with text
function createPlaceholderImage(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#4285F4';
  ctx.fillRect(0, 0, width, height);

  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = `${Math.floor(width/10)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width/2, height/2);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, filename), buffer);
  console.log(`Created ${filename}`);
}

// Create placeholder images for various assets
createPlaceholderImage(1024, 1024, 'Icon', 'default-icon.png');
createPlaceholderImage(1024, 1024, 'Adaptive Icon', 'default-adaptive-icon.png');
createPlaceholderImage(2048, 2048, 'Splash', 'default-splash.png');
createPlaceholderImage(192, 192, 'Favicon', 'default-favicon.png');

console.log("Placeholder assets generated successfully!");
