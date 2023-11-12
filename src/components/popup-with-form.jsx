import React from "react";

function PopupWithForm({ name, title, button, children, isOpen, onClose, onSubmit, onLoading, onOverlayClick }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
      <div className={`popup__container ${name}-popup__container`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className={`popup__form ${name}-popup__form`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className={`popup__button ${name}-popup__button`} type="submit">
            {onLoading ? 'Cохранение...' : button || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
