import AbstractComponent from '../abstract-component/abstract-component';
import {SVG_ELEMENT} from '../../const';

const createItemSortingTemplate = (name, activeElement) => {

  const [isChecked, svgElement] = activeElement === 0 ? [`checked`, ``] : [``, SVG_ELEMENT];

  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked}>
      <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${name}">
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

export default class Sorting extends AbstractComponent {
  constructor(names) {
    super();

    this._names = names;
    this._currentSortType = `event`;
  }

  getTemplate() {
    return getSortingTemplate(this._names);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const typeSort = evt.target.dataset.sortType;

      if (typeSort === this._defaultSorting) {
        return;
      }

      this._currentSortType = typeSort;
      handler(this._currentSortType);
    });
  }
}
