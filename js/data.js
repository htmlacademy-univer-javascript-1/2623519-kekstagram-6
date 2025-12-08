import { getRandomInteger, getRandomArrayElement } from './util.js';

const commentsText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const userNames = [
  'Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей',
  'Елена', 'Алексей', 'Ольга', 'Иван', 'Наталья',
  'Павел', 'Юлия', 'Михаил', 'Александр', 'Екатерина',
  'Владимир', 'Светлана', 'Николай', 'Татьяна', 'Андрей'
];

const photoDescriptions = [
  'Прекрасный закат на море',
  'Горный пейзаж в утреннем тумане',
  'Улочки старого города',
  'Кофе в уютном кафе',
  'Прогулка по осеннему парку',
  'Архитектура современного мегаполиса',
  'Момент из путешествия',
  'Уютный домашний вечер',
  'Природа в её лучшем проявлении',
  'Городские огни ночью',
  'Летний день на пляже',
  'Зимняя сказка в лесу',
  'Вкусный ужин в ресторане',
  'Спортивные достижения',
  'Творческий процесс',
  'Встреча с друзьями',
  'Романтический вечер',
  'Приключения на природе',
  'Рабочий момент',
  'Отдых на даче',
  'Любимое хобби',
  'Семейные ценности',
  'Экзотические места',
  'Исторические памятники',
  'Современное искусств.'
];

const generateComment = (id) => {
  let message = getRandomArrayElement(commentsText);

  if (Math.random() > 0.5) {
    const secondMessage = getRandomArrayElement(commentsText);
    if (secondMessage !== message) {
      message += ` ${secondMessage}`;
    }
  }

  return {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomArrayElement(userNames)
  };
};

const generateComments = (count) => {
  const comments = [];
  const commentId = getRandomInteger(1, 1000);

  for (let i = 0; i < count; i++) {
    comments.push(generateComment(commentId + i));
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

export { commentsText, userNames, photoDescriptions, generatePhotosData };
