import {getTripRouteTemplate} from './components/trip-route/trip-route';
import {getMenuTemplate} from './components/menu/menu';
import {getFilterTemplate} from './components/filter/filter';
import {getSortingTemplate} from './components/sorting/sorting';
import {getTripEditTemplate} from './components/trip-edit/trip-edit';
import {getTripDaysTemplate} from './components/trip-days/trip-days';
import {getDayTemplate} from './components/day/day';
import {NameFilters, NameTabs, NameSorting, EventsCount} from './const';
import {formatDate} from './utils';
import {getTripTemplate} from './components/trip/trip';
import {events, dates} from './mock/trip';

const tripInfo = document.querySelector(`.trip-main__trip-info`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const lastHeadControls = tripControls.querySelector(`h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);

const renderComponent = (container, template, place) => {
  return container.insertAdjacentHTML(place, template);
};

const convertStringToElement = (str) => {
  const template = document.createElement(`template`);
  template.innerHTML = str.trim();
  return template.content.firstChild;
};

const renderEvents = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i < EventsCount; i++) {
    fragment.append(convertStringToElement(getTripTemplate(events[i])));
  }

  return fragment;
};

const render = () => {
  renderComponent(tripInfo, getTripRouteTemplate(), `afterbegin`);
  renderComponent(lastHeadControls, getMenuTemplate(NameTabs), `beforebegin`);
  renderComponent(lastHeadControls, getFilterTemplate(NameFilters), `afterend`);
  renderComponent(tripEvents, getSortingTemplate(NameSorting), `beforeend`);
  renderComponent(tripEvents, getTripDaysTemplate(), `beforeend`);

  const tripDays = tripEvents.querySelector(`.trip-days`);

  dates.forEach((date, dateIndex) => {
    renderComponent(tripDays, getDayTemplate(date, dateIndex), `beforeend`);
    const tripEventsList = tripDays.querySelector(`.trip-events__list`);

    const sortedEvents = events
      .filter((event) => formatDate(event.date.start) === date)
      .forEach((event, index) => {
        tripEventsList[dateIndex].append(convertStringToElement(getTripTemplate(event[index])));
      });
  });


  // renderComponent(tripEventsList, getTripEditTemplate(events[0]), `beforeend`);
  // tripEventsList.append(renderEvents());
};

render();
