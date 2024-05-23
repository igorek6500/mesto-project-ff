import {clearForm} from "./validation";


const closeWithEscapeButton = (e) => {
    if (e.key === "Escape") {
        const modalIsOpen = document.querySelector('.popup_is-opened');
        if (modalIsOpen) {
            closeModalPopup(modalIsOpen);
        }
    }
}

const openModalPopup = (domElement) => {
    domElement.classList.toggle("popup_is-opened");
    document.addEventListener('keydown', closeWithEscapeButton);
    if (
        domElement.classList.contains('popup_type_new-card') ||
        domElement.classList.contains('popup_type_new-avatar')
    ) {
        clearForm(domElement);
    }
}

const closeModalPopup = (domElement) => {
    domElement.classList.toggle("popup_is-opened");
    document.removeEventListener('keydown', closeWithEscapeButton);
}

const setupModalCloseListeners = (popupList) => {
    popupList.forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');

        closeButton.addEventListener('click', () => closeModalPopup(popup));
        popup.addEventListener('click', (element) => {
            if (element.target === popup) {
                closeModalPopup(popup);
            }
        });
    });
}


export {openModalPopup, closeModalPopup, setupModalCloseListeners};