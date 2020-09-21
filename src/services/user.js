import request from '../utils/request';
import { baseURL } from '../helpers/servicesURL';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export async function login(payload) {
    return request(baseURL + '/login/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
}

export async function register(payload) {
    return request(baseURL + '/users/create/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
}

export async function getCurrentUser(token) {
    return request(baseURL + '/users/current/', {
        method: 'GET',
        headers: { ...headers, 'Authorization': 'JWT '+token }
    });
}

export async function updateCurrentUser(token, payload) {
    return request(baseURL + '/users/update/', {
        method: 'PUT',
        headers: { ...headers, 'Authorization': 'JWT '+token },
        body: JSON.stringify(payload)
    });
}