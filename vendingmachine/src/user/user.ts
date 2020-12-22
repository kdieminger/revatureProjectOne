/*Group 2: Introduce the ability to register a user.
As a user, I can register as a customer with a starting amount of money.
*/

import fs from 'fs';
import logger from '../log';

export class User {
    public role: string = 'Customer';
    constructor(public name: string, public password: string, public money: number, role: string) {
        if(role) {
            this.role = role;
        }
    };
}

export let users: User[];

export function loadUsers() {
    fs.readFile('users.json', (err, data: Buffer) => {
        if (err) {
            console.log(err);
        } else {
            users = JSON.parse(data.toString());
            logger.debug(users);
        }
    });
}

export function getUser(username: string) {
    return users.find((person: User) => person.name === username);
}
export function login(user: string, password: string) {
    logger.debug(`${user +' '+ password}`);
    logger.debug(users);
    return users.find((person: User) => person.name === user && person.password === password);
}

export function register(username: string, password: string, money: number) {
    users.push(new User(username, password, money, "Customer"));
    //TO-DO: registration for employee
}

export function saveUsers() {
    let u = JSON.stringify(users);
    fs.writeFileSync('users.json', u);
}