import { initUploadForm } from './form-upload.js';
import { initFormValidation } from './form-validation.js';
import { renderThumbnails } from './thumbnails.js';
import { initFilters } from './filters.js';

// Загрузка данных с сервера
const loadPhotos = async () => {
  try {
    const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram/data');
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const photos = await response.json();
    renderThumbnails(photos);
    initFilters(photos);
  } catch (error) {
    // Показываем сообщение об ошибке загрузки
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ff6b6b;
      color: white;
      padding: 20px;
      border-radius: 5px;
      z-index: 1000;
    `;
    errorMessage.textContent = 'Ошибка загрузки фотографий';
    document.body.appendChild(errorMessage);
  }
};

// Инициализация приложения
const initApp = () => {
  initUploadForm();
  initFormValidation();
  loadPhotos();
};

document.addEventListener('DOMContentLoaded', initApp);
