const apiOptions = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: '879fc354-cfc1-42a1-b8be-cb6ca897d345',
    "Content-Type": "application/json",
  },
};


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorSelector: '.popup__input-error_type_',
  inputErrorFrameClass: 'popup__input_error-frame',
};

const formValidators = {}

export { apiOptions, validationConfig, formValidators };
