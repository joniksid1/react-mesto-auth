import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes } from "react-router-dom";
import '../index.css';
import Header from './header';
import Main from './main';
import Footer from './footer';
import ImagePopup from './image-popup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';
import api from '../utils/Api';
import EditProfilePopup from './edit-profile-popup';
import EditAvatarPopup from './edit-avatar-popup';
import AddPlacePopup from './add-place-popup';
import DeletePopup from './delete-popup';
import ProtectedRoute from './protected-route';
import Register from './register';
import Login from './login';
import { validationConfig, formValidators } from '../utils/constants';
import { enableValidation, FormValidator } from '../utils/FormValidator';
import InfoToolTip from './info-tool-tip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopup] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(true);
  const [isSucsessed, setIsSucsessed] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    };
  };

  const resetValidationAll = useCallback((formValidators) => {
    for (const key in formValidators) {
      if (formValidators.hasOwnProperty(key) && formValidators[key] instanceof FormValidator) {
        formValidators[key].resetValidation();
      }
    }
  }, []);

  const closeAllPopups = useCallback(() => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setDeletePopup(false);
    setSelectedCard([]);
    setSelectedDeleteCard([]);
    resetValidationAll(formValidators);
    formValidators['delete'].setButtonState(true);
  },
    [
      setEditAvatarPopup,
      setEditProfilePopup,
      setAddPlacePopup,
      setDeletePopup,
      setSelectedCard,
      setSelectedDeleteCard,
      resetValidationAll,
    ]
  );

  useEffect(() => {
    enableValidation(validationConfig);
    const handleEscKey = (event) => {
      if (
        (isEditProfilePopupOpen
          || isAddPlacePopupOpen
          || isEditAvatarPopupOpen
          || isDeletePopupOpen
          || isImagePopupOpen)
        && event.key === "Escape") {
        closeAllPopups();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };

  },
    [
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isDeletePopupOpen,
      isImagePopupOpen,
      closeAllPopups
    ]
  );


  const handleDeletePopupClick = () => {
    setDeletePopup(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const handleImagePopupOpen = () => {
    setImagePopupOpen(true);
  }

  function showLoader() {
    setIsLoading(true);
  }

  function removeLoader() {
    setIsLoading(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setlike(card._id, !isLiked)
      .then((newCard) => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    showLoader()

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
        formValidators['delete'].setButtonState(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function handleUpdateAvatar(data) {
    showLoader()

    api.changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function handleUpdateUser(data) {
    showLoader();

    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function handleAddCard(data) {
    showLoader();

    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        removeLoader()
      });
  }

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <div className="page__container">
            <Header />
            <Routes>
              <Route path='/' element={<ProtectedRoute
                loggedIn={isloggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onDeletePopup={handleDeletePopupClick}
                onSelectDeleteCard={setSelectedDeleteCard}
                onImageOpen={handleImagePopupOpen}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
              />} />
              <Route path='/sign-up'
                element={<Register
                />} />
              <Route path='/sign-in'
                element={<Login
                />} />
            </Routes>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
            onOverlayClick={handleOverlayClick}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
            onLoading={isLoading}
            onOverlayClick={handleOverlayClick}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
          />
          <DeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={selectedDeleteCard}
            onLoading={isLoading}
            onOverlayClick={handleOverlayClick}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
            onOverlayClick={handleOverlayClick}
          />
          <InfoToolTip
            isSucsessed={isSucsessed}
            isOpen={isToolTipOpen}
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
          />
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
