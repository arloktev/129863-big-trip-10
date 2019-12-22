import {monthToLocaleShort} from '../../utils';

export const getDayTemplate = (date, index) => {
  const newDate = new Date(date);
  const month = monthToLocaleShort(newDate);
  const day = newDate.getDate();

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
