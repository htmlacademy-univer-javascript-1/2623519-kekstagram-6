/* eslint-disable no-use-before-define */
// messages.js - улучшенные сообщения
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Показать кастомное сообщение
const showMessage = (template, customText = null) => {
  const message = template.cloneNode(true);
  if (customText) {
    const messageText = message.querySelector('.success__title, .error__title');
    if (messageText) {
      messageText.textContent = customText;
    }
  }
  document.body.appendChild(message);

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      closeMessage();
    }
  };

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  message.querySelector('button').addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

// Сообщение об успехе
const showSuccessMessage = () => {
  showMessage(successTemplate);
};

// Сообщение об ошибке с кастомным текстом
const showErrorMessage = (customText = 'Ошибка загрузки данных. Пожалуйста, попробуйте ещё раз.') => {
  showMessage(errorTemplate, customText);
};

export { showSuccessMessage, showErrorMessage };
