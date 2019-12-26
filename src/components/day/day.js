import {getInfoDate} from '../../utils';

export const getDayTemplate = (date, index) => {
  const {day, month} = getInfoDate(date);

  return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${date}">${month} ${day}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>
  `;
};
