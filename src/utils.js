export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomElement = (array) => {
  const indexRandom = getRandomBetween(0, array.length);

  return array[indexRandom];
};

export const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setDate(targetDate.getDate() + getRandomBetween(0, 7));
  targetDate.setHours(targetDate.getHours() + getRandomBetween(0, 24));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomBetween(0, 60));

  return targetDate;
};

export const costTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};
