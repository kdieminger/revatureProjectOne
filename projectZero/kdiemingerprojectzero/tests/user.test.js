import { data, uN, testUser, getUser, loadUsers, userLogin, tryAgain, registerUser } from '../src/user.js'

let person = {username: 'smccall', password: 'allison', role: 'Customer'};


test ('That getUser correctly identifies a match', () => {
    expect(getUser(person.username).toBe('smccall'));
})