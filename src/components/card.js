import {deleteCard, likeCard, unlikeCard} from "./api";

const cardTemplate = document
    .querySelector('#card-template')
    .content
    .querySelector('.places__item');

function onDeleteCard(cardElement, card) {
    deleteCard(card).then(() => cardElement.remove())
        .catch((error) => console.error('Ошибка при удалении карточки:', error));
}

function onLike(cardElement, card, user) {
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikes = cardElement.querySelector('.card__likes');
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        unlikeCard(card)
            .then(updatedCard => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                cardLikes.textContent = updatedCard.likes.length;
                card.likes = updatedCard.likes;
                cardLikes.textContent = updatedCard.likes.length === 0 ? '' : updatedCard.likes.length;
            })
            .catch(error => console.error('Error unliking card:', error));
    } else {
        likeCard(card)
            .then(updatedCard => {
                cardLikeButton.classList.add('card__like-button_is-active');
                cardLikes.textContent = updatedCard.likes.length;
                card.likes = updatedCard.likes;
                cardLikes.textContent = updatedCard.likes.length === 0 ? '' : updatedCard.likes.length;
            })
            .catch(error => console.error('Error liking card:', error));
    }
}

function createCard(card, user, onDeleteCard, onLike, onImageClick) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikes = cardLikeButton.closest('.card__like-button-container').querySelector('.card__likes');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id !== user._id) {
        cardDeleteButton.classList.add('card__delete-button_hide');
    }
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    cardLikes.textContent = card.likes.length === 0 ? '' : card.likes.length;
    let isLiked = card.likes.some(like => like._id === user._id);
    if (isLiked) cardLikeButton.classList.add("card__like-button_is-active");
    else cardLikeButton.classList.remove("card__like-button_is-active");
    cardLikeButton.addEventListener('click', () => onLike(cardElement, card, user));
    cardDeleteButton.addEventListener('click', () => onDeleteCard(cardElement, card));
    cardImage.addEventListener('click', onImageClick);
    return cardElement;
}

export {createCard, onDeleteCard, onLike};