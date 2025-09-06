
export function saveUserData(userData) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.some(user => user.email === userData.email);
    if (userExists) {
        alert('User with this email already exists');
        return false;
    }
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function getUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}