import initialCards from "./initialCards.js";
import {
    enableFormsValidation,
    hideFormErrors,
    enableSubmitBtn,
    disableSubmitBtn,
} from "./formsValidation.js";
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
addCardForm.addEventListener("submit", addCard);

popupAddCard.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) closePopup(popupAddCard);
});

closeAddCardPopupBtn.addEventListener("click", () => closePopup(popupAddCard));
addCardBtn.addEventListener("click", () => {
    disableSubmitBtn(cardFormSubmitBtn, "form__button-save_disabled");
    hideFormErrors(
        addCardForm,
        ".form__input",
        "form__input_error",
        "error-message_active"
    );
    addCardForm.reset();
    openPopup(popupAddCard);
});

editProfileBtn.addEventListener("click", () => {
    enableSubmitBtn(profileFormSubmitBtn, "form__button-save_disabled");
    hideFormErrors(
        editProfileForm,
        ".form__input",
        "form__input_error",
        "error-message_active"
    );
    openProfilePopup();
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

enableFormsValidation(
    ".form",
    ".form__input",
    ".form__button-save",
    "form__button-save_disabled",
    "form__input_error",
    "error-message_active"
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
    userCard.querySelector(".like-button").addEventListener("click", pressLike);
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
    popup.addEventListener("keydown", closePopupByEscBtn);
}

function closePopupByEscBtn(e) {
    console.log(e.key);
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
    popup.removeEventListener("keydown", closePopupByEscBtn);
}
