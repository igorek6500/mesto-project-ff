const API_BASE_URL = 'https://mesto.nomoreparties.co/v1/';
const API_TOKEN = 'c85a9ee5-da17-44f1-aa81-04f86597517f';
const GROUP_ID = 'wff-cohort-14/';
const API_FINAL_URL = `${API_BASE_URL}${GROUP_ID}`;
const API_USER_ENDPOINT = `${API_FINAL_URL}users/me`;
const API_CARDS_ENDPOINT = `${API_FINAL_URL}cards`;
const API_CARDS_LIKES_ENDPOINT = `${API_CARDS_ENDPOINT}/likes/`;
const API_USER_AVATAR_ENDPOINT = `${API_USER_ENDPOINT}/avatar`;
const API_POST_HEADERS = {
    authorization: API_TOKEN,
    'Content-Type': 'application/json'
};
const API_GET_HEADERS = {
    authorization: API_TOKEN
};

async function getUserData() {
    try {
        const response = await fetch(API_USER_ENDPOINT, {
            headers: API_GET_HEADERS
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null; // или значение по умолчанию
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
            throw new Error(`Error updating profile: ${response.status} - ${response.statusText}`);
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
            throw new Error(`HTTP error ${response.status}`);
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
            throw new Error(`Ошибка: ${response.status}`);
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
            throw new Error(`Ошибка: ${response.status}`);
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
            throw new Error(`Ошибка: ${response.status}`);
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
            throw new Error(`Ошибка: ${response.status}`);
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
            throw new Error(`Ошибка обновления профиля: ${response.status} - ${response.statusText}`);
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