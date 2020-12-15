/*Group 2: Introduce the ability to register a user.
As a user, I can register as a customer with a starting amount of money.
*/

let users = [
    {
        name: 'Richard',
        pass: 'pass',
        money: 23,
        role: 'Customer'
    },

    {
        name: 'Test',
        pass: 'testing',
        money: 23,
        role: 'Employee'
    }
];

export function getUser(username) {
    return users.find(person => person.name === username);
}
export function login(user, password) {
    return users.find(person => person.name === user && person.pass === password)
}

export function register(username, password, money) {
    users.push({name: username, pass: password, money: money, role:'Customer'});
    //TO-DO: registration for employee
}
