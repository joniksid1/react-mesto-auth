import React from "react";

function ImagePopup({ card, onClose, onOverlayClick}) {

  return (
    <div className={`popup image-popup ${card.link ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
      <figure className="image-popup__figure">
        <button
          className="popup__close-button image-popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          src={ card.link }
          alt={ card.name }
          className="image-popup__image"
        />
        <figcaption className="image-popup__caption">
          { card.name }
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
