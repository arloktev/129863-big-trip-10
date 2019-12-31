import {getInfoTrip, createElement} from '../../utils';

const getTripRouteTemplate = (events) => {
  const {tripRoute, tripDuration} = getInfoTrip(events);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>

      <p class="trip-info__dates">${tripDuration}</p>
    </div>
  `;
};

export default class TripRoute {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return getTripRouteTemplate(this._events);
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
