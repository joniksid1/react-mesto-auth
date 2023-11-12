import React from 'react';
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип проекта место, Россия"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
