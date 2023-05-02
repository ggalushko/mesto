import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.form = this._popupElement.querySelector(".form");
    this._submitCallback = submitCallback;
    this._inputsList = Array.from(this.form.querySelectorAll(".form__input"));
    this._submitBtn = this.form.querySelector(".form__button-save");
    this._submitBtnText = this._submitBtn.textContent;
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
    });
  }
  close() {
    super.close();
    this.form.reset();
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    isLoading
      ? (this._submitBtn.textContent = loadingText)
      : (this._submitBtn.textContent = this._submitBtnText);
  }
}
