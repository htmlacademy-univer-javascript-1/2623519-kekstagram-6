/* eslint-disable no-shadow */
// thumbnails.js - теперь получает реальные данные с сервера
import { openFullscreenPhoto } from './fullscreen-photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  image.loading = 'lazy'; // Добавляем lazy loading

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullscreenPhoto(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  // Проверяем, есть ли фотографии
  if (!photos || photos.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Нет фотографий для отображения';
    emptyMessage.style.cssText = `
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 18px;
    `;
    // Удаляем только миниатюры, оставляя другие элементы
    const existingThumbnails = picturesContainer.querySelectorAll('.picture');
    existingThumbnails.forEach((thumbnail) => thumbnail.remove());
    picturesContainer.appendChild(emptyMessage);
    return;
  }

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  // Удаляем только миниатюры, оставляя другие элементы
  const existingThumbnails = picturesContainer.querySelectorAll('.picture');
  existingThumbnails.forEach((thumbnail) => thumbnail.remove());
  // Добавляем новые миниатюры
  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
