import React from 'react';
import { enableValidation } from "../utils/FormValidator";
import { registerValidationConfig } from "../utils/constants";

const Login = ({ onLogin }) => {

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  React.useEffect(() => {
    enableValidation(registerValidationConfig);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(passwordValue, emailValue);
  }

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  }

  return (
    <div className='register'>
      <h1 className='register__title'>Вход</h1>
      <form className='register__form' name='login' noValidate>
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
          <span
            className="register__input-error register__input-error_type_email"
          />
        </div>
        <div className="register__wrapper register__wrapper_type_input">
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="register__input register__input_type_password"
            required="true"
            minLength={6}
            value={passwordValue ?? ''}
            onChange={handlePasswordChange}
          />
          <span
            className="register__input-error register__input-error_type_password"
          />
        </div>
        <div className='register__wrapper register__wrapper_type_button'>
          <button
            className="register__button"
            type='submit'
            onClick={handleSubmit}>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
