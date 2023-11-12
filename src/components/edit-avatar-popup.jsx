import React from "react";
import PopupWithForm from "./popup-with-form";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading, onOverlayClick }) {

  const avatarLink = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink.current.value
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarLink.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
      <div className="popup__form-wrapper">
        <input
          name="avatar-link"
          placeholder="Ссылка на картинку"
          type="url"
          id="avatar-link"
          className="popup__input popup__input_type_link"
          required=""
          ref={avatarLink}
        />
        <span
          className="popup__input-error popup__input-error_type_avatar-link"
          id="avatar-link-error"
        />
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
