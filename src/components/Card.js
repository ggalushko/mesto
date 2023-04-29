export class Card {
  constructor(
    cardData,
    templateSelector,
    handleClick,
    handleDelete,
    addLike,
    removeLike
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes.length;

    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._addLike = addLike;
    this._removeLike = removeLike;

    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardElement.querySelector(".button-caption").textContent =
      this._likes;
    this._isLiked = cardData.likes.some(
      (obj) => obj._id === "e3f386d3579eace48d2b15ee"
    );

    this._likeButton = this._cardElement.querySelector(".like-button");
    if (this._isLiked) this._likeButton.classList.add("like-button_active");

    this._addLike = addLike;
    this._removeLike = removeLike;
  }

  getCard() {
    return this._createCard();
  }

  _createCard() {
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (e) => this._pressLike(e));
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
      document.deleteImageId = this._id;
    });
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._imageElement.addEventListener("click", this._handleClick);
  }

  _pressLike(e) {
    if (!this._isLiked) {
      this._addLike(this._id);
    } else {
      this._removeLike(this._id);
    }
    this._isLiked = !this._isLiked;
    e.target.classList.toggle("like-button_active");
  }

  _deleteCard(e) {
    e.target.closest(".card").remove();
  }
}
