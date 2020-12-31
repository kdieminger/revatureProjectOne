import * as user from '../src/user/user';
import * as main from '../src/main';
import userService from '../src/user/user.service';

let testUser: user.User;


beforeAll( () => {
    main.start = jest.fn().mockImplementation(()=>{console.log('start is called');});
});

describe ('tests of user login', () => {
    beforeEach( () => {
        main.read.question = jest.fn().mockImplementationOnce((questionText, answer) => answer('smccall'))
            .mockImplementationOnce((questionText, answer) => answer('allison'));
    });
    
    test('That an incorrect username or password results in loggedUser remaining null', async () => {
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