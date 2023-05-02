import { Api } from "../components/Api";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { PopupVerify } from "../components/PopupVerify";

/*-----------------------------------------------------------------------------------------------------------------------------------*/
//-------------------------------------------------------------------- Конфиг для валидации форм

export const formConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "error-message_active",
};

//-------------------------------------------------------------------- Селекторы

export const cardTemplateSelector = "#card-template";
export const nameInput = document
  .querySelector(".popup_edit-profile")
  .querySelector(".form__input_name");
export const infoInput = document.querySelector(".form__input_about");
export const avatarClickArea = document.querySelector(".profile__dark-layout");
export const editProfileBtn = document.querySelector(
  ".profile__button_type_edit"
);
export const addCardBtn = document.querySelector(".profile__button_type_add");

//-------------------------------------------------------------------- Селекторы

export const cardsApi = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "47013706-890f-4248-97af-220f7fa64e36",
    "Content-Type": "application/json",
  },
});
export const user = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
  avatarSelector: ".profile__picture",
  id: null,
});
export const cardsSection = new Section(
  { renderer: (card) => createCard(card) },
  ".cards"
);

//-------------------------------------------------------------------- Поп-апы

export const imagePopup = new PopupWithImage(".popup_image");
export const deletePopup = new PopupVerify(
  ".popup_delete-card",
  deletePopupCallback
);
export const profilePopup = new PopupWithForm(
  ".popup_edit-profile",
  profilePopupSubmit
);
export const addCardPopup = new PopupWithForm(".popup_add-card", addCard);
export const avatarPopup = new PopupWithForm(
  ".popup_change-avatar",
  changeAvatar
);

//-------------------------------------------------------------------- Валидаторы форм

export const editProfileFormValidator = new FormValidator(
  formConfig,
  profilePopup.form
);
export const addCardFormValidator = new FormValidator(
  formConfig,
  document.forms["form-add-card"]
);
export const avatarPopupFormValidator = new FormValidator(
  formConfig,
  avatarPopup.form
);

//-------------------------------------------------------------------- Функции

function handleCardclick(e) {
  imagePopup.open(e.target.src, e.target.alt);
}

function verifyDelete(e) {
  deletePopup.open();
}

function deletePopupCallback() {
  cardsApi
    .deleteCard(document.deleteImageId)
    .then(() => {
      document.getElementById(`${document.deleteImageId}`).remove();
      document.deleteImageId = null;
      deletePopup.close();
    })
    .catch((err) => console.log(err));
}

function addCard({ name, link }) {
  addCardPopup.renderLoading(true);
  cardsApi
    .addCard(name, link)
    .then((res) => {
      cardsSection.addItem(
        createCard({
          ...res,
        })
      );
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

function createCard(cardObj) {
  return new Card(
    cardObj,
    cardTemplateSelector,
    handleCardclick,
    verifyDelete,
    cardsApi.addLike.bind(cardsApi),
    cardsApi.removeLike.bind(cardsApi),
    user.id
  ).getCard();
}

function profilePopupSubmit({ name, about }) {
  profilePopup.renderLoading(true);
  cardsApi
    .editProfile({ name: name, about: about })
    .then((data) => {
      user.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profilePopup.renderLoading(false);
    });
}

function changeAvatar(image) {
  avatarPopup.renderLoading(true);
  cardsApi
    .changeAvatar(image.link)
    .then((res) => {
      user.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}
