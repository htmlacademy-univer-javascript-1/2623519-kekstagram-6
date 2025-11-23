/* eslint-disable no-use-before-define */
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { validateForm, resetValidation } from './form-validation.js'; // ИСПРАВЛЕНО ИМЯ
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
const effectsPreviews = uploadOverlay.querySelectorAll('.effects__preview');

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
  uploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation(); // ИСПРАВЛЕНО ИМЯ
};

// Обработчик выбора файла
const onFileInputChange = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPreview.src = reader.result;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
      openUploadForm();
    });
    reader.readAsDataURL(file);
  }
};

// Обработчик ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;
    if (!activeElement.classList.contains('text__hashtags') &&
        !activeElement.classList.contains('text__description')) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
};

// Отправка формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    return;
  }

  const submitButton = uploadForm.querySelector('.img-upload__submit');
  submitButton.disabled = true;

  try {
    const formData = new FormData(uploadForm);
    const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки');
    }

    showSuccessMessage();
    closeUploadForm();
  } catch (error) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
};

// Инициализация модуля
const initUploadForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  uploadCancel.addEventListener('click', closeUploadForm);
  uploadForm.addEventListener('submit', onFormSubmit);
  initScale();
  initEffects();
};

export { initUploadForm, closeUploadForm };
