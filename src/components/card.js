const cardTemplate = document
    .querySelector('#card-template')
    .content
    .querySelector('.places__item');

const onDeleteCard = (cardElement) => {
    cardElement.remove();
}
const onLike = (cardElement) => {
    cardElement
        .querySelector('.card__like-button')
        .classList.toggle("card__like-button_is-active");
};
const createCard = (card, onDeleteCard, onLike, onImageClick) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    cardLikeButton.addEventListener('click', () => onLike(cardElement));
    cardDeleteButton.addEventListener('click', () => onDeleteCard(cardElement));
    cardImage.addEventListener('click', onImageClick);
    return cardElement;
}

export {createCard, onLike, onDeleteCard};



