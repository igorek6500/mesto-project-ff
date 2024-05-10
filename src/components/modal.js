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