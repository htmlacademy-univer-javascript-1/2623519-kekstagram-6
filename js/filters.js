import { renderThumbnails } from './thumbnails.js';

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let photos = [];
let currentFilter = 'filter-default';
let timeoutId = null;

// Фильтрация
const filterPhotos = (filter) => {
  switch (filter) {
    case 'filter-random':
      return [...photos].sort(() => Math.random() - 0.5).slice(0, 10);
    case 'filter-discussed':
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return photos;
  }
};

// Обновление отображения
const updatePhotos = (filter) => {
  const filteredPhotos = filterPhotos(filter);
  renderThumbnails(filteredPhotos);
};

// Обработчик фильтра
const onFilterClick = (evt) => {
  const target = evt.target;
  if (!target.matches('.img-filters__button') || target.id === currentFilter) {
    return;
  }

  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
  currentFilter = target.id;

  // Устранение дребезга
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => updatePhotos(currentFilter), 500);
};

// Инициализация фильтров
const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
