/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// form-upload.js
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { validateForm, resetValidation } from './form-validation.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendPhoto } from './api.js'; // Импортируем функцию sendPhoto

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
const effectsPreviews = uploadOverlay.querySelectorAll('.effects__preview');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const formResetButton = uploadForm.querySelector('.img-upload__cancel');

// Состояние кнопки отправки
const setSubmitButtonState = (isSubmitting) => {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? 'Публикую...' : 'Опубликовать';
};

// Сброс формы к исходному состоянию
const resetForm = () => {
  // Сбрасываем форму
  uploadForm.reset();

  // Сбрасываем предпросмотр
  uploadPreview.src = 'img/upload-default-image.jpg';
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
  resetForm(); // Полный сброс формы
};

// Обработчик выбора файла
const onFileInputChange = (evt) => {
  const file = evt.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPreview.src = reader.result;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
      openUploadForm();
    });
    reader.readAsDataURL(file);
  } else {
    // Показываем ошибку, если файл не изображение
    showErrorMessage('Пожалуйста, выберите файл изображения');
  }
};

// Обработчик ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement.classList.contains('text__hashtags') ||
                          activeElement.classList.contains('text__description');
    if (!isInputFocused) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
};

// Отправка формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  // Валидация формы
  if (!validateForm()) {
    return;
  }

  // Блокируем кнопку отправки
  setSubmitButtonState(true);

  try {
    // Собираем данные формы
    const formData = new FormData(uploadForm);

    // Отправляем данные на сервер
    await sendPhoto(formData);

    // Показываем сообщение об успехе
    showSuccessMessage();

    // Закрываем форму
    closeUploadForm();

  } catch (error) {
    console.error('Ошибка отправки формы:', error);

    // Показываем соответствующее сообщение об ошибке
    if (error.response && error.response.status === 400) {
      showErrorMessage('Ошибка валидации данных. Проверьте правильность заполнения формы.');
    } else if (error.response && error.response.status === 403) {
      showErrorMessage('Доступ запрещён. Возможно, проблема с авторизацией.');
    } else if (error.response && error.response.status === 404) {
      showErrorMessage('Сервер не найден. Проверьте подключение к интернету.');
    } else if (error.response && error.response.status >= 500) {
      showErrorMessage('Ошибка сервера. Пожалуйста, попробуйте позже.');
    } else if (error.message === 'Failed to fetch') {
      showErrorMessage('Проблема с подключением к интернету. Проверьте сеть.');
    } else {
      showErrorMessage('Произошла ошибка при отправке данных. Попробуйте ещё раз.');
    }
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
};

export { initUploadForm, closeUploadForm };
