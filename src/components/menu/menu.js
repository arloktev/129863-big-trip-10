const createTabTemplate = (name, activeElement) => {
  const classesElement = activeElement === 0 ? `trip-tabs__btn trip-tabs__btn--active` : `trip-tabs__btn`;

  return `<a class="${classesElement}" href="#">${name}</a>`;
};

export const getMenuTemplate = (names) => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${names.map((name, i) => createTabTemplate(name, i)).join(`\n`)}
    </nav>
  `;
};
