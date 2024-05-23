import './pages/index.css';
import {updateData} from "./components/api";
import {openEditProfileForm, submitNewAvatar, submitProfileEditForm, updateProfile} from "./components/profile";
import {openModalPopup, setupModalCloseListeners} from "./components/modal";
import {openPopupWithImage, renderCards, submitNewCardForm} from "./components/card";
import {isValid} from "./components/validation";
import {DOM_ELEMENTS} from "./components/constants";

let user;

updateData().then((data) => {
    if (data.user) {
        user = data.user;

        updateProfile(
            DOM_ELEMENTS.profileName,
            DOM_ELEMENTS.profileDescription,
            DOM_ELEMENTS.avatar
        );
    }
    if (data.cards) {

        renderCards(DOM_ELEMENTS.container, data.user, (e) => {
            openPopupWithImage(e, DOM_ELEMENTS.imageModal)
        });
    }
})
setupModalCloseListeners(DOM_ELEMENTS.popupList);

DOM_ELEMENTS.editProfileButton.addEventListener("click", () => {
    openEditProfileForm(
        DOM_ELEMENTS.profileName,
        DOM_ELEMENTS.profileDescription,
        DOM_ELEMENTS.editProfileModal,
        DOM_ELEMENTS.editProfileForm
    )
});
DOM_ELEMENTS.editProfileModal.addEventListener("submit", (e) => {
    submitProfileEditForm(
        e,
        DOM_ELEMENTS.editProfileModal,
        DOM_ELEMENTS.profileName,
        DOM_ELEMENTS.profileDescription,
        DOM_ELEMENTS.editProfileForm,
        DOM_ELEMENTS.avatar
    );
});
DOM_ELEMENTS.addCardButton.addEventListener("click", () => {
    openModalPopup(DOM_ELEMENTS.newCardModal);
});
DOM_ELEMENTS.newCardModal.addEventListener("submit", (e) => {
    submitNewCardForm(
        e,
        DOM_ELEMENTS.imageModal,
        user,
        DOM_ELEMENTS.container,
        DOM_ELEMENTS.newCardModal,
        DOM_ELEMENTS.newPlaceForm
    );
});
DOM_ELEMENTS.popupInputs.forEach(element => {
    element.addEventListener("input", (event) => {
        isValid(event.target)
    });
});
DOM_ELEMENTS.editAvatarButton.addEventListener('click', () => {
    openModalPopup(DOM_ELEMENTS.editAvatarModal)
});
DOM_ELEMENTS.editAvatarModal.addEventListener("submit", (e) => {
    submitNewAvatar(
        e,
        DOM_ELEMENTS.editAvatarModal,
        DOM_ELEMENTS.editAvatarForm,
        DOM_ELEMENTS.profileName,
        DOM_ELEMENTS.profileDescription,
        DOM_ELEMENTS.avatar
    );
})