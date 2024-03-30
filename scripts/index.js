function createCard(data, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    deleteButton.addEventListener('click', () => {
        deleteCallback(data);
    });

    return cardElement;
}

function handleCardDelete(cardData) {
    const indexCard = initialCards.indexOf(cardData);
    if (indexCard !== -1) {
        initialCards.splice(indexCard, 1);
        renderCards(initialCards);
    }
}

function renderCards(cards) {
    const placesList = document.querySelector('.places__list');
    placesList.innerHTML = '';
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, handleCardDelete);
        placesList.appendChild(cardElement);
    });
}

renderCards(initialCards);