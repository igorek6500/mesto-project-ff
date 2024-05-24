function isInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, disabledClass) {
    if (isInvalidInput(inputList)) {
        buttonElement.classList.add(disabledClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(disabledClass);
        buttonElement.disabled = false;
    }
}

function showInputErrorMessage(formElement, inputElement, config, errorMessage) {
    const errorElement = formElement.parentNode.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputErrorMessage(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

function isValid(formElement, inputElement, config) {
    const errorMessage = inputElement.dataset.errorMessage;
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputErrorMessage(formElement, inputElement, config, inputElement.validationMessage);
    } else {
        hideInputErrorMessage(formElement, inputElement, config);
    }
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        const buttonElement = form.querySelector(config.submitButtonSelector);

        toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                isValid(form, input, config);
                toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
            });
        });
    });
}

function clearValidation(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    inputList.forEach((input) => {
        hideInputErrorMessage(form, input, config);
    });
    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
}

export {enableValidation, clearValidation}