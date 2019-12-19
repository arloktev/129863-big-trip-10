import {ucFirst, formatDate, formatTime, formatDuration, costTimeFormat} from '../../utils';

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
            <time class="event__start-time" datetime="${formatDate(startDate)}T${formatTime(startDate)}">${formatTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(endDate)}T${formatTime(endDate)}">${formatTime(endDate)}</time>
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
