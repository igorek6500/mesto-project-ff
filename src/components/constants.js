export const DOM_ELEMENTS = {
    editProfileButton: document.querySelector('.profile__edit-button'),
    editProfileModal: document.querySelector('.popup_type_edit'),
    profileName: document.querySelector('.profile__title'),
    profileDescription: document.querySelector('.profile__description'),
    editProfileForm: document.forms['edit-profile'],
    editAvatarForm: document.forms['new-avatar'],
    editAvatarButton: document.querySelector('.profile__image-edit-wrapper'),
    editAvatarModal: document.querySelector('.popup_type_new-avatar'),
    avatar: document.querySelector('.profile__image'),
    container: document.querySelector('.places__list'),
    addCardButton: document.querySelector('.profile__add-button'),
    newCardModal: document.querySelector('.popup_type_new-card'),
    imageModal: document.querySelector('.popup_type_image'),
    newPlaceForm: document.forms['new-place'],
    popupList: [
        document.querySelector('.popup_type_new-card'),
        document.querySelector('.popup_type_edit'),
        document.querySelector('.popup_type_image'),
        document.querySelector('.popup_type_new-avatar')
    ],
    popupInputs: document.querySelectorAll('.popup__input')
};

const API_BASE_URL = 'https://mesto.nomoreparties.co/v1/';
const API_TOKEN = 'c85a9ee5-da17-44f1-aa81-04f86597517f';
const GROUP_ID = 'wff-cohort-14/';
const API_FINAL_URL = `${API_BASE_URL}${GROUP_ID}`;
const API_USER_ENDPOINT = `${API_FINAL_URL}users/me`;
const API_CARDS_ENDPOINT = `${API_FINAL_URL}cards`;
const API_CARDS_LIKES_ENDPOINT = `${API_CARDS_ENDPOINT}/likes/`;
const API_USER_AVATAR_ENDPOINT = `${API_USER_ENDPOINT}/avatar`;
const API_POST_HEADERS = {
    authorization: API_TOKEN,
    'Content-Type': 'application/json'
};
const API_GET_HEADERS = {
    authorization: API_TOKEN
};

export {
    API_USER_ENDPOINT,
    API_GET_HEADERS,
    API_POST_HEADERS,
    API_CARDS_ENDPOINT,
    API_CARDS_LIKES_ENDPOINT,
    API_USER_AVATAR_ENDPOINT
};

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'error_active'
}

export const buttonsText = {
    savingText: 'Сохранение...',
    defaultText: 'Сохранить'
}

const submitButtonProfileEditForm = DOM_ELEMENTS.editProfileForm.querySelector('button[type="submit"]');
const submitButtonNewCardForm = DOM_ELEMENTS.newPlaceForm.querySelector('button[type="submit"]');
const submitButtonEditAvatarForm = DOM_ELEMENTS.editAvatarForm.querySelector('button[type="submit"]');

export {submitButtonProfileEditForm, submitButtonNewCardForm, submitButtonEditAvatarForm}