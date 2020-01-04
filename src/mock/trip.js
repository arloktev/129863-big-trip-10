import {getRandomElement, getRandomBetween, getRandomDate, formatDate, shuffle} from '../utils/common';
import {EventsCount, TYPE_TRIP, CITY} from '../const';

const additionalsOptions = [
  {type: `luggage`, name: `Add luggage`, price: `10`},
  {type: `comfort`, name: `Switch to comfort class`, price: `150`},
  {type: `meal`, name: `Add meal`, price: `2`},
  {type: `seats`, name: `Choose seats`, price: `9`}
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getDescriptionArray = description.split(`. `);

const generateDescription = () => {
  const startValue = 1;
  const endValue = 4;

  return shuffle(getDescriptionArray).slice(0, getRandomBetween(startValue, endValue)).join(`. `);
};

const generateImages = (count) => {
  const result = [];

  for (let i = 0; i <= count; i++) {
    result.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }

  return result;
};

const generateAdditionalsOptions = (array) => {
  const startValue = 0;
  const endValue = 2;

  return array
    .filter(() => Math.random() > 0.5)
    .slice(startValue, endValue);
};

const generateTrip = () => {
  const startValuePrice = 1;
  const endValuePrice = 20;
  const decade = 10;

  const startValueImage = 0;
  const endValueImage = 5;

  const startRandomDate = getRandomDate();
  const endRandomDate = getRandomDate();
  let startDate = new Date();
  let endDate = new Date();
  startDate.setTime(Math.min(startRandomDate, endRandomDate));
  endDate.setTime(Math.max(startRandomDate, endRandomDate));

  return {
    'type': getRandomElement(TYPE_TRIP),
    'city': getRandomElement(CITY),
    'images': generateImages(getRandomBetween(startValueImage, endValueImage)),
    'description': generateDescription(description),
    startDate,
    endDate,
    'price': getRandomBetween(startValuePrice, endValuePrice) * decade,
    'additionalOptions': generateAdditionalsOptions(additionalsOptions)
  };
};

const generateTrips = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateTrip());
  }
  result.sort((prev, next) => prev.startDate - next.startDate);

  return result;
};

const events = generateTrips(EventsCount);
const dates = [...new Set(events
  .map((event) => formatDate(event.startDate))
  .sort((prev, next) => new Date(prev) - new Date(next))
)];

export {events, dates};
