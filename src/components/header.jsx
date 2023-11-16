import React from 'react';
import logo from '../images/header-logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header() {
  const handleClick = () => {

  }
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип проекта место, Россия"
        className="header__logo"
      />
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
          onClick={handleClick}>
          Выйти
        </Link>} />
      </Routes>
    </header>
  );
}

export default Header;
