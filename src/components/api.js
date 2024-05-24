import {
    API_CARDS_ENDPOINT,
    API_CARDS_LIKES_ENDPOINT,
    API_GET_HEADERS,
    API_POST_HEADERS,
    API_USER_AVATAR_ENDPOINT,
    API_USER_ENDPOINT
} from "./constants";

async function getUserData() {
    const response = await fetch(API_USER_ENDPOINT, {
        headers: API_GET_HEADERS
    });
    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(new Error(`HTTP error ${response.status}`));
    }
}

async function updateUserData(name, about) {
    const response = await fetch(API_USER_ENDPOINT, {
        headers: API_POST_HEADERS,
        method: 'PATCH',
        body: JSON.stringify({name, about})
    });
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(
            new Error(
                `Error updating profile: ${response.status} - ${response.statusText}`
            )
        );
    }
}

async function updateAvatar(link) {
    const response = await fetch(API_USER_AVATAR_ENDPOINT, {
        method: 'PATCH',
        headers: API_POST_HEADERS,
        body: JSON.stringify({avatar: link})
    });
    if (response.ok) {
        console.log('Avatar updated successfully');
        return response.json();
    } else {
        return Promise.reject(
            new Error(
                `Ошибка обновления профиля: ${response.status} - ${response.statusText}`
            )
        );
    }
}

async function getCardsData() {
    const response = await fetch(API_CARDS_ENDPOINT, {
        headers: API_GET_HEADERS
    });
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(new Error(`HTTP error ${response.status}`));
    }
}

async function createCardData(name, link) {
    const response = await fetch(API_CARDS_ENDPOINT, {
        method: 'POST',
        headers: API_POST_HEADERS,
        body: JSON.stringify({name, link})
    });
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }
}

async function unlikeCard(card) {
    const response = await fetch(`${API_CARDS_LIKES_ENDPOINT}${card._id}`, {
        method: 'DELETE',
        headers: API_POST_HEADERS
    });
    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }
}

async function likeCard(card) {
    const response = await fetch(`${API_CARDS_LIKES_ENDPOINT}${card._id}`, {
        method: 'PUT',
        headers: API_POST_HEADERS
    });
    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }
}

async function deleteCard(card) {
    const response = await fetch(`${API_CARDS_ENDPOINT}/${card._id}`, {
        method: 'DELETE',
        headers: API_POST_HEADERS
    });
    if (response.ok) {
        console.log('Карточка успешно удалена');
    } else {
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }
}

async function updateData() {
    const [userData, cardsData] = await Promise.all([
        getUserData(),
        getCardsData()
    ]);
    return {
        user: userData,
        cards: cardsData
    };
}

export {
    updateUserData,
    createCardData,
    deleteCard,
    likeCard,
    unlikeCard,
    updateData,
    updateAvatar
}