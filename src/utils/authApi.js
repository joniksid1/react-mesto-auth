export const BASE_URL = 'https://auth.nomoreparties.co';


const getRequest = (url, options) => {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          const errorMessage = errorData.message || 'Request failed';
          const errorWithStatus = new Error(errorMessage);
          errorWithStatus.status = response.status;
          throw errorWithStatus;
        });
      }
    })
};

export const register = (password, email) => {
  return getRequest(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const authorize = (password, email) => {
  return getRequest(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const getContent = (token) => {
  return getRequest(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
};

