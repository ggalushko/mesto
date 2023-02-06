let editBtn = document.querySelector(".profile__button_type_edit");
let closeBtn = document.querySelector(".form-edit__button-close");
let saveInfoBtn = document.querySelector(".form-edit__button-save");
let popup = document.querySelector(".popup");

editBtn.addEventListener("click", () => {
  let fields = document.querySelectorAll(".form-edit__input");
  let nameField = fields[0];
  let infoField = fields[1];

  popup.classList.add("popup_opened");
  nameField.value = document.querySelector(".profile__name").textContent;
  infoField.value = document.querySelector(".profile__status").textContent;
});

closeBtn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    popup.classList.remove("popup_opened");
  },
  false
);

saveInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let profileName = document.querySelector(".profile__name");
  let profileInfo = document.querySelector(".profile__status");

  let fields = document.querySelectorAll(".form-edit__input");

  profileName.textContent = fields[0].value;
  profileInfo.textContent = fields[1].value;

  popup.classList.remove("popup_opened");
});
