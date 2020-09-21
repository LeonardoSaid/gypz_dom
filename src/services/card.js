import request from '../utils/request';
import { baseURL } from '../helpers/servicesURL';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export async function getAllUserCards(token) {
    return request(baseURL + '/cards/find/user/', {
        method: 'GET',
        headers: { ...headers, 'Authorization': 'JWT '+token }
    });
}

export async function getCardById(token, id) {
    return request(baseURL + '/cards/find/'+id, {
        method: 'GET',
        headers: { ...headers, 'Authorization': 'JWT '+token }
    });
}

export async function createCard(token) {
    return request(baseURL + '/cards/create/', {
        method: 'POST',
        headers: { ...headers, 'Authorization': 'JWT '+token }
    });
}

export async function deleteCard(token, id) {
    return request(baseURL + '/cards/delete/'+id, {
        method: 'DELETE',
        headers: { ...headers, 'Authorization': 'JWT '+token }
    });
}