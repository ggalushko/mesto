export class Api {
  constructor(options) {
    this.options = options;
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this.options.baseURL}/cards`, {
        headers: {
          ...this.options.headers,
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
      const res = await fetch(`${this.options.baseURL}/cards`, {
        method: "POST",
        headers: {
          ...this.options.headers,
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
    }
  }

  async getUserData() {
    try {
      const res = await fetch(`${this.options.baseURL}/users/me `, {
        headers: {
          ...this.options.headers,
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
      const res = await fetch(`${this.options.baseURL}/users/me `, {
        method: "PATCH",
        headers: {
          ...this.options.headers,
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
    }
  }

  async deleteCard(id) {
    try {
      const res = await fetch(`${this.options.baseURL}/cards/${id}`, {
        method: "DELETE",
        headers: {
          ...this.options.headers,
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
      const res = await fetch(`${this.options.baseURL}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          ...this.options.headers,
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
      const res = await fetch(`${this.options.baseURL}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          ...this.options.headers,
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(imageURL) {
    try {
      const res = await fetch(`${this.options.baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          ...this.options.headers,
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
    }
  }
}
