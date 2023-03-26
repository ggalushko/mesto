export class Card {
  constructor(cardData, templateSelector, handleClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleClick = handleClick;
    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.cloneNode(true);
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
    this._imageElement.addEventListener("click", this._handleClick);
  }

  _pressLike(e) {
    e.target.classList.toggle("like-button_active");
  }

  _deleteCard(e) {
    e.target.closest(".card").remove();
  }
}
