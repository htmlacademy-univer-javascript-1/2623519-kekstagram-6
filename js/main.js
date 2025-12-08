/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
// main.js
import { initUploadForm } from './form-upload.js';
import { initFormValidation } from './form-validation.js';
import { renderThumbnails } from './thumbnails.js';
import { initFilters } from './filters.js';
import { getPhotos } from './api.js';

// Загрузка данных с сервера
const loadPhotos = async () => {
  try {
    showLoadingIndicator(true);
    const photos = await getPhotos();
    renderThumbnails(photos);
    initFilters(photos);
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    showLoadError();
  } finally {
    // Скрываем индикатор загрузки
    showLoadingIndicator(false);
  }
};

// Показать индикатор загрузки
const showLoadingIndicator = (isLoading) => {
  let loadingIndicator = document.querySelector('.loading-indicator');

  if (isLoading) {
    if (!loadingIndicator) {
      loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Загрузка фотографий...</p>
      `;
      loadingIndicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        text-align: center;
      `;

      const spinner = loadingIndicator.querySelector('.loading-spinner');
      spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px;
      `;

      // Добавляем анимацию для спиннера
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(loadingIndicator);
    }
  } else if (loadingIndicator) {
    loadingIndicator.remove();
  }
};

// Показать сообщение об ошибке загрузки
const showLoadError = () => {
  // Проверяем, нет ли уже сообщения об ошибке
  if (document.querySelector('.load-error')) {
    return;
  }

  const errorElement = document.createElement('div');
  errorElement.className = 'load-error';
  errorElement.innerHTML = `
    <div class="error-message">
      <p>Не удалось загрузить фотографии</p>
      <button class="retry-button">Попробовать снова</button>
    </div>
  `;

  errorElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    text-align: center;
    max-width: 400px;
  `;

  // Кнопка "Попробовать снова"
  const retryButton = errorElement.querySelector('.retry-button');
  retryButton.style.cssText = `
    margin-top: 15px;
    padding: 10px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  `;

  retryButton.addEventListener('click', () => {
    errorElement.remove();
    loadPhotos();
  });

  document.body.appendChild(errorElement);
};

// Инициализация приложения
const initApp = () => {
  // Проверяем наличие библиотек
  if (typeof noUiSlider === 'undefined') {
    console.error('noUiSlider не загружен. Проверьте подключение в HTML.');
    showErrorMessage('Библиотека слайдера не загружена. Проверьте подключение к интернету.');
    return;
  }

  if (typeof Pristine === 'undefined') {
    console.error('Pristine не загружен. Проверьте подключение в HTML.');
    showErrorMessage('Библиотека валидации не загружена. Проверьте подключение к интернету.');
    return;
  }

  // Инициализируем модули
  initUploadForm();
  initFormValidation();
  loadPhotos();
};

// Импортируем showErrorMessage из messages.js
import { showErrorMessage } from './messages.js';

document.addEventListener('DOMContentLoaded', initApp);

