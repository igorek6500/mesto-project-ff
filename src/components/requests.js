const baseUrl = 'https://mesto.nomoreparties.co/v1/';
const token = 'c85a9ee5-da17-44f1-aa81-04f86597517f';
const groupId = 'wff-cohort-14/';
const finalUrl = baseUrl + groupId;
const userEndpoint = finalUrl + 'users/me';
const cardsEndpoint = finalUrl + 'cards';
const cardsLikes = cardsEndpoint + '/likes/'
const postHeaders = {
    authorization: token,
    'Content-Type': 'application/json'
};
const getHeaders = {
    authorization: token
};

async function getUser() {
    try {
        const response = await fetch(userEndpoint, {
            headers: getHeaders
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null; // или какое-то значение по умолчанию
    }
}

async function updateUser(updatedName, updatedDescription) {
    try {
        const response = await fetch(userEndpoint, {
            headers: postHeaders,
            method: 'PATCH',
            body: JSON.stringify({
                name: updatedName,
                about: updatedDescription
            })
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

async function getCards() {
    try {
        const response = await fetch(cardsEndpoint, {
            headers: getHeaders
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null; // или какое-то значение по умолчанию
    }
}

function addNewCard(name, link) {

    return fetch(cardsEndpoint, {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
}

function unsetLike(card, cardLikeButton, cardLikes) {
    console.log(card)
    return fetch(cardsLikes + card._id, {
        method: 'DELETE',
        headers: postHeaders
    })
        .then(res => res.json())
        .then(updatedCard => {
            console.log('DELETE')
            cardLikeButton.classList.remove('card__like-button_is-active');
            cardLikes.textContent = updatedCard.likes.length;
            return updatedCard;
        })
        .catch(err => console.error(err));
}

function setLike(card, cardLikeButton, cardLikes) {
    return fetch(cardsLikes + card._id, {
        method: 'PUT',
        headers: postHeaders
    })
        .then(res => res.json())
        .then(updatedCard => {
            console.log('PUT')
            cardLikeButton.classList.add('card__like-button_is-active');
            cardLikes.textContent = updatedCard.likes.length;
            return updatedCard;
        })
        .catch(err => console.error(err));
}

function deleteCard(card) {
    try {
        fetch(cardsEndpoint + '/' + card._id, {
            method: 'DELETE',
            headers: postHeaders
        }).then(r => console.log(r));
    } catch (err) {
        console.error('Ошибка при удалении карточки:', err);
    }
}

async function updateData() {
    try {
        const [userResponse, cardsResponse] = await Promise.all([
            fetch(userEndpoint, {
                headers: {
                    authorization: token
                }
            }),
            fetch(cardsEndpoint, {
                headers: {
                    authorization: token
                }
            })
        ]);

        if (userResponse.ok && cardsResponse.ok) {
            const userData = await userResponse.json();
            const cardsData = await cardsResponse.json();

            return {
                user: userData,
                cards: cardsData
            };
        } else {
            throw new Error(`HTTP error ${userResponse.status} or ${cardsResponse.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            user: null,
            cards: null
        };
    }
}

export {getUser, updateUser, getCards, addNewCard, deleteCard, setLike, unsetLike, updateData}