import AbstractComponent from '../abstract-component/abstract-component';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();

    this.removeElement();

    const newElement = this.getElement();

    oldElement.replaceWith(newElement);

    this.recoveryListeners();
  }
}
