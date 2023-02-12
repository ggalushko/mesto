// Обработка формы редактирования профиля
/*---------------------------------------------------------------------------------------------------------------------------------- */
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const closeProfilePopupBtn = popupEditProfile.querySelector(".button-close");

const profileForm = popupEditProfile.querySelector(".form");
const fields = profileForm.querySelectorAll(".form__input");

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__status");

editProfileBtn.addEventListener("click", openProfilePopup);
closeProfilePopupBtn.addEventListener("click", closePopup);
profileForm.addEventListener("submit", editProfile);

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
const popupAddCard = document.querySelector(".popup_add-card");
const addCardBtn = document.querySelector(".profile__button_type_add");
const addCardForm = document.querySelector(".form__card");
const closeAddCardPopupBtn = popupAddCard.querySelector(".button-close");

addCardBtn.addEventListener("click", openCardPopup);
closeAddCardPopupBtn.addEventListener("click", closePopup);
closeAddCardPopupBtn.addEventListener("click", clearForm);
addCardForm.addEventListener("submit", addCard);
showInitialCards();

/*---------------------------------------------------------------------------------------------------------------------------------- */
// Открытие попапа с полным размером изображения

const imagePopupTemplate = document.querySelector("#imagePopup").content;

/*---------------------------------------------------------------------------------------------------------------------------------- */
// Функции

function showInitialCards() {
  for (card of initialCards) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__title").textContent = card.name;

    cardsSection.append(cardElement);
  }
  const arrDeleteBtns = document.querySelectorAll(".card__delete-button");
  arrDeleteBtns.forEach((btn) => btn.addEventListener("click", deleteCard));

  const arrLikeBtns = document.querySelectorAll(".like-button");
  arrLikeBtns.forEach((btn) => btn.addEventListener("click", pressLike));

  const images = document.querySelectorAll(".card__image");
  images.forEach((image) => image.addEventListener("click", openImage));
}

function openProfilePopup() {
  popupEditProfile.classList.add("popup_opened");
  fields[0].value = profileName.textContent;
  fields[1].value = profileInfo.textContent;
}

function editProfile(e) {
  e.preventDefault();
  profileName.textContent = fields[0].value;
  profileInfo.textContent = fields[1].value;
  closePopup(e);
}

function addCard(e) {
  e.preventDefault();
  const userCard = cardTemplate.cloneNode(true);
  const fields = addCardForm.querySelectorAll(".form__input");
  userCard.querySelector(".card__title").textContent = fields[0].value;
  userCard.querySelector(".card__image").src = fields[1].value;
  userCard.querySelector(".card__image").addEventListener("click", openImage);
  userCard.querySelector(".like-button").addEventListener("click", pressLike);
  userCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardsSection.prepend(userCard);

  clearForm(e);
  closePopup(e);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function pressLike(e) {
  e.target.classList.toggle("like-button_active");
}

function openCardPopup() {
  popupAddCard.classList.add("popup_opened");
}

function clearForm(e) {
  Array.from(
    e.target.closest(".form-container").querySelectorAll(".form__input")
  ).map((field) => (field.value = ""));
}

function openImage(e) {
  const imagePopup = imagePopupTemplate.querySelector(".popup").cloneNode(true);
  const imageURL = e.target.src;
  const imageCaption = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  imagePopup.querySelector("img").src = imageURL;
  imagePopup.querySelector(".image-container__caption").textContent =
    imageCaption;
  imagePopup
    .querySelector(".button-close")
    .addEventListener("click", closePopup);
  imagePopup.classList.add("popup_opened");
  document.body.append(imagePopup);
}

function closePopup(e) {
  e.target.closest(".popup").classList.remove("popup_opened");
}
