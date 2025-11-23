import { createPhotos } from './data.js';
import { openFullscreenPhoto } from './fullscreen-photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание DOM-элемента на основе данных фотографии
const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  // Добавляем обработчик клика для открытия полноразмерного просмотра
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullscreenPhoto(photo.id);
  });

  return thumbnail;
};

// Отрисовка миниатюр
const renderThumbnails = () => {
  const photos = createPhotos();
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
