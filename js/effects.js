/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// effects.js - используем глобальный noUiSlider
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
  // Проверяем, что noUiSlider доступен глобально
  if (typeof noUiSlider === 'undefined') {
    console.error('noUiSlider не загружен. Проверьте подключение в HTML.');
    return;
  }

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
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
  const effectConfig = EFFECTS[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effectConfig.min,
      max: effectConfig.max
    },
    start: effectConfig.max,
    step: effectConfig.step
  });
};

// Обработчик выбора эффекта
const onEffectChange = (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    updateSlider(currentEffect);
    if (currentEffect === 'none') {
      uploadPreview.style.filter = 'none';
    } else {
      applyEffect(EFFECTS[currentEffect].max);
    }
  }
};

// Сброс эффектов
const resetEffects = () => {
  currentEffect = 'none';
  const noneEffect = effectsList.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }
  updateSlider('none');
  uploadPreview.style.filter = 'none';
};

// Инициализация
const initEffects = () => {
  // Проверяем, существует ли слайдер
  if (!effectLevelSlider) {
    console.error('Слайдер эффектов не найден');
    return;
  }
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
  resetEffects();
};

// Функция обновления слайдера (для внешнего вызова)
const updateEffectSlider = () => {
  updateSlider(currentEffect);
};

export { initEffects, resetEffects, updateEffectSlider };
