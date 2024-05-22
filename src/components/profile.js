import {closeModalPopup, openModalPopup} from "./modal";
import {getUser, updateUser} from "./requests";

const changeProfile = (name, description, profileName, profileDescription) => {
    profileName.textContent = name;
    profileDescription.textContent = description;
}
const submitEditProfileForm = (e, editProfileModal, profileName, profileDescription, editProfileForm) => {
    e.preventDefault();
    updateUser(
        editProfileForm.elements.name.value,
        editProfileForm.elements.description.value
    )
        .then(data => {
            changeProfile(
                data.name,
                data.about,
                profileName,
                profileDescription
            )
            console.log(data)
        });
    closeModalPopup(editProfileModal);
}
const openEditProfileForm = (profileName, profileDescription, editProfileModal, editProfileForm) => {
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    openModalPopup(editProfileModal);
}

function updateProfile(profileName, profileDescription) {
    getUser().then(user => {
        changeProfile(user.name, user.about, profileName, profileDescription)
    });
}

export {submitEditProfileForm, openEditProfileForm, updateProfile}