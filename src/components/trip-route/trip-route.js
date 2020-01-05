import AbstractComponent from '../abstract-component/abstract-component';
import {getInfoTrip} from '../../utils/common';

const getTripRouteTemplate = (events) => {
  const {tripRoute, tripDuration} = getInfoTrip(events);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>

      <p class="trip-info__dates">${tripDuration}</p>
    </div>
  `;
};

export default class TripRoute extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return getTripRouteTemplate(this._events);
  }
}
