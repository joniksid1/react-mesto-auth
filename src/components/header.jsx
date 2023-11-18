import React from 'react';
import logo from '../images/header-logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип проекта место, Россия"
        className="header__logo"
      />
      <div className='header__wrapper'>
        {email && <p className='header__email'>{email}</p>}
        <Routes>
          <Route path='/sign-up' element={<Link to='/sign-in'
            className='header__link'>
            Войти
          </Link>} />
          <Route path='/sign-in' element={<Link to='/sign-up'
            className='header__link'>
            Регистрация
          </Link>} />
          <Route path='/' element={<Link to='/sign-in'
            className='header__link'
            onClick={onSignOut}>
            Выйти
          </Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
