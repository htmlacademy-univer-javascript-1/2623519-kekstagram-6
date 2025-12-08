import { renderThumbnails } from './thumbnails.js';

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let photos = [];
let currentFilter = 'filter-default';
let timeoutId = null;

// Фильтрация
const filterPhotos = (filter) => {
  switch (filter) {
    case 'filter-random': {
      // Создаем копию массива и выбираем 10 случайных уникальных фотографий
      const shuffled = [...photos].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10);
    }
    case 'filter-discussed': {
      // Сортируем по количеству комментариев (убывание)
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    }
    default:
      // Оригинальный порядок
      return photos;
  }
};

// Обновление отображения
const updatePhotos = (filter) => {
  const filteredPhotos = filterPhotos(filter);
  // Удаляем все существующие миниатюры
  const picturesContainer = document.querySelector('.pictures');
  const allThumbnails = picturesContainer.querySelectorAll('.picture');
  allThumbnails.forEach((thumbnail) => thumbnail.remove());

  // Отрисовываем новые
  renderThumbnails(filteredPhotos);
};

// Обработчик фильтра
const onFilterClick = (evt) => {
  const target = evt.target;
  if (!target.matches('.img-filters__button') || target.id === currentFilter) {
    return;
  }

  // Обновляем активную кнопку
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
  currentFilter = target.id;

  // Устранение дребезга с таймаутом 500мс
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    updatePhotos(currentFilter);
    timeoutId = null;
  }, 500);
};

// Инициализация фильтров
const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  // Показываем фильтры после загрузки
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
