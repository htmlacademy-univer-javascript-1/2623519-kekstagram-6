const generatePhotosData = () => {
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
    'Павел', 'Юлия', 'Михаил', 'Александр', 'Екатерина'
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
    'Городские огни ночью'
  ];

  const photos = [];
  let commentIdCounter = 1;

  for (let i = 1; i <= 25; i++) {
    const commentsCount = Math.floor(Math.random() * 31);
    const photoComments = [];

    for (let j = 0; j < commentsCount; j++) {
      const randomMessageIndex1 = Math.floor(Math.random() * commentsText.length);
      let message = commentsText[randomMessageIndex1];

      if (Math.random() > 0.5) {
        const randomMessageIndex2 = Math.floor(Math.random() * commentsText.length);
        if (randomMessageIndex2 !== randomMessageIndex1) {
          message += ` ${commentsText[randomMessageIndex2]}`; // Исправлено здесь
        }
      }

      photoComments.push({
        id: commentIdCounter++,
        avatar: `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`,
        message: message,
        name: userNames[Math.floor(Math.random() * userNames.length)]
      });
    }

    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: photoDescriptions[Math.floor(Math.random() * photoDescriptions.length)],
      likes: Math.floor(Math.random() * 186) + 15,
      comments: photoComments
    });
  }

  return photos;
};

// Чтобы избавиться от предупреждения о неиспользуемой переменной,
// можно либо экспортировать данные, либо использовать их:
const photosData = generatePhotosData();
export { photosData };
