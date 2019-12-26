import {getInfoTrip} from '../../utils';

export const getTripRouteTemplate = (events) => {
  const {tripRoute, tripDuration} = getInfoTrip(events);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>

      <p class="trip-info__dates">${tripDuration}</p>
    </div>
  `;
};
