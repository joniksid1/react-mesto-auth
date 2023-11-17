import React from 'react';

const Register = ({ onLogin }) => {

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

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
      <form className='register__form'>
        <div className="register__wrapper register__wrapper_type_input">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="register__input register__input_type_email"
            required=""
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
            required=""
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

export default Register;
