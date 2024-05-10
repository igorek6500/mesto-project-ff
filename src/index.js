import './pages/index.css';
import {closeModalPopup, openModalPopup, setupModalCloseListeners} from "./components/modal";
import {createCard, onDeleteCard, onLike} from "./components/card";
import renderCards from "./components/initialCards";

const container = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imageCaption = imageModal.querySelector('.popup__caption');
const imageElement = imageModal.querySelector('.popup__image');
const popupList = [newCardModal, editProfileModal, imageModal];

const openPopupWithImage = (evt) => {
    const {alt, src} = evt.target;
    setPopupCaption(alt);
    setPopupImage(src, alt);
    openModalPopup(imageModal);
}

const setPopupCaption = (caption) => {
    imageCaption.textContent = caption;
}

const setPopupImage = (src, alt) => {
    imageElement.src = src;
    imageElement.alt = alt;
}

const changeProfile = (name, description) => {
    profileName.textContent = name;
    profileDescription.textContent = description;
}

const submitNewCardForm = (e) => {
    e.preventDefault();
    const newPlaceForm = document.forms['new-place'];
    const newCard = {
        name: newPlaceForm.elements['place-name'].value,
        link: newPlaceForm.elements['link'].value
    };
    container.prepend(createCard(newCard, onDeleteCard, onLike, openPopupWithImage));
    closeModalPopup(newCardModal);
    newPlaceForm.reset();
}

const submitEditProfileForm = (e) => {
    e.preventDefault();
    const editProfileForm = document.forms['edit-profile'];
    changeProfile(editProfileForm.elements.name.value, editProfileForm.elements.description.value);
    closeModalPopup(editProfileModal);
}

const openEditProfileForm = () => {
    document.forms['edit-profile'].name.value = profileName.textContent;
    document.forms['edit-profile'].description.value = profileDescription.textContent;
    openModalPopup(editProfileModal);
}

editProfileButton.addEventListener("click", openEditProfileForm);
addCardButton.addEventListener("click", () => {
    openModalPopup(newCardModal);
});
newCardModal.addEventListener("submit", submitNewCardForm);
editProfileModal.addEventListener("submit", submitEditProfileForm);

renderCards(container, openPopupWithImage);
setupModalCloseListeners(popupList);