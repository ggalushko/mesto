import initialCards from "./initialCards.js";

/*-----------------------------------------------------------------------------------------------------------------------------------*/

const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const closeProfilePopupBtn = popupEditProfile.querySelector(".button-close");

const editProfileForm = popupEditProfile.querySelector(".form");
const profileNameInput = editProfileForm.querySelector(".form__input_name");
const profileInfoInput = editProfileForm.querySelector(".form__input_status");

const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__status");

const cardTemplate = document.querySelector("#card-template").content;
const cardsSection = document.querySelector(".cards");
const popupAddCard = document.querySelector(".popup_add-card");
const addCardBtn = document.querySelector(".profile__button_type_add");
const addCardForm = document.querySelector(".form-card");
const cardTitleInput = addCardForm.querySelector(".form__input_title");
const cardLinkInput = addCardForm.querySelector(".form__input_link");
const closeAddCardPopupBtn = popupAddCard.querySelector(".button-close");

const imagePopup = document.querySelector(".popup_image");
const imageOpened = imagePopup.querySelector(".image-full");
const imageFullCaption = imagePopup.querySelector(".image-container__caption");
const imagePopupCloseBtn = imagePopup.querySelector(".button-close");

const cardFormSubmitBtn = popupAddCard.querySelector(".form__button-save");
const profileFormSubmitBtn =
  editProfileForm.querySelector(".form__button-save");

/*-----------------------------------------------------------------------------------------------------------------------------------*/

showInitialCards();
cardsSection.addEventListener("click", (e) => pressLike(e));
addCardForm.addEventListener("submit", addCard);

popupAddCard.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) closePopup(popupAddCard);
});

closeAddCardPopupBtn.addEventListener("click", () => closePopup(popupAddCard));
addCardBtn.addEventListener("click", () => {
  disableSubmitBtn(cardFormSubmitBtn);
  hideAllErrors(addCardForm);
  addCardForm.reset();
  openPopup(popupAddCard);
});

editProfileBtn.addEventListener("click", () => {
  enableSubmitBtn(profileFormSubmitBtn);
  hideAllErrors(editProfileForm);
  openProfilePopup();
});

window.addEventListener("keydown", (e) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") closePopup(openedPopup);
});

popupEditProfile.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) closePopup(popupEditProfile);
});
closeProfilePopupBtn.addEventListener("click", () =>
  closePopup(popupEditProfile)
);
editProfileForm.addEventListener("submit", editProfile);

imagePopupCloseBtn.addEventListener("click", () => closePopup(imagePopup));
imagePopup.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) closePopup(imagePopup);
});

enableFormValidation(addCardForm);
enableFormValidation(editProfileForm);
addCardForm.addEventListener("input", () => setSubmitBtnState(addCardForm));
editProfileForm.addEventListener("input", () =>
  setSubmitBtnState(editProfileForm)
);

/*-----------------------------------------------------------------------------------------------------------------------------------*/
//------------------------- Карточки

function showInitialCards() {
  for (const card of initialCards) {
    const newCard = createCard(card.name, card.link);
    cardsSection.append(newCard);
  }
}

function createCard(cardName, cardLink) {
  const userCard = cardTemplate.cloneNode(true);

  const userCardImage = userCard.querySelector(".card__image");
  userCard.querySelector(".card__title").textContent = cardName;
  userCardImage.src = cardLink;
  userCardImage.alt = cardName;
  userCardImage.addEventListener("click", openImage);
  userCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return userCard;
}

function addCard(e) {
  e.preventDefault();
  const card = createCard(cardTitleInput.value, cardLinkInput.value);
  cardsSection.prepend(card);

  addCardForm.reset();
  closePopup(popupAddCard);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function pressLike(e) {
  if (e.target.classList.contains("like-button"))
    e.target.classList.toggle("like-button_active");
}

//------------------------- Поп-апы

function editProfile(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileInfo.textContent = profileInfoInput.value;
  closePopup(popupEditProfile);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openProfilePopup() {
  openPopup(popupEditProfile);
  profileNameInput.value = profileName.textContent;
  profileInfoInput.value = profileInfo.textContent;
}

function openImage(e) {
  const imageURL = e.target.src;
  const imageCaption = e.target
    .closest(".card")
    .querySelector(".card__title").textContent;

  imageOpened.src = imageURL;
  imageOpened.alt = imageCaption;
  imageFullCaption.textContent = imageCaption;

  openPopup(imagePopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//------------------------- Валидация форм

function enableFormValidation(form) {
  const inputs = Array.from(form.querySelectorAll(".form__input"));
  for (let input of inputs) {
    const errorElement = form.querySelector(`#${input.name}-error`);
    input.addEventListener("input", () => validateInput(input, errorElement));
  }
}

function validateInput(input, errorElement) {
  if (!input.validity.valid) {
    displayInputError(input, input.validationMessage, errorElement);
  } else {
    hideInputError(input, errorElement);
  }
}

function inputsAreValid(form) {
  const inputs = Array.from(form.querySelectorAll(".form__input"));
  return inputs.every((input) => input.validity.valid);
}

function setSubmitBtnState(form) {
  const submitBtn = form.querySelector(".form__button-save");
  inputsAreValid(form)
    ? enableSubmitBtn(submitBtn)
    : disableSubmitBtn(submitBtn);
}

function displayInputError(input, errorMessage, errorElement) {
  input.classList.add("form__input_error");
  errorElement.innerText = errorMessage;
  errorElement.classList.add("error-message_active");
}

function hideInputError(input, errorElement) {
  input.classList.remove("form__input_error");
  errorElement.innerText = "";
  errorElement.classList.remove("error-message_active");
}

function hideAllErrors(form) {
  const inputs = Array.from(form.querySelectorAll(".form__input"));
  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.name}-error`);
    hideInputError(input, errorElement);
  });
}

function disableSubmitBtn(submitBtn) {
  submitBtn.classList.add("form__button-save_disabled");
  submitBtn.disabled = true;
}

function enableSubmitBtn(submitBtn) {
  submitBtn.classList.remove("form__button-save_disabled");
  submitBtn.disabled = false;
}
