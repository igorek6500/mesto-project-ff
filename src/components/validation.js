const regExp = /^[-a-zA-Zа-яА-ЯёЁ\s]+$/;
const showInputError = (element, errorMessage) => {
    element.classList.add('popup__input-error');
    let formError = element.parentNode.querySelector(`.${element.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add('error_active');
}

const hideInputError = (element) => {
    element.classList.remove('popup__input-error');
    let formError = element.parentNode.querySelector(`.${element.id}-error`);
    formError.classList.remove('error_active');
}

function toggleButtonState(targetInput) {
    const form = targetInput.form;
    const button = form.querySelector('.button');
    const inputs = Array.from(form.querySelectorAll('.popup__input'));
    const allInputsValid = isValidInputs(inputs);
    button.disabled = !allInputsValid;
    if (button.disabled) {
        button.classList.add('popup__button_disabled');
    } else {
        button.classList.remove('popup__button_disabled')
    }
}

function isValidInputs(inputs) {
    return inputs.every(input => {
        if (input.type === 'url') return input.validity.valid
        return input.validity.valid && regExp.test(input.value);
    });
}

const isValid = (input) => {
    const value = input.value.trim();
    if (value === '') {
        showInputError(input, input.validationMessage);
    } else if (!regExp.test(value) && input.type !== "url") {
        showInputError(input, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
    } else if (input.type === "url" && !input.validity.valid) {
        showInputError(input, input.validationMessage);
    } else {
        hideInputError(input);
    }
    toggleButtonState(input);
}

function clearForm(domElement) {
    const form = domElement.querySelector('.popup__form');
    form.reset();
    form.querySelector('.button').disabled = true;
}

export {isValid, clearForm}