import initialCards from "./initialCards.js";
import {
    enableFormsValidation,
    hideFormErrors,
    enableSubmitBtn,
    disableSubmitBtn,
} from "./formsValidation.js";
/*-----------------------------------------------------------------------------------------------------------------------------------*/
const popups = Array.from(document.querySelectorAll(".popup"));
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");

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

editProfileForm.addEventListener("submit", editProfile);

imagePopup.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("popup") ||
        e.target.classList.contains("button-close")
    )
        closePopup(imagePopup);
});

enableFormsValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-save",
    inactiveButtonClass: "form__button-save_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "error-message_active",
});

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
    userCardImage.addEventListener("click", () =>
        openImage(cardLink, cardName)
    );
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

function openImage(imageURL, imageCaption) {
    imageOpened.src = imageURL;
    imageOpened.alt = imageCaption;
    imageFullCaption.textContent = imageCaption;

    openPopup(imagePopup);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    popup.removeEventListener("keydown", closePopupByEscBtn);
}
