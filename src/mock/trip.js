import {getRandomElement, getRandomBetween, getRandomDate, formatDate} from '../utils';
import {EventsCount, TypeTrip, City} from '../const';

const additionalsOptions = [
  {type: `luggage`, name: `Add luggage`, price: `10`},
  {type: `comfort`, name: `Switch to comfort class`, price: `150`},
  {type: `meal`, name: `Add meal`, price: `2`},
  {type: `seats`, name: `Choose seats`, price: `9`}
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const generateDescription = (text) => {
  const array = text.split(`. `);

  return shuffle(array).slice(0, getRandomBetween(1, 4)).join(`. `);
};

const generateImages = (count) => {
  const result = [];

  for (let i = 0; i <= count; i++) {
    result.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }

  return result;
};

const generateAdditionalsOptions = (array) => {
  return array
    .filter(() => Math.random() > 0.5)
    .slice(0, 2);
};

const generateTrip = () => {
  return {
    'type': getRandomElement(TypeTrip),
    'city': getRandomElement(City),
    'images': generateImages(getRandomBetween(0, 5)),
    'description': generateDescription(description),
    'date': {
      'start': getRandomDate(),
      'end': getRandomDate()
    },
    'price': getRandomBetween(1, 20) * 10,
    'additionalOptions': generateAdditionalsOptions(additionalsOptions)
  };
};

const generateTrips = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateTrip());
  }

  result.sort(({date}) => date.start - date.end);

  return result;
};

const events = generateTrips(EventsCount);
const dates = [...new Set(events.map((event) => formatDate(event.date.start)))];

export {events, dates};
