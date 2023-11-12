import React from "react";
import PopupWithForm from "./popup-with-form";

function AddPlacePopup({ isOpen, onClose, onAddCard, onLoading, onOverlayClick }) {
  const [ placeNameValue, setPlaceNameValue ] = React.useState('');
  const [ linkValue, setLinkValue ] = React.useState('');

  const handlePlaceNameChange = (e) => {
    setPlaceNameValue(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLinkValue(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: placeNameValue,
      link: linkValue,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setPlaceNameValue('');
      setLinkValue('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleAddPlaceSubmit}
      onOverlayClick={onOverlayClick}
    >
      <div className="popup__form-wrapper">
        <input
          name="place"
          minLength={2}
          maxLength={30}
          placeholder="Название"
          type="text"
          id="name"
          className="popup__input popup__input_type_place"
          required=""
          value={placeNameValue ?? ''}
          onChange={handlePlaceNameChange}
        />
        <span
          className="popup__input-error popup__input-error_type_place"
          id="name-error"
        />
      </div>
      <div className="popup__form-wrapper">
        <input
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          id="link"
          className="popup__input popup__input_type_link"
          required=""
          value={linkValue ?? ''}
          onChange={handleLinkChange}
        />
        <span
          className="popup__input-error popup__input-error_type_link"
          id="link-error"
        />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
