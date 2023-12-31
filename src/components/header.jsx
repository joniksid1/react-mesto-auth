import React, { useState } from 'react';
import logo from '../images/header-logo.svg';
import { Link, Routes, Route } from 'react-router-dom';
import closeIcon from '../images/close-icon.svg';

function Header({ email, onSignOut }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <>
      {isMenuOpened && (
        <div className='header__menu'>
          {email && <p className='header__email header__email_type_mobile'>{email}</p>}
          <Link to='/sign-in' className='header__link header__link_type_mobile' onClick={() => { onSignOut(); toggleMenu(); }}>
            Выйти
          </Link>
        </div>
      )}
      <header className="header">
        <img
          src={logo}
          alt="Логотип проекта место, Россия"
          className="header__logo"
        />
        <div className='header__wrapper'>
          {email && <p className='header__email header__email_type_desktop'>{email}</p>}
          <Routes>
            <Route path='/sign-up' element={<Link to='/sign-in'
              className='header__link'>
              Войти
            </Link>} />
            <Route path='/sign-in' element={<Link to='/sign-up'
              className='header__link'>
              Регистрация
            </Link>} />
            <Route path='/' element={
              <>
                <div className='header__button' onClick={toggleMenu}>
                  {isMenuOpened
                    ?
                    <img
                      src={closeIcon}
                      className="header__button header__button_type_close"
                      aria-label="Закрыть"
                      alt="Иконка закрытия"
                    />
                    :
                    '☰'
                  }
                </div>
                <Link to='/sign-in'
                  className='header__link header__link_type_desktop'
                  onClick={onSignOut}>
                  Выйти
                </Link>
              </>
            } />
          </Routes>
        </div>
      </header>
    </>
  );
}

export default Header;
