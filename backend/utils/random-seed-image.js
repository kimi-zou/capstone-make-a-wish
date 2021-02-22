const avatars = [
  'https://makeawish.s3.amazonaws.com/seed-data/deer-avatar.png',
  'https://makeawish.s3.amazonaws.com/seed-data/owl-avatar.png',
  'https://makeawish.s3.amazonaws.com/seed-data/bear-avatar.png'
];

const gifts = [
  'https://makeawish.s3.amazonaws.com/seed-data/gift-1.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-2.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-3.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-4.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-5.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-6.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-7.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-8.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-9.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-10.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-11.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-12.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-13.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-14.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-15.png',
  'https://makeawish.s3.amazonaws.com/seed-data/gift-16.png'
];

const getRandomImages = (type) => {
  const randomIndex = Math.floor(Math.random() * Math.floor(type.length));
  return type[randomIndex];
};

module.exports = {
  avatars,
  gifts,
  getRandomImages
};
