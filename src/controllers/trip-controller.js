import TripRoute from '../components/trip-route/trip-route';
import NoPoints from '../components/no-points/no-points';
import Sorting from '../components/sorting/sorting';
import TripDays from '../components/trip-days/trip-days';
import Trip from '../components/trip/trip';
import TripEdit from '../components/trip-edit/trip-edit';
import Day from '../components/day/day';
import {NAME_SORTING} from '../const';
import {formatDate} from '../utils/common';
import {RenderPosition, replaceElement, renderElement} from '../utils/render';
import {dates} from '../mock/trip';

const tripInfo = document.querySelector(`.trip-main__trip-info`);
const tripEvents = document.querySelector(`.trip-events`);

const NODE_TRIP = {
  tripInfo,
  tripEvents
};

const renderEvent = (event, place) => {
  const tripComponent = new Trip(event);
  const tripEditComponent = new TripEdit(event);


  const replaceTripToEdit = () => replaceElement(tripEditComponent, tripComponent);

  const replaceEditToTrip = () => replaceElement(tripComponent, tripEditComponent);

  const onEscDown = (evt) => {
    const isEsc = evt.code === `Esc` || evt.code === `Escape`;

    if (isEsc) {
      replaceEditToTrip();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  tripComponent.setEditTripButtonClickHandler(() => {
    replaceTripToEdit();
    document.addEventListener(`keydown`, onEscDown);
  });

  tripEditComponent.setEditFormSubmitHandler(replaceEditToTrip);

  renderElement(place, tripComponent.getElement(), RenderPosition.BEFOREEND);
};

const generateDaysFragment = (events) => {
  const daysFragment = document.createDocumentFragment();

  dates.forEach((date, dateIndex) => {
    const day = new Day(date, dateIndex).getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);

    events
      .filter((event) => formatDate(event.startDate) === date)
      .forEach((event) => renderEvent(event, tripEventsList));

    daysFragment.append(day);
  });

  return daysFragment;
};

const generateSingleDaysFragment = (events) => {
  const daysFragment = document.createDocumentFragment();

  events.forEach((event, eventIndex) => {
    const day = new Day(event.startDate, eventIndex).getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);

    renderEvent(event, tripEventsList);

    daysFragment.append(day);
  });

  return daysFragment;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoints = new NoPoints();
    this._sorting = new Sorting(NAME_SORTING);
    this._tripDays = new TripDays();
  }

  render(events) {

    if (events.length < 1) {
      this._container.append(this._noPoints.getElement());

      return;
    }

    renderElement(NODE_TRIP.tripInfo, new TripRoute(events).getElement(), RenderPosition.AFTERBEGIN);

    renderElement(this._container, this._sorting.getElement(), RenderPosition.BEFOREEND);
    renderElement(this._container, this._tripDays.getElement(), RenderPosition.BEFOREEND);

    this._tripDays.getElement().append(generateDaysFragment(events));

    this._sorting.setClickHandler((sortType) => {
      let sortedTrips = [];

      switch (sortType) {
        case `time`:
          sortedTrips = events.slice().sort((prev, next) => (+(next.endDate - next.startDate) - +(prev.endDate - prev.startDate)));
          break;
        case `price`:
          sortedTrips = events.slice().sort((prev, next) => next.price - prev.price);
          break;
        case `event`:
          sortedTrips = events;
          break;
      }

      this._tripDays.getElement().innerHTML = ``;

      if (sortType !== `event`) {
        this._tripDays.getElement().append(generateSingleDaysFragment(sortedTrips));
        return;
      }

      this._tripDays.getElement().append(generateDaysFragment(events));
    });
  }
}
