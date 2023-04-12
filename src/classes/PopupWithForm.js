import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.form = this._popupElement.querySelector(".form");
    this._submitCallback = submitCallback;
    this.setEventListeners();
  }
  _getInputValues() {
    return Array.from(this.form.querySelectorAll(".form__input")).map(
      (input) => input.value
    );
  }
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this._getInputValues();
      this._submitCallback(data[0], data[1]);
      this.close();
    });
  }
  close() {
    super.close();
    this._popupElement.querySelector("form").reset();
  }
}
