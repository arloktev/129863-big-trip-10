import {getInfoDate} from '../../utils/common';
import AbstractComponent from '../abstract-component/abstract-component';

const getDayTemplate = (date, index) => {
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

export default class Day extends AbstractComponent {
  constructor(date, index) {
    super();

    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return getDayTemplate(this._date, this._index);
  }
}
