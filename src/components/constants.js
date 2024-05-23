// export const editProfileButton = document.querySelector('.profile__edit-button');
// export const editProfileModal = document.querySelector('.popup_type_edit');
// export const profileName = document.querySelector('.profile__title');
// export const profileDescription = document.querySelector('.profile__description');
// export const editProfileForm = document.forms['edit-profile'];
// export const editAvatarForm = document.forms['new-avatar'];
// export const editAvatarButton = document.querySelector('.profile__image-edit-wrapper');
// export const editAvatarModal = document.querySelector('.popup_type_new-avatar');
// export const avatar = document.querySelector('.profile__image');
// export const container = document.querySelector('.places__list');
// export const addCardButton = document.querySelector('.profile__add-button');
// export const newCardModal = document.querySelector('.popup_type_new-card');
// export const imageModal = document.querySelector('.popup_type_image');
// export const newPlaceForm = document.forms['new-place'];
// export const popupList = [newCardModal, editProfileModal, imageModal, editAvatarModal];
// export const popupInputs = document.querySelectorAll('.popup__input');

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