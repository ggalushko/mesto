export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector, id }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this.id = id;
  }

  getUserInfo() {
    const name = this._nameElement.innerText;
    const info = this._infoElement.innerText;
    return { name, info };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.innerText = name;
    this._infoElement.innerText = about;
    this._avatarElement.src = avatar;
    this.id = _id;
  }
}
