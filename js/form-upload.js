/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// form-upload.js
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { validateForm, resetForm as resetValidation } from './form-validation.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendPhoto } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
const effectsPreviews = uploadOverlay.querySelectorAll('.effects__preview');
const submitButton = uploadForm.querySelector('.img-upload__submit');

// Состояние кнопки отправки
const setSubmitButtonState = (isSubmitting) => {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? 'Публикую...' : 'Опубликовать';
};

// Сброс формы к исходному состоянию
const resetForm = () => {
  // Полный сброс формы
  uploadForm.reset();

  // Сбрасываем предпросмотр к дефолтному изображению
  uploadPreview.src = 'img/upload-default-image.jpg';
  uploadPreview.style.transform = '';
  uploadPreview.style.filter = '';

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  // Сбрасываем дополнительные модули
  resetScale();
  resetEffects();
  resetValidation();

  // Очищаем инпут файла
  uploadInput.value = '';
};

// Загрузка и отображение выбранной фотографии
const loadUserPhoto = (file) => new Promise((resolve, reject) => {
  if (!file || !file.type.startsWith('image/')) {
    reject(new Error('Пожалуйста, выберите файл изображения'));
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    // Устанавливаем загруженное изображение в предпросмотр
    uploadPreview.src = reader.result;
    uploadPreview.style.objectFit = 'contain';
    uploadPreview.style.maxWidth = '100%';
    uploadPreview.style.maxHeight = '100%';

    // Устанавливаем фоновое изображение для превью эффектов
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });

    // Сбрасываем масштаб и эффекты для новой фотографии
    resetScale();
    resetEffects();

    resolve();
  });

  reader.addEventListener('error', () => {
    reject(new Error('Ошибка при чтении файла'));
  });

  reader.readAsDataURL(file);
});

// Открытие формы редактирования
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие формы редактирования
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

// Обработчик ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement.classList.contains('text__hashtags') ||
                          activeElement.classList.contains('text__description');
    const isMessageVisible = document.querySelector('.success') || document.querySelector('.error');

    if (isMessageVisible) {
      // Если есть сообщение - закрываем его
      evt.preventDefault();
      const message = document.querySelector('.success, .error');
      if (message) {
        message.remove();
      }
    } else if (!isInputFocused) {
      // Закрываем форму только если не в фокусе поле ввода
      evt.preventDefault();
      closeUploadForm();
    }
  }
};

// Обработчик выбора файла
const onFileInputChange = async (evt) => {
  const file = evt.target.files[0];

  if (!file) {
    return;
  }

  try {
    await loadUserPhoto(file);
    openUploadForm();
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
    showErrorMessage(error.message);
    // Сбрасываем инпут, чтобы можно было снова выбрать файл
    uploadInput.value = '';
  }
};

// Отправка формы - ИСПРАВЛЕННАЯ ВЕРСИЯ
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  // Валидация формы
  if (!validateForm()) {
    console.log('Валидация не пройдена');
    return;
  }

  // Проверяем, что файл был загружен
  if (!uploadInput.files || !uploadInput.files[0]) {
    showErrorMessage('Пожалуйста, выберите фотографию для загрузки');
    return;
  }

  // Блокируем кнопку отправки
  setSubmitButtonState(true);

  try {
    // Создаем FormData ИЗ ФОРМЫ - НЕ ДОБАВЛЯЙТЕ ДОПОЛНИТЕЛЬНЫЕ ПОЛЯ!
    const formData = new FormData(uploadForm);

    // ДЛЯ ОТЛАДКИ: выводим содержимое FormData
    console.log('Отправляемые поля:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}, ${value.type}` : value);
    }

    // Отправляем данные на сервер - ТОЛЬКО форму, без scale и effect!
    await sendPhoto(formData);

    // Показываем сообщение об успехе
    showSuccessMessage();

    // Закрываем форму
    closeUploadForm();

  } catch (error) {
    console.error('Ошибка отправки формы:', error);

    // Определяем конкретную ошибку
    let errorMessage = 'Произошла ошибка при отправке данных. ';

    if (error.message.includes('400')) {
      errorMessage = 'Ошибка 400: Сервер не принял данные. Проверьте:\n' +
                    '1. Файл должен быть изображением (jpg, png, gif)\n' +
                    '2. Максимальный размер файла\n' +
                    '3. Правильность заполнения формы';
    } else if (error.message.includes('403')) {
      errorMessage = 'Доступ запрещён.';
    } else if (error.message.includes('404')) {
      errorMessage = 'Сервер не найден.';
    } else if (error.message.includes('500')) {
      errorMessage = 'Ошибка сервера. Пожалуйста, попробуйте позже.';
    } else if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
      errorMessage = 'Проблема с подключением к интернету. Проверьте сеть.';
    }

    showErrorMessage(errorMessage);

  } finally {
    // Разблокируем кнопку отправки
    setSubmitButtonState(false);
  }
};

// Обработчик сброса формы (кнопка "Отмена")
const onFormReset = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

// Инициализация модуля
const initUploadForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  uploadCancel.addEventListener('click', onFormReset);
  uploadForm.addEventListener('submit', onFormSubmit);
  initScale();
  initEffects();

  // Инициализируем дефолтное состояние
  resetForm();
};

export { initUploadForm, closeUploadForm };
