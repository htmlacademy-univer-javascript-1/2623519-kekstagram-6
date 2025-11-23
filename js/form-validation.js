/* eslint-disable no-console */
// form-validation.js - используем глобальный Pristine
const Pristine = window.Pristine;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

let pristine;

// Валидация хэш-тегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  // Проверка количества
  if (hashtags.length > 5) {
    return false;
  }

  // Проверка уникальности
  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  // Проверка формата
  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

// Валидация комментария
const validateComment = (value) => value.length <= 140;

// Сообщения об ошибках
const getHashtagErrorMessage = () => {
  const hashtags = hashtagInput.value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Не более 5 хэш-тегов';
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return 'Некорректный хэш-тег. Формат: #тег (только буквы и цифры)';
};

// Инициализация валидации
const initValidation = () => {
  // Проверяем, что Pristine доступен
  if (typeof Pristine === 'undefined') {
    console.error('Pristine не загружен. Проверьте подключение в HTML.');
    return;
  }

  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error-text'
  });

  pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);
  pristine.addValidator(commentInput, validateComment, 'Не более 140 символов');
};

// Валидация формы
const validateForm = () => {
  if (!pristine) {
    console.error('Pristine не инициализирован');
    return false;
  }
  return pristine.validate();
};

// Сброс валидации - ИСПРАВЛЕНО ИМЯ ФУНКЦИИ
const resetValidation = () => {
  if (pristine) {
    pristine.reset();
  }
};

// Инициализация
const initFormValidation = () => {
  initValidation();
};

// ЭКСПОРТИРУЕМ resetValidation вместо resetForm
export { initFormValidation, validateForm, resetValidation };
