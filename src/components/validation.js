// Функция для валидации имени
function validateName(name) {
    // Проверка на длину имени
    if (name.length < 2 || name.length > 40) {
        return "Имя должно содержать от 2 до 40 символов";
    }

    // Проверка на допустимые символы
    const regex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!name.match(regex)) {
        return "Имя может содержать только латинские и кириллические буквы, знаки дефиса и пробелы";
    }

    return "";
}

// Функция для валидации описания
function validateDescription(description) {
    // Проверка на длину описания
    if (description.length < 2 || description.length > 200) {
        return "Описание должно содержать от 2 до 200 символов";
    }

    // Проверка на допустимые символы
    const regex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!description.match(regex)) {
        return "Описание может содержать только латинские и кириллические буквы, знаки дефиса и пробелы";
    }

    return "";
}

// Функция для очистки ошибок валидации
function clearValidationErrors() {
    const nameInput = document.forms["edit-profile"]["name"];
    const descriptionInput = document.forms["edit-profile"]["description"];
    nameInput.setCustomValidity("");
    descriptionInput.setCustomValidity("");
}

// Функция для обработки события отправки формы
function handleFormSubmit(event) {
    event.preventDefault();

    // Очистка ошибок валидации
    clearValidationErrors();

    // Получение значений полей формы
    const nameInput = document.forms["edit-profile"]["name"];
    const descriptionInput = document.forms["edit-profile"]["description"];
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

    // Валидация имени
    const nameError = validateName(name);
    if (nameError !== "") {
        nameInput.setCustomValidity(nameError);
    }

    // Валидация описания
    const descriptionError = validateDescription(description);
    if (descriptionError !== "") {
        descriptionInput.setCustomValidity(descriptionError);
    }

    // Проверка валидности формы
    if (document.forms["edit-profile"].checkValidity()) {
        // Форма валидна - можно выполнить действия по сохранению профиля
        // ...
    } else {
        // Форма не валидна - отображение ошибок
        document.forms["edit-profile"].reportValidity();
    }
}

// Получение ссылки на форму
const editProfileForm = document.forms["edit-profile"];

// Обработка события отправки формы
editProfileForm.addEventListener("submit", handleFormSubmit);

export {clearValidationErrors, validateName, handleFormSubmit, validateDescription}