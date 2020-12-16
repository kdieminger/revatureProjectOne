/*Group 2: Introduce the ability to register a user.
As a user, I can register as a customer with a starting amount of money.
*/

import fs from 'fs';
import logger from './log.js';

export let users;

export function loadUsers() {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            users = JSON.parse(data);
            logger.debug(users);
        }
    });
}

export function getUser(username) {
    return users.find(person => person.name === username);
}
export function login(user, password) {
    logger.debug(`${user +' '+ password}`)
    logger.debug(users);
    return users.find(person => person.name === user && person.password === password)
}

export function register(username, password, money) {
    users.push({ name: username, password: password, money: money, role: 'Customer' });
    //TO-DO: registration for employee
}

export function saveUsers() {
    let u = JSON.stringify(users);
    fs.writeFileSync('users.json', u);
}