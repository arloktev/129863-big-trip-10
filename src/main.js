import {getTripRouteTemplate} from './components/trip-route/trip-route';
import {getMenuTemplate} from './components/menu/menu';
import {getFilterTemplate} from './components/filter/filter';
import {getSortingTemplate} from './components/sorting/sorting';
import {getTripDaysTemplate} from './components/trip-days/trip-days';
import {getTripTemplate} from './components/trip/trip';
import {getDayTemplate} from './components/day/day';
import {NAME_FILTERS, NAME_TABS, NAME_SORTING} from './const';
import {formatDate, renderComponent, convertStringToElement} from './utils';
import {events, dates} from './mock/trip';

const tripInfo = document.querySelector(`.trip-main__trip-info`);
const tripCost = document.querySelector(`.trip-info__cost-value`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const lastHeadControls = tripControls.querySelector(`h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);

const NODE_TRIP = {
  tripInfo,
  tripCost,
  tripControls,
  lastHeadControls,
  tripEvents
};

const calculatePrice = (items) => items
  .map((item) => item.price)
  .reduce((sum, current) => sum + current);

const generateDaysFragment = () => {

  const daysFragment = document.createDocumentFragment();

  dates.forEach((date, dateIndex) => {
    const day = convertStringToElement(getDayTemplate(date, dateIndex));
    const tripEventsList = day.querySelector(`.trip-events__list`);

    events
      .filter((event) => formatDate(event.startDate) === date)
      .forEach((event) => {
        tripEventsList.append(convertStringToElement(getTripTemplate(event)));
      });

    daysFragment.append(day);
  });

  return daysFragment;
};

const render = () => {
  renderComponent(NODE_TRIP.tripInfo, getTripRouteTemplate(events), `afterbegin`);
  tripCost.innerHTML = calculatePrice(events);
  renderComponent(lastHeadControls, getMenuTemplate(NAME_TABS), `beforebegin`);
  renderComponent(lastHeadControls, getFilterTemplate(NAME_FILTERS), `afterend`);
  renderComponent(NODE_TRIP.tripEvents, getSortingTemplate(NAME_SORTING), `beforeend`);
  renderComponent(NODE_TRIP.tripEvents, getTripDaysTemplate(), `beforeend`);

  const tripDays = NODE_TRIP.tripEvents.querySelector(`.trip-days`);

  tripDays.append(generateDaysFragment());
};

render();
