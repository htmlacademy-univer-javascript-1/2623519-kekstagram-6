const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Показать сообщение
const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      // eslint-disable-next-line no-use-before-define
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

// Сообщение об ошибке
const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
