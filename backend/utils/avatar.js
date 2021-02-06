const avatars = [
  'https://makeawish.s3.amazonaws.com/seed-data/deer-avatar.png',
  'https://makeawish.s3.amazonaws.com/seed-data/owl-avatar.png',
  'https://makeawish.s3.amazonaws.com/seed-data/bear-avatar.png'
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * Math.floor(avatars.length));
  return avatars[randomIndex];
};

module.exports = {
  getRandomAvatar
};
