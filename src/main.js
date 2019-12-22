import {getTripRouteTemplate} from './components/trip-route/trip-route';
import {getMenuTemplate} from './components/menu/menu';
import {getFilterTemplate} from './components/filter/filter';
import {getSortingTemplate} from './components/sorting/sorting';
import {getTripDaysTemplate} from './components/trip-days/trip-days';
import {getTripTemplate} from './components/trip/trip';
import {getDayTemplate} from './components/day/day';
import {NameFilters, NameTabs, NameSorting} from './const';
import {formatDate} from './utils';
import {events, dates} from './mock/trip';

const tripInfo = document.querySelector(`.trip-main__trip-info`);
const tripCost = document.querySelector(`.trip-info__cost-value`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const lastHeadControls = tripControls.querySelector(`h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);

const renderComponent = (container, template, place) => {
  return container.insertAdjacentHTML(place, template);
};

const calculatePrice = (items) => {
  let result = 0;

  items.forEach((item) => {
    result += item.price;
  });

  return result;
};

const render = () => {
  renderComponent(tripInfo, getTripRouteTemplate(events), `afterbegin`);
  tripCost.innerHTML = calculatePrice(events);
  renderComponent(lastHeadControls, getMenuTemplate(NameTabs), `beforebegin`);
  renderComponent(lastHeadControls, getFilterTemplate(NameFilters), `afterend`);
  renderComponent(tripEvents, getSortingTemplate(NameSorting), `beforeend`);
  renderComponent(tripEvents, getTripDaysTemplate(), `beforeend`);

  const tripDays = tripEvents.querySelector(`.trip-days`);

  dates.forEach((date, dateIndex) => {
    renderComponent(tripDays, getDayTemplate(date, dateIndex), `beforeend`);
    const tripEventsList = tripDays.querySelectorAll(`.trip-events__list`)[dateIndex];

    events
      .filter((event) => formatDate(event.startDate) === date)
      .forEach((event) => {
        renderComponent(tripEventsList, getTripTemplate(event), `beforeend`);
      });
  });
};

render();
