import { UserInterface } from '../src/userInterface';
let UI = new UserInterface();
//import '@types/jest';
import userService from '../src/user/user.service';
import inventoryService from '../src/inventory/inventory.service';

/* mocks ------------------------------------------------------------------------------------ */



describe('register', () => {
    test('will return a truthy value if a unique username is passed in', async () => {
        
        userService.addUser = jest.fn().mockResolvedValue(true);
        let success = await UI.getUser.register('', '');

        expect(success).toBeTruthy;
    });

    test('will return a fasly value if a non-unique username is passed in', async () => {

        userService.addUser = jest.fn().mockResolvedValue(false);
        let success = await UI.getUser.register('', '');

        expect(success).toBeFalsy;
    });
});

describe('viewInventory', () => {
    test('will return a truthy value if I am able to get all vehicles from database', async () => {

        inventoryService.getVehicles = jest.fn().mockResolvedValue(true);
        let success = await UI.getUser.viewInventory();

        expect(success).toBeTruthy;
    });

    test('will return a falsy value if I am not able to get all vehicles from database', async () => {

        inventoryService.getVehicles = jest.fn().mockResolvedValue(false);
        let success = await UI.getUser.viewInventory();

        expect(success).toBeFalsy;
    });
});

//takes in information and an array object
//pushes the information into the array
//returns array object
describe('makeOffer', () => {
    
});

