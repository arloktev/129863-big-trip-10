import AbstractComponent from '../abstract-component/abstract-component';

const createFilterTemplate = (name, activeElement) => {
  const isChecked = activeElement === 0 ? `checked` : ``;

  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `;
};

const getFilterTemplate = (names) => {
  return `
    <form class="trip-filters" action="#" method="get">
      ${names.map((name, i) => createFilterTemplate(name, i)).join(`\n`)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class Filter extends AbstractComponent {
  constructor(names) {
    super();

    this._names = names;
  }

  getTemplate() {
    return getFilterTemplate(this._names);
  }
}
