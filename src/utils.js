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

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = costTimeFormat(date.getMonth() + 1);
  const day = costTimeFormat(date.getDate());

  return `${year}-${month}-${day}`;
};

export const formatTime = (date) => {
  const hours = costTimeFormat(date.getHours());
  const minutes = costTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDuration = (startDate, endDate) => {
  const msDay = 60 * 60 * 24 * 1000;
  const durationMs = endDate - startDate;

  const startDateHours = startDate.getHours();
  const endDateHours = endDate.getHours();
  const startDateMinutes = startDate.getMinutes();
  const endDateMinutes = endDate.getMinutes();

  const durationDay = Math.floor(durationMs / msDay);
  const durationHours = (endDateHours > startDateHours) ? endDateHours - startDateHours : 24 - startDateHours + endDateHours;
  const durationMinutes = (endDateMinutes > startDateMinutes) ? endDateMinutes - startDateMinutes : 60 - startDateMinutes + endDateMinutes;

  const showDay = durationDay > 0 ? `${durationDay}D` : ``;

  return `${showDay} ${costTimeFormat(durationHours)}H ${durationMinutes}M`;
};

export const costTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};
