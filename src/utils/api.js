const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers,configFunc }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._configFunc = configFunc;
  }
  getProductsList() {
    return fetch(`${this._baseUrl}/products`, { headers: this._headers }).then(
      onResponse
    );
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._configFunc()).then(
      onResponse
    );
  }
  search(searchQuery) {

    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, 
      this._configFunc()
    ).then(onResponse);
  }
  setUserInfo(dataUser) {
    console.log({ dataUser });
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._configFunc(),
      method: 'PATCH',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? 'DELETE' : 'PUT',
      ...this._configFunc(),
    }).then(onResponse);
  }

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, 
    this._configFunc()
    ).then(onResponse)
  }
  getUsersById(userId) {
    return fetch(`${this._baseUrl}/v2/group-9/users/${userId}`, {
      ...this._configFunc(),
    }).then(onResponse);
  }
  getUsers() {
    return fetch(`${this._baseUrl}/v2/group-9/users`, 
    this._configFunc()
    ).then(onResponse);
  }
  deleteProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
      ...this._configFunc(),
      method: 'DELETE',
    }).then(onResponse);
  }
  addReview(productId,body){
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      ...this._configFunc(),
      method: 'POST',
      body: JSON.stringify(body)
    }).then(onResponse);
  }
  deleteReview(productId, reviewId){
    return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
      ...this._configFunc(),
      method: 'DELETE',
    }).then(onResponse);
  }
}

const configFunc = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};
const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:`Bearer ${localStorage.getItem("token")}`,
  },
  configFunc: configFunc
};



const api = new Api(config);

export default api;
