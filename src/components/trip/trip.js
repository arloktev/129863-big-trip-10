import {ucFirst, costTimeFormat} from '../../utils';

const createOfferTemplate = (offer) => {
  const {name, price} = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>
  `;
};

const createOffersTemplate = (options) => {
  return options
    .map((offer) => createOfferTemplate(offer))
    .join(`\n`);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = costTimeFormat(date.getMonth() + 1);
  const day = costTimeFormat(date.getDate());
  const hours = costTimeFormat(date.getHours());
  const minutes = costTimeFormat(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formatTime = (date) => {
  const hours = costTimeFormat(date.getHours());
  const minutes = costTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatDuration = (startDate, endDate) => {
  const msDay = 60 * 60 * 24 * 1000;
  const durationMs = endDate - startDate;

  const startDateHours = startDate.getHours();
  const endDateHours = endDate.getHours();
  const startDateMinutes = startDate.getMinutes();
  const endDateMinutes = endDate.getMinutes();

  const durationDay = Math.floor(durationMs / msDay);
  const durationHours = (endDateHours > startDateHours) ? endDateHours - startDateHours : 24 - startDateHours + endDateHours;
  const durationMinutes = (endDateMinutes > startDateMinutes) ? endDateMinutes - startDateMinutes : 60 - startDateMinutes + endDateMinutes;

  const showDay = durationDay > 0 ? `${durationDay}D` : ``;

  return `${showDay} ${costTimeFormat(durationHours)}H ${durationMinutes}M`;
};

export const getTripTemplate = (trip) => {
  const {type, city, price, additionalOptions, date} = trip;

  let startDate = new Date();
  let endDate = new Date();
  startDate.setTime(Math.min(date.start, date.end));
  endDate.setTime(Math.max(date.start, date.end));

  const offersMarkup = createOffersTemplate(additionalOptions);

  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${ucFirst(type)} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(startDate)}">${formatTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(endDate)}">${formatTime(endDate)}</time>
          </p>
          <p class="event__duration">${formatDuration(startDate, endDate)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};
