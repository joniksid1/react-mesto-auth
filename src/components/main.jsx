import React from 'react';
import Card from './card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onDeletePopup, onSelectDeleteCard, onImageOpen, onCardClick, onCardLike }) {

  const { name, about, avatar } = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-overlay">
          <img
            src={avatar}
            alt="Аватар пользователя"
            className="profile__image"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title" aria-label="Имя пользователя">
            {name}
          </h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          />
          <p className="profile__caption">
            {about}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Карточки мест России">
        <ul className="elements__list">
          {cards.slice().reverse().map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onDeletePopup}
              onSelectDeleteCard={onSelectDeleteCard}
              onDeletePopup={onDeletePopup}
              onImageOpen={onImageOpen}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main
