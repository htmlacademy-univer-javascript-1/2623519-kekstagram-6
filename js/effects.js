/* eslint-disable no-use-before-define */
import noUiSlider from 'noUiSlider';
import 'noUiSlider/dist/nouislider.css';

const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const uploadPreview = document.querySelector('.img-upload__preview img');

const EFFECTS = {
  none: { min: 0, max: 100, step: 1, filter: '', unit: '' },
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness', unit: '' }
};

let currentEffect = 'none';

// Инициализация слайдера
const initSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
    applyEffect(value);
  });
};

// Применение эффекта
const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];
  if (currentEffect === 'none') {
    uploadPreview.style.filter = 'none';
    return;
  }

  uploadPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

// Обновление слайдера
const updateSlider = (effect) => {
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    return;
  }

  effectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: EFFECTS[effect].min, max: EFFECTS[effect].max },
    start: EFFECTS[effect].max,
    step: EFFECTS[effect].step
  });
};

// Обработчик выбора эффекта
const onEffectChange = (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    updateSlider(currentEffect);
    applyEffect(EFFECTS[currentEffect].max);
  }
};

// Сброс эффектов
const resetEffects = () => {
  currentEffect = 'none';
  effectsList.querySelector('#effect-none').checked = true;
  updateSlider('none');
  applyEffect(0);
};

// Инициализация
const initEffects = () => {
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
  resetEffects();
};

export { initEffects, resetEffects };
