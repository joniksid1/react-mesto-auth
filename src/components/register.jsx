import React from "react";
import { Link } from 'react-router-dom';
import { enableValidation } from "../utils/FormValidator";
import { registerValidationConfig } from "../utils/constants";

const Register = ({ onRegister }) => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  React.useEffect(() => {
    enableValidation(registerValidationConfig);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(passwordValue, emailValue);
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
        <div className="register__wrapper register__wrapper_type_input">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="register__input register__input_type_email"
            required="true"
            value={emailValue ?? ''}
            onChange={handleEmailChange}
          />
          <span className="register__input-error register__input-error_type_email" />
        </div>
        <div className="register__wrapper register__wrapper_type_input">
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="register__input register__input_type_password"
            minLength={6}
            required="true"
            value={passwordValue ?? ''}
            onChange={handlePasswordChange}
          />
          <span className="register__input-error register__input-error_type_password" />
        </div>
        <div className="register__wrapper register__wrapper_type_button">
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
          <p className="register__caption">
            Уже зарегистрированы?
            <Link to="/sign-in" className="register__caption register__link">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
