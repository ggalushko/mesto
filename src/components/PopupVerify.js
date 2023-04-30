import { Popup } from "./Popup";

export class PopupVerify extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.form = this._popupElement.querySelector(".form");
    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback();
    });
  }
  close() {
    const cardToDelete = document.getElementById(`${document.deleteImageId}`);
    if (cardToDelete) cardToDelete.removeAttribute("id");
    document.deleteImageId = null;
    super.close();
  }
}
