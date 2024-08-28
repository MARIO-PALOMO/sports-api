const fs = require('fs');
const path = require('path');

let logos = [];

// Definir preloadImages como función asíncrona
async function preloadImages() {
  try {
    const imagesDir = path.join(__dirname, './images/teams');  
    const files = fs.readdirSync(imagesDir);

    logos = files.map(file => {
      const filePath = path.join(imagesDir, file);
      const image = fs.readFileSync(filePath, { encoding: 'base64' });
      return `data:image/${path.extname(file).slice(1)};base64,${image}`;
    });
  } catch (error) {
    console.error('Error preloading images:', error);
    throw error;  // Lanzar el error para que pueda ser capturado
  }
}

function getRandomLogo() {
  const randomIndex = Math.floor(Math.random() * logos.length);
  return logos[randomIndex];
}

function getLogoBase64(filename) {
  const filePath = path.join(__dirname, './images/teams', filename);
  const fileContent = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileContent.toString('base64')}`;
}

module.exports = { preloadImages, getRandomLogo, getLogoBase64 };
