import "../pages/index.css";
import { Api } from "../components/Api";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { PopupVerify } from "../components/PopupVerify";
import {
  formConfig,
  nameInput,
  infoInput,
  avatarClickArea,
  editProfileBtn,
  addCardBtn,
  cardTemplateSelector,
} from "../utils/constants";

/*-----------------------------------------------------------------------------------------------------------------------------------*/

const cardsApi = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "47013706-890f-4248-97af-220f7fa64e36",
    "Content-Type": "application/json",
  },
});
const user = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
  avatarSelector: ".profile__picture",
  id: null,
});
const cardsSection = new Section(
  { renderer: (card) => createCard(card) },
  ".cards"
);

//-------------------------------------------------------------------- Поп-апы

const imagePopup = new PopupWithImage(".popup_image");
const deletePopup = new PopupVerify(".popup_delete-card", deletePopupCallback);
const profilePopup = new PopupWithForm(
  ".popup_edit-profile",
  profilePopupSubmit
);
const addCardPopup = new PopupWithForm(".popup_add-card", addCard);
const avatarPopup = new PopupWithForm(".popup_change-avatar", changeAvatar);

//-------------------------------------------------------------------- Валидаторы форм

const editProfileFormValidator = new FormValidator(
  formConfig,
  profilePopup.form
);
const addCardFormValidator = new FormValidator(
  formConfig,
  document.forms["form-add-card"]
);
const avatarPopupFormValidator = new FormValidator(
  formConfig,
  avatarPopup.form
);

//------------------------- Инициализация API и получение данных пользователя

Promise.all([cardsApi.getUserData(), cardsApi.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    cardsSection.renderAll(cards);
  })
  .catch((err) => console.log(err));

//-------------------------------------------------------------------- Установка слушателей на поп-апы

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
deletePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();

//-------------------------------------------------------------------- Включение валидации форм

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
avatarPopupFormValidator.enableValidation();

//-------------------------------------------------------------------- Установка слушателей на элементы

addCardBtn.addEventListener("click", () => {
  addCardFormValidator.hideErrors();
  addCardFormValidator.disableSubmitBtn();
  addCardPopup.open();
});

editProfileBtn.addEventListener("click", () => {
  editProfileFormValidator.hideErrors();
  editProfileFormValidator.enableSubmitBtn();
  const { name, info } = user.getUserInfo();
  nameInput.value = name;
  infoInput.value = info;
  profilePopup.open();
});

avatarClickArea.addEventListener("click", () => {
  avatarPopupFormValidator.hideErrors();
  avatarPopupFormValidator.disableSubmitBtn();
  avatarPopup.open();
});

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
