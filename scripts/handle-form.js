let editProfileBtn = document.querySelector(".profile__button_type_edit");
let popup = document.querySelector(".popup");
let closePopupBtn = document.querySelector(".form-container__button-close");

let form = document.querySelector(".form-edit");
let fields = form.querySelectorAll(".form-edit__input");

let profileName = document.querySelector(".profile__name");
let profileInfo = document.querySelector(".profile__status");

editProfileBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
form.addEventListener("submit", editProfile);

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openPopup() {
  popup.classList.add("popup_opened");
  fields[0].value = profileName.textContent;
  fields[1].value = profileInfo.textContent;
}

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = fields[0].value;
  profileInfo.textContent = fields[1].value;
  closePopup();
}