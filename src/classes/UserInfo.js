export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const name = this._nameElement.innerText;
    const info = this._infoElement.innerText;
    return { name, info };
  }
  setUserInfo(name, info) {
    this._nameElement.innerText = name;
    this._infoElement.innerText = info;
  }
}
