import {closeModalPopup, openModalPopup} from "./modal";
import {getUserData, updateAvatar, updateUserData} from "./requests";

function updateProfileInfo(name, description, avatar, profileName, profileDescription, profileAvatar) {
    profileName.textContent = name;
    profileDescription.textContent = description;
    profileAvatar.style.backgroundImage = `url('${avatar}')`;
}

function submitProfileEditForm(event, editProfileModal, profileName, profileDescription, editProfileForm, profileAvatar) {
    event.preventDefault();
    updateUserData(
        editProfileForm.elements.name.value,
        editProfileForm.elements.description.value
    )
        .then(data => {
            updateProfileInfo(
                data.name,
                data.about,
                data.avatar,
                profileName,
                profileDescription,
                profileAvatar
            )
        });
    closeModalPopup(editProfileModal);
}

function openEditProfileForm(profileName, profileDescription, editProfileModal, editProfileForm) {
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    openModalPopup(editProfileModal);
}


function submitNewAvatar(event, editAvatarModal, editAvatarForm, profileName, profileDescription, profileAvatar) {
    event.preventDefault();
    updateAvatar(editAvatarForm.link.value).then(() => {
        updateProfile(profileName, profileDescription, profileAvatar)
        closeModalPopup(editAvatarModal)
    });

}

function updateProfile(profileName, profileDescription, profileAvatar) {
    getUserData().then(user => {
        updateProfileInfo(user.name, user.about, user.avatar, profileName, profileDescription, profileAvatar)
    });
}

export {submitProfileEditForm, openEditProfileForm, updateProfile, submitNewAvatar}