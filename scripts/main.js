import initialCards from "../data/initialCards.js";
import { Card } from "../classes/Card.js";
import { FormValidator } from "../classes/FormValidator.js";

/*-----------------------------------------------------------------------------------------------------------------------------------*/
const popups = Array.from(document.querySelectorAll(".popup"));
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");

const editProfileForm = popupEditProfile.querySelector(".form");
const profileNameInput = editProfileForm.querySelector(".form__input_name");
const profileInfoInput = editProfileForm.querySelector(".form__input_status");

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__status");

const cardsSection = document.querySelector(".cards");
const popupAddCard = document.querySelector(".popup_add-card");
const addCardBtn = document.querySelector(".profile__button_type_add");
const addCardForm = document.querySelector(".form-card");
const cardTitleInput = addCardForm.querySelector(".form__input_title");
const cardLinkInput = addCardForm.querySelector(".form__input_link");

const imagePopup = document.querySelector(".popup_image");
const imageOpened = imagePopup.querySelector(".image-full");
const imageFullCaption = imagePopup.querySelector(".image-container__caption");

const cardFormSubmitBtn = popupAddCard.querySelector(".form__button-save");
const profileFormSubmitBtn =
  editProfileForm.querySelector(".form__button-save");

/*-----------------------------------------------------------------------------------------------------------------------------------*/
showInitialCards();
addCardForm.addEventListener("submit", addCard);

popups.forEach((popup) =>
  popup.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("button-close")
    )
      closePopup(popup);
  })
);

editProfileForm.addEventListener("submit", editProfile);
const editProfileFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-save",
    inactiveButtonClass: "form__button-save_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "error-message_active",
  },
  editProfileForm
);
editProfileFormValidator.enableValidation();
editProfileBtn.addEventListener("click", () => {
  editProfileFormValidator.hideErrors();
  profileFormSubmitBtn.classList.remove("form__button-save_disabled");
  openProfilePopup();
});

const addCardFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-save",
    inactiveButtonClass: "form__button-save_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "error-message_active",
  },
  addCardForm
);
addCardFormValidator.enableValidation();
addCardBtn.addEventListener("click", () => {
  addCardFormValidator.hideErrors();
  addCardForm.reset();
  cardFormSubmitBtn.classList.add("form__button-save_disabled");
  openPopup(popupAddCard);
});

cardsSection.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("card__image")) openImage(e);
});

/*-----------------------------------------------------------------------------------------------------------------------------------*/
//------------------------- Карточки

function showInitialCards() {
  for (const card of initialCards) {
    const newCard = new Card(card, "#card-template").getCard();
    cardsSection.append(newCard);
  }
}

function addCard(e) {
  e.preventDefault();
  const card = new Card(
    { name: cardTitleInput.value, link: cardLinkInput.value },
    "#card-template"
  ).getCard();
  cardsSection.prepend(card);

  addCardForm.reset();
  closePopup(popupAddCard);
}

//------------------------- Поп-апы

function editProfile(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileInfo.textContent = profileInfoInput.value;
  closePopup(popupEditProfile);
}

function openImage(e) {
  imageOpened.src = e.target.src;
  imageOpened.alt = e.target.alt;
  imageFullCaption.textContent = e.target.alt;

  openPopup(imagePopup);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscBtn);
}

function closePopupByEscBtn(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openProfilePopup() {
  openPopup(popupEditProfile);
  profileNameInput.value = profileName.textContent;
  profileInfoInput.value = profileInfo.textContent;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscBtn);
}
