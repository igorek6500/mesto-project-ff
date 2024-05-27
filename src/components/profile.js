import {closeModalPopup} from "./modal";
import {updateAvatar, updateUserData} from "./api";
import {buttonsText, submitButtonEditAvatarForm, submitButtonProfileEditForm} from "./constants";

function updateProfileInfo(name, description, profileName, profileDescription) {
    profileName.textContent = name;
    profileDescription.textContent = description;
}

function updateProfileAvatar(avatar, profileAvatar) {
    profileAvatar.style.backgroundImage = `url('${avatar}')`;
}


function submitProfileEditForm(
    event,
    editProfileModal,
    profileName,
    profileDescription,
    editProfileForm
) {
    event.preventDefault();
    submitButtonProfileEditForm.textContent = buttonsText.savingText
    updateUserData(
        editProfileForm.elements.name.value,
        editProfileForm.elements.description.value
    )
        .then(user => {
            updateProfileInfo(
                user.name,
                user.about,
                profileName,
                profileDescription
            );
            closeModalPopup(editProfileModal);
        })
        .catch(error => {
            console.error('Error updating profile:', error)
        })
        .finally(() => submitButtonProfileEditForm.textContent = buttonsText.defaultText);
}

function submitNewAvatar(event, editAvatarModal, editAvatarForm, profileAvatar) {
    event.preventDefault();
    submitButtonEditAvatarForm.textContent = buttonsText.savingText;
    updateAvatar(editAvatarForm.link.value)
        .then((user) => {
            updateProfileAvatar(user.avatar, profileAvatar);
            closeModalPopup(editAvatarModal);
        }).catch(error => {
        console.error('Ошибка обновления профиля:', error)
    }).finally(() => submitButtonEditAvatarForm.textContent = buttonsText.defaultText);

}

export {submitProfileEditForm, submitNewAvatar, updateProfileInfo, updateProfileAvatar}