import { commentsText, userNames, photoDescriptions } from './data.js';

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    let message = getRandomArrayElement(commentsText);
    if (Math.random() > 0.5) {
      const secondMessage = getRandomArrayElement(commentsText);
      if (secondMessage !== message) {
        message += ` ${secondMessage}`;
      }
    }

    comments.push({
      id: i + 1,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: getRandomArrayElement(userNames)
    });
  }
  return comments;
};

const generatePhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomInteger(15, 200),
  comments: generateComments(getRandomInteger(0, 30))
});

const generatePhotosData = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(generatePhoto(i));
  }
  return photos;
};

export { getRandomInteger, getRandomArrayElement, generatePhotosData };
