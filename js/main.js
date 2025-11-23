/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// main.js
import { initUploadForm } from './form-upload.js';
import { initFormValidation, validateForm } from './form-validation.js';
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
    showLoadError();
  }
};

const showLoadError = () => {
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
    text-align: center;
  `;
  errorMessage.innerHTML = `
    <p>Ошибка загрузки фотографий</p>
    <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 5px 10px;">OK</button>
  `;
  document.body.appendChild(errorMessage);
};

// Инициализация приложения
const initApp = () => {
  // Проверяем, что библиотеки загружены
  if (typeof noUiSlider === 'undefined') {
    console.error('noUiSlider не загружен');
  }
  if (typeof Pristine === 'undefined') {
    console.error('Pristine не загружен');
  }
  initUploadForm();
  initFormValidation();
  loadPhotos();
};

document.addEventListener('DOMContentLoaded', initApp);

export { validateForm };
