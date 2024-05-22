import './pages/index.css';
import {updateData} from "./components/requests";
import {openEditProfileForm, submitEditProfileForm, updateProfile} from "./components/profile";
import {openModalPopup, setupModalCloseListeners} from "./components/modal";

import {openPopupWithImage, renderCards, submitNewCardForm} from "./components/card";
import {isValid} from "./components/validation";

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector(".popup_type_edit");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];

const container = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const newPlaceForm = document.forms['new-place'];

const popupList = [newCardModal, editProfileModal, imageModal];

const popupInputs = document.querySelectorAll('.popup__input');
let user;

updateData().then((data) => {
    if (data.user) {
        user = data.user;

        updateProfile(profileName, profileDescription);
    }
    if (data.cards) {

        renderCards(container, data.user, (e) => {
            openPopupWithImage(e, imageModal)
        });
    }
})
setupModalCloseListeners(popupList);

editProfileButton.addEventListener("click", () => {
    openEditProfileForm(profileName, profileDescription, editProfileModal, editProfileForm)
});
editProfileModal.addEventListener("submit", (e) => {
    submitEditProfileForm(e, editProfileModal, profileName, profileDescription, editProfileForm);
});
addCardButton.addEventListener("click", () => {
    openModalPopup(newCardModal);
});
newCardModal.addEventListener("submit", (e) => {
    submitNewCardForm(e, imageModal, user, container, newCardModal, newPlaceForm);
});
popupInputs.forEach(element => {
    element.addEventListener('input', (event) => {
        isValid(event.target)
    });
});


