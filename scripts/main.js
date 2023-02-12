// Обработка формы редактирования профиля
/*---------------------------------------------------------------------------------------------------------------------------------- */
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const closeProfilePopupBtn = popupEditProfile.querySelector(".button-close");

const profileForm = popupEditProfile.querySelector(".form");
const fields = profileForm.querySelectorAll(".form__input");
const profileNameInput = profileForm.querySelector(
  ".form__input:nth-of-type(1)"
);
const profileInfoInput = profileForm.querySelector(
  ".form__input:nth-of-type(2)"
);

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__status");

editProfileBtn.addEventListener("click", openProfilePopup);
closeProfilePopupBtn.addEventListener("click", () => closePopup(popupEditProfile));
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
const addCardForm = document.querySelector(".form-card");
const cardTitleInput = addCardForm.querySelector(".form__input:nth-of-type(1)");
const cardLinkInput = addCardForm.querySelector(".form__input:nth-of-type(2)");
const closeAddCardPopupBtn = popupAddCard.querySelector(".button-close");
const imagePopup = document.querySelector(".popup_image");

closeAddCardPopupBtn.addEventListener("click", () => closePopup(popupAddCard));
closeAddCardPopupBtn.addEventListener("click", clearAddCardForm);
addCardBtn.addEventListener("click", () => openPopup(popupAddCard));
addCardForm.addEventListener("submit", addCard);
showInitialCards();

/*---------------------------------------------------------------------------------------------------------------------------------- */
// Функции

function showInitialCards() {
  for (cardObject of initialCards) {
    cardTitleInput.value = cardObject.name;
    cardLinkInput.value = cardObject.link;

    const card = createCard();
    cardsSection.append(card);
  }
  cardTitleInput.value = "";
  cardLinkInput.value = "";
}

function editProfile(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileInfo.textContent = profileInfoInput.value;
  closePopup(popupEditProfile);
}

function createCard() {
  const userCard = cardTemplate.cloneNode(true);
  const cardTitle = addCardForm.querySelector(
    ".form__input:nth-of-type(1)"
  ).value;
  const cardLink = addCardForm.querySelector(
    ".form__input:nth-of-type(2)"
  ).value;

  userCardImage = userCard.querySelector(".card__image");
  userCard.querySelector(".card__title").textContent = cardTitle;
  userCardImage.src = cardLink;
  userCardImage.addEventListener("click", openImage);
  userCard.querySelector(".like-button").addEventListener("click", pressLike);
  userCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return userCard;
}

function addCard(e) {
  e.preventDefault();
  const card = createCard();
  cardsSection.prepend(card);

  addCardForm.reset();
  closePopup(popupAddCard);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function pressLike(e) {
  e.target.classList.toggle("like-button_active");
}
/*---------------------------------------------------------------------------------------------------------------------------------- */
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileInfoInput.value = profileInfo.textContent;
  openPopup(popupEditProfile);
}

function openImage(e) {
  const imageURL = e.target.src;
  const imageCaption = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;

  const imageOpened = imagePopup.querySelector("img");
  imageOpened.src = imageURL;
  imageOpened.alt = imageCaption;
  imagePopup.querySelector(".image-container__caption").textContent =
    imageCaption;

  imagePopup
    .querySelector(".button-close")
    .addEventListener("click", () => closePopup(imagePopup));

  openPopup(imagePopup);
}
/*---------------------------------------------------------------------------------------------------------------------------------- */

function clearAddCardForm(e) {
  e.target.closest(".form-container").querySelector(".form-card").reset();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
