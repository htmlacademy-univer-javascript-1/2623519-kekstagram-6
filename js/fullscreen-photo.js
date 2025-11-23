import { createPhotos } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('#picture-cancel');

const COMMENTS_PER_PORTION = 5;
let currentComments = [];
let commentsShown = 0;

// Функция для создания элемента комментария
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`;
  avatar.alt = 'Аватар комментатора';
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.text;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
};

// Функция для отображения комментариев порциями
const renderComments = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);
  const fragment = document.createDocumentFragment();

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
  commentsShown += commentsToShow.length;

  // Обновляем счетчик комментариев
  commentCountBlock.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  // Скрываем кнопку, если все комментарии показаны
  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Обработчик загрузки дополнительных комментариев
const onCommentsLoaderClick = () => {
  renderComments();
};

// Функция для открытия полноразмерного просмотра
const openFullscreenPhoto = (photoId) => {
  const photos = createPhotos();
  const photo = photos.find((item) => item.id === photoId);

  if (!photo) {
    return;
  }

  // Сбрасываем состояние
  currentComments = photo.comments;
  commentsShown = 0;
  socialComments.innerHTML = '';

  // Заполняем данные
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Показываем блоки счётчика комментариев и загрузки
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Отображаем первую порцию комментариев
  renderComments();

  // Добавляем обработчик загрузки комментариев
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  // Показываем модальное окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция для закрытия полноразмерного просмотра
const closeFullscreenPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчик загрузки комментариев
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

// Обработчик закрытия по клику на крестик
cancelButton.addEventListener('click', () => {
  closeFullscreenPhoto();
});

// Обработчик закрытия по клавише Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeFullscreenPhoto();
  }
});

export { openFullscreenPhoto };
