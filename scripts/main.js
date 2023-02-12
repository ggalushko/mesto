import initialCards from "./initialCards.js";

/*-----------------------------------------------------------------------------------------------------------------------------------*/
// Элементы

const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const closeProfilePopupBtn = popupEditProfile.querySelector(".button-close");

const editProfileForm = popupEditProfile.querySelector(".form");
const profileNameInput = editProfileForm.querySelector(
  ".form__input:nth-of-type(1)"
);
const profileInfoInput = editProfileForm.querySelector(
  ".form__input:nth-of-type(2)"
);

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__status");

const cardTemplate = document.querySelector("#card-template").content;
const cardsSection = document.querySelector(".cards");
const popupAddCard = document.querySelector(".popup_add-card");
const addCardBtn = document.querySelector(".profile__button_type_add");
const addCardForm = document.querySelector(".form-card");
const cardTitleInput = addCardForm.querySelector(".form__input:nth-of-type(1)");
const cardLinkInput = addCardForm.querySelector(".form__input:nth-of-type(2)");
const closeAddCardPopupBtn = popupAddCard.querySelector(".button-close");

const imagePopup = document.querySelector(".popup_image");
/*-----------------------------------------------------------------------------------------------------------------------------------*/
// Функции

function showInitialCards() {
  for (const cardObject of initialCards) {
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

  const userCardImage = userCard.querySelector(".card__image");
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

function clearAddCardForm(e) {
  e.target.closest(".form-container").querySelector(".form-card").reset();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
/*-----------------------------------------------------------------------------------------------------------------------------------*/
// Обработка событий

showInitialCards();

editProfileBtn.addEventListener("click", openProfilePopup);
closeProfilePopupBtn.addEventListener("click", () =>
  closePopup(popupEditProfile)
);
editProfileForm.addEventListener("submit", editProfile);

closeAddCardPopupBtn.addEventListener("click", () => closePopup(popupAddCard));
closeAddCardPopupBtn.addEventListener("click", clearAddCardForm);
addCardBtn.addEventListener("click", () => openPopup(popupAddCard));
addCardForm.addEventListener("submit", addCard);
