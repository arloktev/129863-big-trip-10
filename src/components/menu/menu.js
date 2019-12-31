import {createElement} from '../../utils';

const createTabTemplate = (name, activeElement) => {
  const classesElement = activeElement === 0 ? `trip-tabs__btn trip-tabs__btn--active` : `trip-tabs__btn`;

  return `<a class="${classesElement}" href="#">${name}</a>`;
};

const getMenuTemplate = (names) => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${names.map((name, i) => createTabTemplate(name, i)).join(`\n`)}
    </nav>
  `;
};

export default class Menu {
  constructor(names) {
    this._element = null;
    this._names = names;
  }

  getTemplate() {
    return getMenuTemplate(this._names);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getRemove() {
    this._element = null;
  }
}
