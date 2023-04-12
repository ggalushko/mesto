import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".image-full");
    this._caption = this._popupElement.querySelector(
      ".image-container__caption"
    );
    this.setEventListeners();
  }
  open(src, alt) {
    super.open();
    this._image.src = src;
    this._image.alt = alt;
    this._caption.textContent = alt;
  }
}
