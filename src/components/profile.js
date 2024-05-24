import {closeModalPopup} from "./modal";
import {updateAvatar, updateUserData} from "./api";

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
    try {
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
                )
            });
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
    closeModalPopup(editProfileModal);
}

function submitNewAvatar(event, editAvatarModal, editAvatarForm, profileAvatar) {
    event.preventDefault();
    try {
        updateAvatar(editAvatarForm.link.value).then((user) => {
            updateProfileAvatar(user.avatar, profileAvatar);
            closeModalPopup(editAvatarModal)
        });
    } catch (error) {
        console.error('Ошибка обновления профиля:', error);
        throw error;
    }
}

export {submitProfileEditForm, submitNewAvatar, updateProfileInfo, updateProfileAvatar}