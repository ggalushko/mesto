import "../pages/index.css";
import {
  nameInput,
  infoInput,
  avatarClickArea,
  editProfileBtn,
  cardsApi,
  cardsSection,
  user,
  addCardFormValidator,
  addCardBtn,
  profilePopup,
  imagePopup,
  editProfileFormValidator,
  avatarPopup,
  addCardPopup,
  deletePopup,
  avatarPopupFormValidator,
} from "../utils/constants";

/*-----------------------------------------------------------------------------------------------------------------------------------*/
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
