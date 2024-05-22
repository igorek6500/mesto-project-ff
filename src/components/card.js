import {closeModalPopup, openModalPopup} from "./modal";
import {addNewCard, deleteCard, getCards, setLike, unsetLike} from "./requests";


const cardTemplate = document
    .querySelector('#card-template')
    .content
    .querySelector('.places__item');

const onDeleteCard = (cardElement, card) => {
    deleteCard(card);
    cardElement.remove();
}


const onLike = (cardElement, card, user) => {
    console.log(card)
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikes = cardElement.querySelector('.card__likes');

    let isLiked = card.likes.some(like => like._id === user._id);

    if (isLiked) {
        // Убрать лайк
        unsetLike(card, cardLikeButton, cardLikes)
            .then(updatedCard => {
                card.likes = updatedCard.likes;
                cardLikes.textContent = updatedCard.likes.length === 0 ? '' : updatedCard.likes.length;
            });
    } else {
        // Поставить лайк
        setLike(card, cardLikeButton, cardLikes)
            .then(updatedCard => {
                card.likes = updatedCard.likes;
                cardLikes.textContent = updatedCard.likes.length === 0 ? '' : updatedCard.likes.length;
            });
    }
};
const createCard = (card, user, onDeleteCard, onLike, onImageClick) => {
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

const submitNewCardForm = (e, imageModal, user, container, newCardModal, newPlaceForm) => {
    e.preventDefault();

    addNewCard(newPlaceForm.elements['place-name'].value, newPlaceForm.elements['link'].value).then(() => {
        // Получить обновленный список карточек
        return getCards();
    })
        .then(() => {
            // Очистить контейнер карточек
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            // Отрендерить обновленный список карточек
            renderCards(container, user, (e) => {
                openPopupWithImage(e, imageModal)
            })
            closeModalPopup(newCardModal);
            newPlaceForm.reset();
        })
}

const openPopupWithImage = (evt, imageModal) => {
    console.log(imageModal)
    const {alt, src} = evt.target;
    setPopupCaption(alt, imageModal.querySelector('.popup__caption'));
    setPopupImage(src, alt, imageModal.querySelector('.popup__image'));
    openModalPopup(imageModal);
}

const setPopupCaption = (caption, imageCaption) => {
    imageCaption.textContent = caption;
}
const setPopupImage = (src, alt, imageElement) => {
    imageElement.src = src;
    imageElement.alt = alt;
}

function renderCards(cardsContainer, user, openPopupWithImage) {
    getCards().then(data => {
        data.forEach(x => {
            cardsContainer.appendChild(createCard(x, user, onDeleteCard, onLike, openPopupWithImage));
        });
    })
}

export {openPopupWithImage, submitNewCardForm, renderCards};



