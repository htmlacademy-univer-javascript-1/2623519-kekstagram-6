/* eslint-disable no-console */
// api.js - упрощённая версия
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

// Получение данных с сервера
const getPhotos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке фотографий:', error);
    throw error;
  }
};

// Отправка данных формы на сервер
const sendPhoto = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке фотографии:', error);
    throw error;
  }
};

export { getPhotos, sendPhoto };
