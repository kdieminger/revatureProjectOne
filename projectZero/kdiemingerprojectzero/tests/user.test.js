import { isSemicolonClassElement } from 'typescript';
import { data, uN, loadUsers, getUser } from '../src/user.js'

let testUser;

beforeAll(() => {
    data.splice(0, data.length);
});

afterAll(() => {
    data.splice(0, data.length);
});

beforeEach(() => {
    testUser = {username: 'smccall', password: 'allison', role: 'Customer'};
    data.push(testUser);
})

afterEach(() => {
    testUser = null;
    data.splice(0, data.length);
});


test ('That getUser correctly identifies a match', () => {
    expect(getUser('smccall')).toBe(testUser.username);
})