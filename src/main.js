import {getTripRouteTemplate} from './components/trip-route/trip-route';
import {getMenuTemplate} from './components/menu/menu';
import {getFilterTemplate} from './components/filter/filter';
import {getSortingTemplate} from './components/sorting/sorting';
import {getTripEditTemplate} from './components/trip-edit/trip-edit';
import {getTripDaysTemplate} from './components/trip-days/trip-days';
import {getTripTemplate} from './components/trip/trip';

const COUNT_EVENTS = 3;

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

  for (let i = 0; i < COUNT_EVENTS; i++) {
    fragment.append(convertStringToElement(getTripTemplate()));
  }

  return fragment;
};

const render = () => {
  renderComponent(tripInfo, getTripRouteTemplate(), `afterbegin`);
  renderComponent(lastHeadControls, getMenuTemplate(), `beforebegin`);
  renderComponent(lastHeadControls, getFilterTemplate(), `afterend`);
  renderComponent(tripEvents, getSortingTemplate(), `beforeend`);
  renderComponent(tripEvents, getTripDaysTemplate(), `beforeend`);

  const tripEventsList = document.querySelector(`.trip-events__list`);
  renderComponent(tripEventsList, getTripEditTemplate(), `beforeend`);
  tripEventsList.append(renderEvents());
};

render();
