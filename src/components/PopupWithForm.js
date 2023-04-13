import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.form = this._popupElement.querySelector(".form");
    this._submitCallback = submitCallback;
    this._inputsList = Array.from(this.form.querySelectorAll(".form__input"));
  }
  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this.form.reset();
  }
}
