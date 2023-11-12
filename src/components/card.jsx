import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeletePopup, onSelectDeleteCard, onImageOpen }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__heart ${isLiked && 'elements__heart_active'}`
  );

  function handleClick() {
    onCardClick(card);
    onImageOpen();
  }

  function handleDeleteClick() {
    onDeletePopup();
    onSelectDeleteCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="elements__list-item">
      <img alt="Изображение места на карточке" className="elements__image" src={card.link} onClick={handleClick} />
      {isOwn && <button className="elements__delete" onClick={handleDeleteClick} />}
      <div className="elements__caption">
        <h2 className="elements__title">
          {card.name}
        </h2>
        <div className="elements__like-wrapper">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card
