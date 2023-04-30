export class Card {
  constructor(
    cardData,
    templateSelector,
    handleClick,
    verifyDelete,
    addLike,
    removeLike,
    myId
  ) {
    this._isMyCard = cardData.owner?._id === myId;

    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._likesAmount = this._likes.length;

    this._handleClick = handleClick;
    this._verifyDelete = verifyDelete;
    this._addLike = addLike;
    this._removeLike = removeLike;

    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likesCaptionElement =
      this._cardElement.querySelector(".button-caption");
    this._likesCaptionElement.textContent = this._likesAmount;
    this._isLiked = cardData.likes.some((obj) => obj._id === myId);

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
    if (this._isMyCard) {
      this._deleteButton.addEventListener("click", (e) => {
        e.target.closest(".card").id = this._id;
        document.deleteImageId = this._id;
        this._verifyDelete();
      });
    } else {
      this._deleteButton.remove();
    }
    this._imageElement.addEventListener("click", this._handleClick);
  }

  _pressLike(e) {
    if (!this._isLiked) {
      this._addLike(this._id).then((res) => this._setLikesNumber(res.likes));
    } else {
      this._removeLike(this._id).then((res) => this._setLikesNumber(res.likes));
    }
    this._isLiked = !this._isLiked;
    e.target.classList.toggle("like-button_active");
  }

  _setLikesNumber(likes) {
    this._likes = likes;
    this._likesAmount = likes.length;
    this._likesCaptionElement.textContent = likes.length;
  }
}
