const fs = require('fs');
const path = require('path');

let logos = [];

function preloadImages() {
  const imagesDir = path.join(__dirname, './images/teams');  
  const files = fs.readdirSync(imagesDir);

  logos = files.map(file => {
    const filePath = path.join(imagesDir, file);
    const image = fs.readFileSync(filePath, { encoding: 'base64' });
    return `data:image/${path.extname(file).slice(1)};base64,${image}`;
  });
}

function getRandomLogo() {
  const randomIndex = Math.floor(Math.random() * logos.length);
  return logos[randomIndex];
}

module.exports = { preloadImages, getRandomLogo };
