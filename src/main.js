import Menu from './components/menu/menu';
import Filter from './components/filter/filter';
import {NAME_FILTERS, NAME_TABS} from './const';
import {RenderPosition, renderElement} from './utils/render';
import TripController from './controllers/trip';
import {events} from './mock/trip';

const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripCost = document.querySelector(`.trip-info__cost-value`);
const lastHeadControls = tripControls.querySelector(`h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);

const NODE_TRIP = {
  tripControls,
  tripCost,
  lastHeadControls,
  tripEvents
};

const calculatePrice = (items) => items.reduce((sum, current) => sum + current.price, 0);

tripCost.innerHTML = calculatePrice(events);
renderElement(NODE_TRIP.lastHeadControls, new Menu(NAME_TABS).getElement(), RenderPosition.BEFOREBEGIN);
renderElement(NODE_TRIP.lastHeadControls, new Filter(NAME_FILTERS).getElement(), RenderPosition.AFTEREND);

const tripController = new TripController(NODE_TRIP.tripEvents);
tripController.render(events);
