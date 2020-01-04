import AbstractComponent from '../abstract-component/abstract-component';

const getTripDaysTemplate = () => {
  return `
    <ul class="trip-days"></ul>
  `;
};

export default class TripDats extends AbstractComponent {

  getTemplate() {
    return getTripDaysTemplate();
  }
}
