import './pages/index.css';
import {createCardData, updateData} from "./components/api";
import {submitNewAvatar, submitProfileEditForm, updateProfileAvatar, updateProfileInfo} from "./components/profile";
import {closeModalPopup, openModalPopup, setupModalCloseListeners} from "./components/modal";
import {createCard, onDeleteCard, onLike} from "./components/card";
import {DOM_ELEMENTS, validationConfig} from "./components/constants";
import {clearValidation, enableValidation} from "./components/validation";

let user;

enableValidation(validationConfig);

function submitNewCardForm(e, imageModal, user, container, newCardModal, newPlaceForm) {
    e.preventDefault();

    createCardData(newPlaceForm.elements['place-name'].value, newPlaceForm.elements['link'].value)
        .then((card) => {
            container.prepend(
                createCard(
                    card,
                    user,
                    onDeleteCard,
                    onLike,
                    (e) => openPopupWithImage(e, imageModal)
                )
            );
            newPlaceForm.reset();
        })
        .catch(error => console.error('Error creating new card:', error))
        .finally(() => closeModalPopup(newCardModal));
}

function openPopupWithImage(evt, imageModal) {
    const {alt, src} = evt.target;
    setPopupCaption(alt, imageModal.querySelector('.popup__caption'));
    setPopupImage(src, alt, imageModal.querySelector('.popup__image'));
    openModalPopup(imageModal);
}

function setPopupCaption(caption, imageCaption) {
    imageCaption.textContent = caption;
}

function setPopupImage(src, alt, imageElement) {
    imageElement.src = src;
    imageElement.alt = alt;
}

function openEditProfileForm(profileName, profileDescription, editProfileModal, editProfileForm) {
    clearValidation(editProfileForm, validationConfig)
    // clearForm(editProfileModal);
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    openModalPopup(editProfileModal);
}

updateData().then((data) => {

    if (data.user) {
        user = data.user;
        updateProfileInfo(data.user.name, data.user.about, DOM_ELEMENTS.profileName, DOM_ELEMENTS.profileDescription);
        updateProfileAvatar(data.user.avatar, DOM_ELEMENTS.avatar);
    }
    if (data.cards) {
        data.cards.forEach(card => {
            DOM_ELEMENTS.container.appendChild(
                createCard(card, data.user, onDeleteCard, onLike, (e) => {
                    openPopupWithImage(e, DOM_ELEMENTS.imageModal);
                })
            )
        })
    }
}).catch(error => {
    console.error('Ошибка при получении данных:', error);
    return {
        user: null,
        cards: null
    };
});

setupModalCloseListeners(DOM_ELEMENTS.popupList);

DOM_ELEMENTS.editProfileButton.addEventListener("click", () => {
    openEditProfileForm(
        DOM_ELEMENTS.profileName,
        DOM_ELEMENTS.profileDescription,
        DOM_ELEMENTS.editProfileModal,
        DOM_ELEMENTS.editProfileForm
    )
});
DOM_ELEMENTS.editProfileModal.addEventListener("submit", async (e) => {
    const submitButton = DOM_ELEMENTS.editProfileForm.querySelector('button[type="submit"]');
    submitButton.textContent = "Сохранение...";
    try {
        await submitProfileEditForm(
            e,
            DOM_ELEMENTS.editProfileModal,
            DOM_ELEMENTS.profileName,
            DOM_ELEMENTS.profileDescription,
            DOM_ELEMENTS.editProfileForm,
            DOM_ELEMENTS.avatar
        );
        submitButton.textContent = "Сохранить";
    } catch (error) {
        submitButton.textContent = "Сохранить";
        console.error("Ошибка:", error);
    }
});
DOM_ELEMENTS.addCardButton.addEventListener("click", () => {
    DOM_ELEMENTS.newPlaceForm.reset();
    clearValidation(DOM_ELEMENTS.newPlaceForm, validationConfig)
    openModalPopup(DOM_ELEMENTS.newCardModal);
});
DOM_ELEMENTS.newCardModal.addEventListener("submit", async (e) => {
    const submitButton = DOM_ELEMENTS.newPlaceForm.querySelector('button[type="submit"]');
    submitButton.textContent = "Сохранение...";
    try {
        await submitNewCardForm(
            e,
            DOM_ELEMENTS.imageModal,
            user,
            DOM_ELEMENTS.container,
            DOM_ELEMENTS.newCardModal,
            DOM_ELEMENTS.newPlaceForm
        );
        submitButton.textContent = "Сохранить";
    } catch (error) {
        submitButton.textContent = "Сохранить";
        console.error("Ошибка:", error);
    }
});

DOM_ELEMENTS.editAvatarButton.addEventListener('click', () => {
    DOM_ELEMENTS.editAvatarForm.reset();
    clearValidation(DOM_ELEMENTS.editAvatarForm, validationConfig)
    openModalPopup(DOM_ELEMENTS.editAvatarModal);
});
DOM_ELEMENTS.editAvatarModal.addEventListener("submit", async (e) => {
    const submitButton = DOM_ELEMENTS.editAvatarForm.querySelector('button[type="submit"]');
    submitButton.textContent = "Сохранение...";
    try {
        await submitNewAvatar(
            e,
            DOM_ELEMENTS.editAvatarModal,
            DOM_ELEMENTS.editAvatarForm,
            DOM_ELEMENTS.avatar
        );
        submitButton.textContent = "Сохранить";
    } catch (error) {
        submitButton.textContent = "Сохранить";
        console.error("Ошибка:", error);
    }
});