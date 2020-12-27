import logger from '../log.js';
import offerService from './offer.service.js';
import carService from '../car/car.service.js';
import { Car } from '../car/car.js';

export class Offer {
    constructor(public carID: string, public downPay: number, public months: number, public username: string, public offerID: string = carID + username){
    };
}

export function makeOffer(carID: string, downPay: string, months: string, user: string, callback: Function) {
    let check = carService.getCarByID(carID);
    let dPay: number = parseInt(downPay);
    let mnths: number = parseInt(months);
    if (isNaN(dPay) || isNaN(mnths)) {
        logger.error('invalid input, NaN');
        console.log('Invalid input.');
    }
    if(!check){
        logger.error('Car doesnt exist');
        console.log('invalid carID');
    }
    else {
        offerService.addOffer(new Offer(carID, dPay, mnths, user));
        // let monthly = calcMonthPay(carID, dPay, mnths);
        //TO DO: Add Pending to User
        console.log(`Thank you for your offer. You have put a downpayment of ${downPay} on ${carID}.`);
    }
    callback();
}

export function offerDisplay(offer: Offer){
    return offer.offerID + ': Downpayment: ' + offer.downPay + ' Months: ' + offer.months + ' on ' + offer.carID + '.';
}

export function viewOffers(callback: Function){
    logger.trace('viewOffers called');
    offerService.getOffers().then((offers) => {
        offers.forEach((offer) => {console.log(offerDisplay(offer));});
        callback();
    })
}

export function checkOffer(offerID: string): boolean{
    let check: any = offerService.getOfferByID(offerID);
    let exists: boolean = false;
    check.then((offer: any) =>{
        if(offer){
            logger.debug(offer);
             exists = true;
        }
        else{
            logger.debug(offer);
            exists = false;
        }
    })
    return exists;
}

export function replaceOffer(carID: string, downPay: number, months: number, user: string){
    offerService.removeOffer(carID+user);
    logger.debug('Offers after removal: ', viewOffers);
    offerService.addOffer(new Offer(carID, downPay, months, user));
    logger.debug('Offers after addition: ', viewOffers);
}

export function acceptOffer(offerID: string, callback: Function){
    logger.info('acceptOffer called');
    let check = offerService.getOfferByID(offerID);
    if(!check){
        logger.error('offer does not exist');
    }
    else{
        check.then((off) => {
            let ID = off?.carID;
            let user = off?.username;
            if(ID){
                let car = carService.getCarByID(ID);
                car.then((rac) => {
                    if(rac && user){
                        logger.debug(rac.owner);
                        console.log('just testing!');
                        rejectPending(rac.carID);
                    }
                    else{
                        logger.error('car or user are undefined')
                    }
                })
            }
            else{
                logger.error('ID is undefined');
            }
        })
    }
    callback();
}

export function rejectPending(carID: string){
    logger.info('rejectPending called');
    offerService.getOffers().then((offers) => {
        offers.forEach((offer) => {
            if(offer.carID == carID){
                logger.debug(offer, ' removed');
                offerService.removeOffer(offer.offerID);
            }
        });
    });
}

// export function calcMonthPay(carID: string, downPay: number, months: number){
//     let remain: number = 
// }