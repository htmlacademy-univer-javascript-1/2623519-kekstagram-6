/* eslint-disable no-unused-vars */
const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const uploadPreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
let currentScale = 100;

// Обновление масштаба
const updateScale = (value) => {
  currentScale = value;
  scaleControl.value = `${value}%`;
  uploadPreview.style.transform = `scale(${value / 100})`;
};

// Уменьшение масштаба
const onScaleSmallerClick = () => {
  const newScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newScale);
};

// Увеличение масштаба
const onScaleBiggerClick = () => {
  const newScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newScale);
};

// Сброс масштаба
const resetScale = () => {
  updateScale(SCALE_MAX);
};

// Инициализация
const initScale = () => {
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  resetScale();
};

// Функция масштабирования изображения (для внешнего вызова)
const scaleImage = (value) => {
  updateScale(value);
};

export { initScale, resetScale, scaleImage };
