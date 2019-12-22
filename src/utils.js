import {CountTime} from './const';

export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomElement = (array) => array[getRandomBetween(0, array.length)];

export const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setDate(targetDate.getDate() + getRandomBetween(0, CountTime.DAYS));
  targetDate.setHours(targetDate.getHours() + getRandomBetween(0, CountTime.HOURS));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomBetween(0, CountTime.MINUTES));

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
  const msSecond = 1000;
  const msMinute = CountTime.SECONDS * msSecond;
  const msHour = CountTime.MINUTES * msMinute;
  const msDay = CountTime.HOURS * msHour;
  const durationMs = endDate - startDate;

  const startDateHours = startDate.getHours();
  const endDateHours = endDate.getHours();
  const startDateMinutes = startDate.getMinutes();
  const endDateMinutes = endDate.getMinutes();

  const durationDay = Math.floor(durationMs / msDay);
  const durationHours = (endDateHours > startDateHours) ? endDateHours - startDateHours : CountTime.HOURS - startDateHours + endDateHours;
  const durationMinutes = (endDateMinutes > startDateMinutes) ? endDateMinutes - startDateMinutes : CountTime.MINUTES - startDateMinutes + endDateMinutes;

  const showDay = durationDay > 0 ? `${durationDay}D` : ``;

  return `${showDay} ${costTimeFormat(durationHours)}H ${durationMinutes}M`;
};

export const costTimeFormat = (value) => value < 10 ? `0${value}` : value;

export const monthToLocaleShort = (date) => date.toLocaleString(`en`, {month: `short`});

export const createListTemplate = (items, callback) => {
  return items
    .map((item, index) => callback(item, index))
    .join(`\n`);
};
