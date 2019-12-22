import {SvgElement} from '../../const';

const createItemSortingTemplate = (name, activeElement) => {

  const isChecked = activeElement === 0 ? `checked` : ``;
  const showSvgElement = activeElement === 0 ? `` : SvgElement;

  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked}>
      <label class="trip-sort__btn" for="sort-${name}">
        ${name}
        ${showSvgElement}
      </label>
    </div>
  `;
};

export const getSortingTemplate = (names) => {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${names.map((name, i) => createItemSortingTemplate(name, i)).join(`\n`)}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  `;
};
