import React from "react";
import PopupWithForm from "./popup-with-form";

function DeletePopup({ isOpen, onClose, onDeleteCard, card, onLoading, onOverlayClick }) {

  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    />
  )
}

export default DeletePopup;
