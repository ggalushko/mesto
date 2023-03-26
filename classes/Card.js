export class Card {
  static imagePopup = document.querySelector(".popup_image");
  static imageOpened = document.querySelector(".image-full");
  static imageFullCaption = document.querySelector(".image-container__caption");

  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this.cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this.cardTemplate.cloneNode(true);
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._cardElement.querySelector(".like-button");
  }

  getCard() {
    return this._createCard();
  }

  _createCard() {
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._pressLike);
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._imageElement.addEventListener("click", this._openImage);
  }

  _pressLike(e) {
    e.target.classList.toggle("like-button_active");
  }

  _deleteCard(e) {
    e.target.closest(".card").remove();
  }

  _openImage(e) {
    Card.imageOpened.src = e.target.src;
    Card.imageOpened.alt = e.target.alt;
    Card.imageFullCaption.textContent = e.target.alt;
    Card.imagePopup.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => _this.closePopupByEscBtn(e));
  }

  _closePopupByEscBtn(e) {
    if (e.key === "Escape") {
      this._closeImage();
    }
  }

  _closeImage() {
    Card.imagePopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupByEscBtn);
  }
}
