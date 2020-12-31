import carService from '../src/car/car.service';
import * as main from '../src/main';
import * as offer from '../src/offer/offer';
import { Car } from '../src/car/car';
import offerService from '../src/offer/offer.service';

let off: offer.Offer;

beforeAll( () => {
    main.start = jest.fn().mockImplementation(()=>{console.log('start is called');});
});

describe('test of check offer', () => {
    
    beforeEach(() => {
        off = new offer.Offer('H01', 5000, 5, 'smccall');
    })

    test('test that check offer works with an existing offerID', async () => {
        let nonexistant = jest.fn();
        let existant = jest.fn();

        offerService.getOfferByID = jest.fn().mockResolvedValue(off);
        await offer.checkOffer('', 0, 0, '',existant, nonexistant);
        expect(existant.mock.calls.length).toBe(1);
        
    })

    test('test that check offer works with a new offerID', async () => {
        let nonexistant = jest.fn();
        let existant = jest.fn();

        offerService.getOfferByID = jest.fn().mockResolvedValue(undefined);
        await offer.checkOffer('', 0, 0, '', existant, nonexistant);
        expect(nonexistant.mock.calls.length).toBe(1);
    })

});
