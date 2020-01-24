import Trip from '../components/trip/trip';
import TripEdit from '../components/trip-edit/trip-edit';
import {RenderPosition, replaceElement, renderElement} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._tripComponent = null;
    this._tripEditComponent = null;

    this._onEscDown = this._onEscDown.bind(this);
  }

  render(event) {
    this._tripComponent = new Trip(event);
    this._tripEditComponent = new TripEdit(event);

    this._tripComponent.setEditTripButtonClickHandler(() => {
      this._replaceTripToEdit();
      document.addEventListener(`keydown`, this._onEscDown);
    });

    this._tripEditComponent.setEditFormSubmitHandler(this._replaceEditToTrip);

    this._tripEditComponent.setFavoriteHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    renderElement(this._container, this._tripComponent.getElement(), RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTrip();
    }
  }

  _replaceTripToEdit() {
    this._onViewChange();

    replaceElement(this._tripEditComponent, this._tripComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToTrip() {
    replaceElement(this._tripComponent, this._tripEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscDown(evt) {
    const isEsc = evt.code === `Esc` || evt.code === `Escape`;

    if (isEsc) {
      this._replaceEditToTrip();
      document.removeEventListener(`keydown`, this._onEscDown);
    }
  }
}
