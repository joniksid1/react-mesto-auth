import { formValidators } from "./constants";

class FormValidator {
  constructor(validationConfig, form) {
    this._form = form;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputErrorSelector = validationConfig.inputErrorSelector;
    this._inputErrorFrameClass = validationConfig.inputErrorFrameClass;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input)
    }
  };

  _showInputError(input) {
    const errorElement = this._form.querySelector(`${this._inputErrorSelector}${input.name}`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorFrameClass);
  };

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`${this._inputErrorSelector}${input.name}`);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorFrameClass);
  };

  setButtonState(isActive) {
    if (isActive) {
      this._buttonElement.removeAttribute('disabled');
    } else {
      this._buttonElement.setAttribute('disabled', true);
    }
  };

  _preventDefault(evt) {
    evt.preventDefault();
  };

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      this.setButtonState(false);
      this._preventDefault(evt);
      });
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          if (this._form.checkValidity()) {
            this.setButtonState(true);
          } else {
            this.setButtonState(false);
          }
        });
      });
  };

  resetValidation() {
    this.setButtonState(false);
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };

  startValidate() {
    this._setEventListeners();
  };

};

const createValidators = (validationConfig, formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  const formName = formElement.getAttribute('name');
  formValidators[formName] = validator;
  validator.startValidate();
}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    createValidators(validationConfig, formElement);
  });
};

export { enableValidation, FormValidator }
