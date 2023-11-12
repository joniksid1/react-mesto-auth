import React from "react";
import PopupWithForm from "./popup-with-form";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading, onOverlayClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameValue, setNameValue] = React.useState('');
  const [descriptionValue, setDescriptionValue] = React.useState('');

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: nameValue,
      about: descriptionValue,
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      setNameValue(currentUser.name);
      setDescriptionValue(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      button='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
      <div className="popup__form-wrapper">
        <input
          name="name"
          minLength={2}
          maxLength={40}
          type="text"
          id="nameInput"
          className="popup__input popup__input_type_name"
          required=""
          value={nameValue ?? ''}
          onChange={handleNameChange}
        />
        <span
          className="popup__input-error popup__input-error_type_name"
          id="nameInput-error"
        />
      </div>
      <div className="popup__form-wrapper">
        <input
          name="job"
          minLength={2}
          maxLength={200}
          type="text"
          id="about"
          className="popup__input popup__input_type_job"
          required=""
          value={descriptionValue ?? ''}
          onChange={handleDescriptionChange}
        />
        <span
          className="popup__input-error popup__input-error_type_job"
          id="about-error"
        />
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
