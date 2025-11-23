//import { generatePhotosData } from './util.js';

//const photosData = generatePhotosData();
//export { photosData };

// main.js
//import { renderThumbnails } from './thumbnails.js';

// Инициализация приложения
//renderThumbnails();

// main.js - ДОЛЖЕН БЫТЬ ТАКИМ
import { renderThumbnails } from './thumbnails.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails();
});
