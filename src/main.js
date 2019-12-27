import TripRoute from './components/trip-route/trip-route';
import Menu from './components/menu/menu';
import Filter from './components/filter/filter';
import Sorting from './components/sorting/sorting';
import TripDays from './components/trip-days/trip-days';
import Trip from './components/trip/trip';
import Day from './components/day/day';
import {NAME_FILTERS, NAME_TABS, NAME_SORTING} from './const';
import {formatDate, RenderPosition, renderElement} from './utils';
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
    const day = new Day(date, dateIndex).getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);

    events
      .filter((event) => formatDate(event.startDate) === date)
      .forEach((event) => {
        renderElement(tripEventsList, new Trip(event).getElement(), RenderPosition.BEFOREEND);
      });

    daysFragment.append(day);
  });

  return daysFragment;
};

const render = () => {
  renderElement(NODE_TRIP.tripInfo, new TripRoute(events).getElement(), RenderPosition.AFTERBEGIN);
  tripCost.innerHTML = calculatePrice(events);
  renderElement(NODE_TRIP.lastHeadControls, new Menu(NAME_TABS).getElement(), RenderPosition.BEFOREBEGIN);
  renderElement(NODE_TRIP.lastHeadControls, new Filter(NAME_FILTERS).getElement(), RenderPosition.AFTEREND);
  renderElement(NODE_TRIP.tripEvents, new Sorting(NAME_SORTING).getElement(), RenderPosition.BEFOREEND);
  renderElement(NODE_TRIP.tripEvents, new TripDays().getElement(), RenderPosition.BEFOREEND);

  const tripDays = NODE_TRIP.tripEvents.querySelector(`.trip-days`);

  tripDays.append(generateDaysFragment());
};

render();
