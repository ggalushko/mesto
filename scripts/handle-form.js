// Обработка кнопок и формы для редактирования профиля
/*---------------------------------------------------------------------------------------------------------------------------------- */
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const closeProfilePopupBtn = popupEditProfile.querySelector(
  ".form-container__button-close"
);

const form = popupEditProfile.querySelector(".form");
const fields = form.querySelectorAll(".form__input");

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__status");

editProfileBtn.addEventListener("click", openProfilePopup);
closeProfilePopupBtn.addEventListener("click", closeProfilePopup);
form.addEventListener("submit", editProfile);

function closeProfilePopup() {
  popupEditProfile.classList.remove("popup_opened");
}

function openProfilePopup() {
  popupEditProfile.classList.add("popup_opened");
  fields[0].value = profileName.textContent;
  fields[1].value = profileInfo.textContent;
}

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = fields[0].value;
  profileInfo.textContent = fields[1].value;
  closeProfilePopup();
}
/*---------------------------------------------------------------------------------------------------------------------------------- */
// Загрузка дефолтных карточек и добавление пользовательских
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardsSection = document.querySelector(".cards");

function showInitialCards() {
  for (card of initialCards) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__title").textContent = card.name;

    cardsSection.append(cardElement);
  }
}

showInitialCards();

const addDeleteBtns = Array.from(
  document.querySelectorAll(".card__delete-button")
);

for (btn of addDeleteBtns) {
  btn.addEventListener("click", deleteCard);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

const popupAddCard = document.querySelector(".popup_add-card");
const addCardBtn = document.querySelector(".profile__button_type_add");
const closeAddCardPopup = popupAddCard.querySelector(
  ".form-container__button-close"
);

addCardBtn.addEventListener("click", openCardPopup);
closeAddCardPopup.addEventListener("click", closeCardPopup);

function openCardPopup() {
  popupAddCard.classList.add("popup_opened");
}

function closeCardPopup() {
  popupAddCard.classList.remove("popup_opened");
}

const addCardForm = document.querySelector(".form__card");
addCardForm.addEventListener("submit", addCard);

function addCard(e) {
  e.preventDefault();
  const userCard = cardTemplate.cloneNode(true);
  const fields = addCardForm.querySelectorAll(".form__input");
  userCard.querySelector(".card__title").textContent = fields[0].value;
  userCard.querySelector(".card__image").src = fields[1].value;

  userCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardsSection.prepend(userCard);
  Array.from(fields).map((field) => (field.value = ""));
  closeCardPopup();
}

/*---------------------------------------------------------------------------------------------------------------------------------- */
