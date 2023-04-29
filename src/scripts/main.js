import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Api } from "../api/Api";
import { Popup } from "../components/Popup";

const formConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "error-message_active",
};
const cardTemplateSelector = "#card-template";

/*-----------------------------------------------------------------------------------------------------------------------------------*/
//------------------------- Карточки

// Создание секции

const cardsApi = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "47013706-890f-4248-97af-220f7fa64e36",
    "Content-Type": "application/json",
  },
});

const cardsSection = new Section(
  { renderer: (card) => createCard(card) },
  ".cards"
);

cardsApi
  .getUserData()
  .then((data) => user.setUserInfo({ name: data.name, status: data.about }));

cardsApi.getInitialCards().then((initialCards) => {
  cardsSection.renderAll(initialCards);
});

const deletePopup = new Popup(".popup_delete-card");
deletePopup.setEventListeners();
document.querySelector("#delete-card-button").addEventListener("click", () => {
  deletePopup.close();
  cardsApi.deleteCard(document.deleteImageId);
});

function openDeletePopUp() {
  deletePopup.open();
}

function createCard(cardObj) {
  return new Card(
    cardObj,
    cardTemplateSelector,
    handleCardclick,
    openDeletePopUp,
    cardsApi.addLike.bind(cardsApi),
    cardsApi.removeLike.bind(cardsApi)
  ).getCard();
}

// cardsApi.addLike("644d1a013bb4f201458ba42b").then(res => console.log("THUS IS RES", res))


// Создание попапа для добавления карточек
const addCardPopup = new PopupWithForm(".popup_add-card", addCard);
addCardPopup.setEventListeners();
const addCardBtn = document.querySelector(".profile__button_type_add");
addCardBtn.addEventListener("click", () => addCardPopup.open());

// Включение валидации
const addCardFormValidator = new FormValidator(
  formConfig,
  document.forms["form-add-card"]
);
addCardFormValidator.enableValidation();

addCardBtn.addEventListener("click", () => {
  addCardFormValidator.hideErrors();
  addCardFormValidator.disableSubmitBtn();
  addCardPopup.form.reset();
  addCardPopup.open();
});

function addCard({ name, link }) {
  cardsApi.addCard(name, link).then((res) => {
    cardsSection.addItem(
      createCard({ name: res.name, link: res.link, likes: res.likes })
    );
  });
}

//------------------------- Поп-ап для раскрытия изображения
const imagePopup = new PopupWithImage(".popup_image");
imagePopup.setEventListeners();
function handleCardclick(e) {
  imagePopup.open(e.target.src, e.target.alt);
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
//------------------------- Профиль юзера
const user = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__status",
});

const nameInput = document
  .querySelector(".popup_edit-profile")
  .querySelector(".form__input_name");
const infoInput = document.querySelector(".form__input_status");

const editProfileBtn = document.querySelector(".profile__button_type_edit");
const profilePopup = new PopupWithForm(".popup_edit-profile", () => {
  cardsApi
    .editProfile({ name: nameInput.value, about: infoInput.value })
    .then((data) => user.setUserInfo({ name: data.name, status: data.about }));
});

profilePopup.setEventListeners();

const editProfileFormValidator = new FormValidator(
  formConfig,
  profilePopup.form
);
editProfileFormValidator.enableValidation();
editProfileBtn.addEventListener("click", () => {
  editProfileFormValidator.hideErrors();
  editProfileFormValidator.enableSubmitBtn();
  const { name, info } = user.getUserInfo();
  nameInput.value = name;
  infoInput.value = info;
  profilePopup.open();
});
