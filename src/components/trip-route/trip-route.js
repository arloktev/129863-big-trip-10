import {monthToLocaleShort} from '../../utils';

export const getTripRouteTemplate = (events) => {
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const tripRoute = events.length > 2 ? `${firstEvent.city} &mdash; ... &mdash; ${lastEvent.city}` : `${firstEvent.city} &mdash; ${lastEvent.city}`;

  const firstMonth = monthToLocaleShort(firstEvent.startDate);
  const lastMonth = monthToLocaleShort(lastEvent.startDate);
  const firstDay = firstEvent.startDate.getDate();
  const lastDay = lastEvent.startDate.getDate();
  const tripDuration = `${firstMonth} ${firstDay}&nbsp;&mdash;&nbsp;${firstMonth === lastMonth ? `` : lastMonth} ${lastDay}`;

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>

      <p class="trip-info__dates">${tripDuration}</p>
    </div>
  `;
};
