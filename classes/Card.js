// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

export class Card {
  constructor(cardData, templateSelector) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.templateSelector = templateSelector;
  }

  getCard() {
    return this._createCard();
  }

  _createCard() {
    const cardTemplate = document.querySelector(this.templateSelector).content;
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".like-button");

    cardElement.querySelector(".card__title").textContent = this.name;
    imageElement.src = this.link;
    imageElement.alt = this.name;

    this._setEventListeners(likeButton, deleteButton);

    return cardElement;
  }

  _setEventListeners(likeButton, deleteButton) {
    likeButton.addEventListener("click", this._pressLike);
    deleteButton.addEventListener("click", this._deleteCard);
  }

  _pressLike(e) {
    e.target.classList.toggle("like-button_active");
  }

  _deleteCard(e) {
    e.target.closest(".card").remove();
  }
}
