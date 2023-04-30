export class Api {
  constructor(options) {
    this._options = options;
  }
  static popupAddCard = document.querySelector(".popup_add-card");
  static addCardBtn = Api.popupAddCard.querySelector(".form__button-save");
  static addCardBtnText = Api.addCardBtn.textContent;

  static popupEditProfile = document.querySelector(".popup_edit-profile");
  static editProfileBtn =
    Api.popupEditProfile.querySelector(".form__button-save");
  static editProfileBtnText = Api.editProfileBtn.textContent;

  static popupChangeAvatar = document.querySelector(".popup_change-avatar");
  static changeAvatarBtn =
    Api.popupChangeAvatar.querySelector(".form__button-save");
  static changeAvatarBtnText = Api.editProfileBtn.textContent;

  static loadingText = "Сохранение...";

  async getInitialCards() {
    try {
      const res = await fetch(`${this._options.baseURL}/cards`, {
        headers: {
          ...this._options.headers,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addCard(name, link) {
    try {
      Api.addCardBtn.textContent = Api.loadingText;
      const res = await fetch(`${this._options.baseURL}/cards`, {
        method: "POST",
        headers: {
          ...this._options.headers,
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      Api.addCardBtn.textContent = Api.addCardBtnText;
    }
  }

  async getUserData() {
    try {
      const res = await fetch(`${this._options.baseURL}/users/me `, {
        headers: {
          ...this._options.headers,
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async editProfile({ name, about }) {
    try {
      Api.editProfileBtn.textContent = Api.loadingText;
      const res = await fetch(`${this._options.baseURL}/users/me `, {
        method: "PATCH",
        headers: {
          ...this._options.headers,
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      Api.editProfileBtn.textContent = Api.editProfileBtnText;
    }
  }

  async deleteCard(id) {
    try {
      const res = await fetch(`${this._options.baseURL}/cards/${id}`, {
        method: "DELETE",
        headers: {
          ...this._options.headers,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addLike(id) {
    try {
      const res = await fetch(`${this._options.baseURL}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          ...this._options.headers,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async removeLike(id) {
    try {
      const res = await fetch(`${this._options.baseURL}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          ...this._options.headers,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(imageURL) {
    Api.changeAvatarBtn.textContent = Api.loadingText;
    try {
      const res = await fetch(`${this._options.baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          ...this._options.headers,
        },
        body: JSON.stringify({
          avatar: imageURL,
        }),
      });

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      Api.changeAvatarBtn.textContent = Api.changeAvatarBtnText;
    }
  }
}
