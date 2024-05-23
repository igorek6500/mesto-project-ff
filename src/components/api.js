import {
    API_CARDS_ENDPOINT,
    API_CARDS_LIKES_ENDPOINT,
    API_GET_HEADERS,
    API_POST_HEADERS,
    API_USER_AVATAR_ENDPOINT,
    API_USER_ENDPOINT
} from "./constants";

async function getUserData() {
    try {
        const response = await fetch(API_USER_ENDPOINT, {
            headers: API_GET_HEADERS
        });

        if (response.ok) {
            return await response.json();
        } else {
            await Promise.reject(`HTTP error ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function updateUserData(name, about) {
    try {
        const response = await fetch(API_USER_ENDPOINT, {
            headers: API_POST_HEADERS,
            method: 'PATCH',
            body: JSON.stringify({name, about})
        });

        if (response.ok) {
            const updatedUser = await response.json();
            console.log('User profile updated:', updatedUser);
            return updatedUser;
        } else {
            await Promise.reject(`Error updating profile: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

async function getCardsData() {
    try {
        const response = await fetch(API_CARDS_ENDPOINT, {
            headers: API_GET_HEADERS
        });

        if (response.ok) {
            return await response.json();
        } else {
            await Promise.reject(`HTTP error ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching cards data:', error);
        return null;
    }
}

async function createCardData(name, link) {
    try {
        const response = await fetch(API_CARDS_ENDPOINT, {
            method: 'POST',
            headers: API_POST_HEADERS,
            body: JSON.stringify({name, link})
        });

        if (response.ok) {
            return await response.json();
        } else {
            await Promise.reject(`Ошибка: ${response.status}`);
        }
    } catch (error) {
        console.error('Error creating new card:', error);
        throw error;
    }
}

async function unlikeCard(card, cardLikeButton, cardLikes) {
    try {
        const response = await fetch(`${API_CARDS_LIKES_ENDPOINT}${card._id}`, {
            method: 'DELETE',
            headers: API_POST_HEADERS
        });

        if (response.ok) {
            const updatedCard = await response.json();
            cardLikeButton.classList.remove('card__like-button_is-active');
            cardLikes.textContent = updatedCard.likes.length;
            return updatedCard;
        } else {
            await Promise.reject(`Ошибка: ${response.status}`);
        }
    } catch (error) {
        console.error('Error unliking card:', error);
        throw error;
    }
}

async function likeCard(card, cardLikeButton, cardLikes) {
    try {
        const response = await fetch(`${API_CARDS_LIKES_ENDPOINT}${card._id}`, {
            method: 'PUT',
            headers: API_POST_HEADERS
        });

        if (response.ok) {
            const updatedCard = await response.json();
            cardLikeButton.classList.add('card__like-button_is-active');
            cardLikes.textContent = updatedCard.likes.length;
            return updatedCard;
        } else {
            await Promise.reject(`Ошибка: ${response.status}`);
        }
    } catch (error) {
        console.error('Error liking card:', error);
        throw error;
    }
}

async function deleteCard(card) {
    try {
        const response = await fetch(`${API_CARDS_ENDPOINT}/${card._id}`, {
            method: 'DELETE',
            headers: API_POST_HEADERS
        });

        if (response.ok) {
            console.log('Карточка успешно удалена');
        } else {
            await Promise.reject(`Ошибка: ${response.status}`);
        }
    } catch (error) {
        console.error('Ошибка при удалении карточки:', error);
        throw error;
    }
}

async function updateAvatar(link) {
    try {
        const response = await fetch(API_USER_AVATAR_ENDPOINT, {
            method: 'PATCH',
            headers: API_POST_HEADERS,
            body: JSON.stringify({avatar: link})
        });

        if (response.ok) {
            console.log('Avatar updated successfully');
            return response;
        } else {
            await Promise.reject(`Ошибка обновления профиля: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Ошибка обновления профиля:', error);
        throw error;
    }
}

async function updateData() {
    try {
        const [userData, cardsData] = await Promise.all([
            getUserData(),
            getCardsData()
        ]);

        return {
            user: userData,
            cards: cardsData
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return {
            user: null,
            cards: null
        };
    }
}

export {
    getUserData,
    updateUserData,
    getCardsData,
    createCardData,
    deleteCard,
    likeCard,
    unlikeCard,
    updateData,
    updateAvatar
}