import { getUsers } from './storage.js';
export function authenticateUser(email, password) {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password);
}

export function isLoggedIn() {
    return sessionStorage.getItem('currentUser') !== null;
}

export function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

export function logout() {
    sessionStorage.removeItem('currentUser');
}