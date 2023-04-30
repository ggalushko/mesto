import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Api } from "../api/Api";
import { PopupVerify } from "../components/PopupVerify";
import {
  formConfig,
  cardTemplateSelector,
  nameInput,
  infoInput,
  avatarClickArea,
  editProfileBtn,
  cardsApi
} from "../utils/constants";

/*-----------------------------------------------------------------------------------------------------------------------------------*/

//------------------------- Инициализация API и получение данных пользователя


Promise.all([cardsApi.getUserData(), cardsApi.getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    user.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatarURL: userData.avatar,
      id: userData._id,
    });
    cardsSection.renderAll(cards);
  })
  .catch((err) => console.log(err));

//-------------------------  Отрисовка карточек

const cardsSection = new Section(
  { renderer: (card) => createCard(card) },
  ".cards"
);

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

function addCard({ name, link }) {
  cardsApi
    .addCard(name, link)
    .then((res) => {
      addCardPopup.renderLoading(true);
      cardsSection.addItem(
        createCard({
          ...res,
        })
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addCardPopup.renderLoading(false);
      addCardPopup.close();
    });
}

//-------------------------  Отрисовка карточек

const deletePopup = new PopupVerify(".popup_delete-card", deletePopupCallback);
deletePopup.setEventListeners();

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

// Создание попапа для добавления карточек
const addCardPopup = new PopupWithForm(".popup_add-card", addCard);
addCardPopup.setEventListeners();
const addCardBtn = document.querySelector(".profile__button_type_add");

// Включение валидации
const addCardFormValidator = new FormValidator(
  formConfig,
  document.forms["form-add-card"]
);
addCardFormValidator.enableValidation();

addCardBtn.addEventListener("click", () => {
  addCardFormValidator.hideErrors();
  addCardFormValidator.disableSubmitBtn();
  addCardPopup.open();
});

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
  infoSelector: ".profile__about",
  avatarSelector: ".profile__picture",
  id: null,
});

const profilePopup = new PopupWithForm(
  ".popup_edit-profile",
  profilePopupSubmit
);

function profilePopupSubmit({ name, about }) {
  cardsApi
    .editProfile({ name: name, about: about })
    .then((data) => {
      profilePopup.renderLoading(true);
      user.setUserInfo({
        name: data.name,
        about: data.about,
        avatarURL: data.avatar,
        id: data._id,
      });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profilePopup.renderLoading(false);
      profilePopup.close();
    });
}

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

//-------------------------  Изменение автара
const avatarPopup = new PopupWithForm(".popup_change-avatar", changeAvatar);
avatarPopup.setEventListeners();

function changeAvatar(image) {
  cardsApi
    .changeAvatar(image.link)
    .then((res) => {
      avatarPopup.renderLoading(true);
      user.changeAvatar(res.avatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false);
      avatarPopup.close();
    });
}

const avatarPopupFormValidator = new FormValidator(
  formConfig,
  avatarPopup.form
);
avatarPopupFormValidator.enableValidation();
avatarClickArea.addEventListener("click", () => {
  avatarPopupFormValidator.hideErrors();
  avatarPopupFormValidator.disableSubmitBtn();
  avatarPopup.open();
});
