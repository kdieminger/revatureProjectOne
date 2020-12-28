import * as user from '../src/user/user';
import * as main from '../src/main';

let testUser;

beforeAll( () => {
    main.start = jest.fn().mockImplementation(()=>{console.log('start is called');});
});

describe ('tests of user login', () => {
    beforeEach( () => {
        main.read.question(jest.fn().mockImplementationOnce((questionText, answer) => answer("smccall"))
            .mockImplementationOnce((questionText, answer) => answer("allison")));
    });
    
    test('That an incorrect password results in loggedUser remaining null', () => {
        user.userLogin = jest.fn().mockImplementationOnce((one, two) => false);
        expect(main.login).toBe(undefined);
        main.logUser();
        expect(main.login).toBe(undefined);
    });
    
    test('That an correct password results in loggedUser being set', () => {
        user.userLogin = jest.fn().mockImplementationOnce((one, two) => { return {name: one, pass: two}});
        expect(main.login).toBe(undefined);
        main.logUser();
        expect(main.login).toStrictEqual({username: 'smccall', password: 'allison'});
    });
})