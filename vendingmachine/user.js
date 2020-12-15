let users = [
    {
        name: 'Richard',
        pass: 'pass',
        money: 23,
        role: 'Customer'
    },

];


export function login(user, password) {
    return users.find(person => person.name === user && person.pass === password)
}
