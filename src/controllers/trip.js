import TripRoute from '../components/trip-route/trip-route';
import NoPoints from '../components/no-points/no-points';
import Sorting from '../components/sorting/sorting';
import TripDays from '../components/trip-days/trip-days';
import Day from '../components/day/day';
import {NAME_SORTING} from '../const';
import {formatDate} from '../utils/common';
import {RenderPosition, renderElement} from '../utils/render';
import {dates} from '../mock/trip';
import PointController from './point';

const tripInfo = document.querySelector(`.trip-main__trip-info`);

const generateDaysFragment = (events, onDataChange, onViewChange) => {
  const daysFragment = document.createDocumentFragment();

  dates.forEach((date, dateIndex) => {
    const day = new Day(date, dateIndex).getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);

    events
      .filter((event) => formatDate(event.startDate) === date)
      .forEach((event) => new PointController(tripEventsList, onDataChange, onViewChange).render(event));

    daysFragment.append(day);
  });

  return daysFragment;
};

const generateSingleDaysFragment = (events, onDataChange, onViewChange) => {
  const daysFragment = document.createDocumentFragment();

  events.forEach((event, eventIndex) => {
    const day = new Day(event.startDate, eventIndex).getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);

    new PointController(tripEventsList, onDataChange, onViewChange).render(event);

    daysFragment.append(day);
  });

  return daysFragment;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._showedEventControllers = [];
    this._noPoints = new NoPoints();
    this._sorting = new Sorting(NAME_SORTING);
    this._tripDays = new TripDays();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sorting.setClickHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;

    if (this._events.length < 1) {
      this._container.append(this._noPoints.getElement());

      return;
    }

    renderElement(tripInfo, new TripRoute(this._events).getElement(), RenderPosition.AFTERBEGIN);

    renderElement(this._container, this._sorting.getElement(), RenderPosition.BEFOREEND);
    renderElement(this._container, this._tripDays.getElement(), RenderPosition.BEFOREEND);

    this._tripDays.getElement().append(generateDaysFragment(this._events, this._onDataChange, this._onViewChange));
    // this._showedEventControllers = this._showedEventControllers.concat(this._events);
  }

  _onDataChange(tripController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    tripController.render(this._events[index]);
  }

  _onViewChange() {
    // this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTrips = [];

    switch (sortType) {
      case `time`:
        sortedTrips = this._events.slice().sort((prev, next) => (+(next.endDate - next.startDate) - +(prev.endDate - prev.startDate)));
        break;
      case `price`:
        sortedTrips = this._events.slice().sort((prev, next) => next.price - prev.price);
        break;
      case `event`:
        sortedTrips = this._events;
        break;
    }

    this._tripDays.getElement().innerHTML = ``;

    if (sortType !== `event`) {
      this._tripDays.getElement().append(generateSingleDaysFragment(sortedTrips));
      return;
    }

    this._tripDays.getElement().append(generateDaysFragment(this._events));
  }
}
