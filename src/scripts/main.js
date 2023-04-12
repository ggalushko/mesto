import "../pages/index.css";
import initialCards from "../data/initialCards.js";
import { Card } from "../classes/Card.js";
import { FormValidator } from "../classes/FormValidator.js";
import { Section } from "../classes/Section";
import { PopupWithImage } from "../classes/PopupWithImage";
import { PopupWithForm } from "../classes/PopupWithForm";
import { UserInfo } from "../classes/UserInfo";

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
const cardsSection = new Section(
  { items: initialCards, renderer: (card) => createCard(card) },
  ".cards"
);
cardsSection.renderAll();

// Создание попапа для добавления карточек
const addCardPopup = new PopupWithForm(".popup_add-card", addCard);
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

function createCard(cardObj) {
  return new Card(cardObj, cardTemplateSelector, handleCardclick).getCard();
}
function addCard(name, link) {
  cardsSection.addItem(createCard({ name: name, link: link }));
}

//------------------------- Поп-ап для раскрытия изображения
const imagePopup = new PopupWithImage(".popup_image");
function handleCardclick(e) {
  imagePopup.open(e.target.src, e.target.alt);
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
//------------------------- Профиль юзера
const user = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__status",
});

const editProfileBtn = document.querySelector(".profile__button_type_edit");
const profilePopup = new PopupWithForm(
  ".popup_edit-profile",
  user.setUserInfo.bind(user)
);
const nameInput = document.querySelector(".form__input_name");
const infoInput = document.querySelector(".form__input_status");

const editProfileFormValidator = new FormValidator(
  formConfig,
  profilePopup.form
);
editProfileFormValidator.enableValidation();
editProfileBtn.addEventListener("click", () => {
  editProfileFormValidator.hideErrors();
  editProfileFormValidator.enableSubmitBtn();
  [nameInput.value, infoInput.value] = [...user.getUserInfo()];
  profilePopup.open();
});
