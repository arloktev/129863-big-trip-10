import {createElement, getInfoDate} from '../../utils';

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

export default class Day {
  constructor(date, index) {
    this._element = null;
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return getDayTemplate(this._date, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
