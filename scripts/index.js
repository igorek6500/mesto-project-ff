function createCard(data, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.card');
        deleteCallback(listItem);
    });

    return cardElement;
}

function handleCardDelete(listItem) {
    listItem.remove();
}

function renderCards(cards) {
    const placesList = document.querySelector('.places__list');
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, handleCardDelete);
        placesList.appendChild(cardElement);
    });
}

renderCards(initialCards);