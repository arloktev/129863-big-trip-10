import {createElement} from '../../utils';
import {SVG_ELEMENT} from '../../const';

const createItemSortingTemplate = (name, activeElement) => {

  const [isChecked, svgElement] = activeElement === 0 ? [`checked`, ``] : [``, SVG_ELEMENT];

  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked}>
      <label class="trip-sort__btn" for="sort-${name}">
        ${name}
        ${svgElement}
      </label>
    </div>
  `;
};

const getSortingTemplate = (names) => {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${names.map((name, i) => createItemSortingTemplate(name, i)).join(`\n`)}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  `;
};

export default class Sorting {
  constructor(names) {
    this._element = null;
    this._names = names;
  }

  getTemplate() {
    return getSortingTemplate(this._names);
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
