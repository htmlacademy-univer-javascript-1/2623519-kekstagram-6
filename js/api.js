/* eslint-disable no-console */
// api.js - улучшенная версия с диагностикой
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

// Получение данных с сервера
const getPhotos = async () => {
  try {
    console.log('➔ Загрузка фотографий с сервера...');
    const response = await fetch(`${BASE_URL}/data`);

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`➔ Загружено ${data.length} фотографий`);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке фотографий:', error.message);
    throw error;
  }
};

// Отправка данных формы на сервер
const sendPhoto = async (formData) => {
  try {
    console.log('➔ Отправка фотографии на сервер...');

    // Для отладки: показываем содержимое FormData
    if (formData instanceof FormData) {
      console.log('Содержимое FormData:');
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File - ${value.name}, ${value.type}, ${value.size} bytes`);
        } else {
          console.log(`  ${key}: "${value}"`);
        }
      }
    }

    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
      // НЕ устанавливайте Content-Type вручную для FormData!
      // Браузер сделает это автоматически с правильной границей
    });

    console.log(`➔ Ответ сервера: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      // Пробуем получить подробности ошибки от сервера
      let errorDetails = '';
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorDetails = `: ${errorData.message}`;
        }
      } catch (e) {
        // Сервер не вернул JSON
      }

      throw new Error(`Ошибка ${response.status}${errorDetails}`);
    }

    const result = await response.json();
    console.log('➔ Фотография успешно отправлена!', result);
    return result;

  } catch (error) {
    console.error('Ошибка при отправке фотографии:', error.message);
    throw error;
  }
};

export { getPhotos, sendPhoto };
