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

export const getInfoDate = (date) => {
  const newDate = new Date(date);
  const month = monthToLocaleShort(newDate);
  const day = newDate.getDate();

  return {
    day,
    month
  };
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

export const shuffle = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};


export const getInfoTrip = (events) => {
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const tripRoute = events.length > 2 ? `${firstEvent.city} &mdash; ... &mdash; ${lastEvent.city}` : `${firstEvent.city} &mdash; ${lastEvent.city}`;

  const firstMonth = monthToLocaleShort(firstEvent.startDate);
  const lastMonth = monthToLocaleShort(lastEvent.startDate);
  const firstDay = firstEvent.startDate.getDate();
  const lastDay = lastEvent.startDate.getDate();
  const tripDuration = `${firstMonth} ${firstDay}&nbsp;&mdash;&nbsp;${firstMonth === lastMonth ? `` : lastMonth} ${lastDay}`;

  return {
    tripRoute,
    tripDuration
  };
};

export const renderComponent = (container, template, place) => {
  return container.insertAdjacentHTML(place, template);
};

export const convertStringToElement = (str) => {
  const template = document.createElement(`template`);
  template.innerHTML = str.trim();
  return template.content.firstChild;
};
