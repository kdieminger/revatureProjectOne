import * as user from '../src/user/user';
import * as main from '../src/main';
import userService from '../src/user/user.service';
import { resolve } from 'path';

let testUser: user.User;

beforeAll( () => {
    main.start = jest.fn().mockImplementation(()=>{console.log('start is called');});
});

describe ('tests of user login', () => {
    beforeEach( () => {
        main.read.question = jest.fn().mockImplementationOnce((questionText, answer) => answer('smccall'))
            .mockImplementationOnce((questionText, answer) => answer('allison'));
    });
    
    test('That an incorrect password results in loggedUser remaining null', async () => {
        user.userLogin = jest.fn().mockResolvedValue(false);
        expect(main.login).toBe(undefined);
        await main.logUser();
        expect(main.login).toBe(undefined);
    });
    
    test('That an correct password results in loggedUser being set', async () => {
        user.userLogin = jest.fn().mockImplementationOnce((one, two) => { return Promise.resolve({username: one, password: two})});
        expect(main.login).toBe(undefined);
        await main.logUser();
        expect(main.login).toStrictEqual({username: 'smccall', password: 'allison'});
    });
});

describe ('tests of user register',  () => {
    
    beforeEach(() => {
        testUser = new user.User('smccall','allison','Customer', [], [], []);
        main.read.question = jest.fn().mockImplementationOnce((questionText, answer) => answer('aargent'))
        .mockImplementationOnce((questionText, answer) => answer('arrow'))
        .mockImplementationOnce((questionText, answer) => answer('0'));
    })
    
    test('that an unused username results in a user being added', () => {
        user.registerUser = jest.fn().mockImplementationOnce((one,two,three) => {
            let check = userService.addUser(new user.User(one, two, three, [], [], []));
            expect(check).toBe(true);
        });
        // = jest.fn().mockImplementationOnce((one, two, three) => { return resolve({userN: one, passW: two, role: three}});
    })
})