import logger from '../log.js';
import offerService from './offer.service.js';
import carService from '../car/car.service.js';
import { Car, Payment, removeCar } from '../car/car.js';
import userService from '../user/user.service.js';

export class Offer {
    constructor(public carID: string, public downPay: number, public months: number, public username: string, public offerID: string = carID + username){
    };
}

export function makeOffer(carID: string, downPay: string, months: string, user: string, callback: Function) {
    carService.getCarByID(carID).then((car) => {
        if (car) {
            let dPay: number = parseInt(downPay);
            let mnths: number = parseInt(months);
            if (isNaN(dPay) || isNaN(mnths)) {
                logger.error('invalid input, NaN');
                console.log('Invalid input.');
            }
            else {
                let offer = new Offer(carID, dPay, mnths, user);
                offerService.addOffer(offer);
                userService.getUser(user).then((person) => {
                    if (person) {
                        person.pendingOffers.push(offer);
                        userService.updateUser(person);
                    }
                })
                calcMonthPay(carID, dPay, mnths).then((pay) => {
                    if (pay) {
                        console.log(`Thank you for your offer. You have put a downpayment of $${downPay} on ${carID}. Your monthly payment will be $${pay} over ${months}.`);
                    }
                    else {
                        logger.debug('error');
                    }
                });
            }
        }
        else {
            logger.error('Car doesnt exist');
            console.log('invalid carID');
        }
    });
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

export async function checkOffer(offerID: string): Promise<Offer|null>{
    logger.info('checkOffer called');
    return await offerService.getOfferByID(offerID).then((offer) => {
        if( offer && offer.offerID){
            return offer;
        }
        else{
            return null;
        }
    })
}

export function replaceOffer(carID: string, downPay: number, months: number, user: string){
    offerService.removeOffer(carID+user);
    logger.debug('Offers after removal: ', viewOffers);
    offerService.addOffer(new Offer(carID, downPay, months, user));
    logger.debug('Offers after addition: ', viewOffers);
}

export function acceptOffer(offerID: string, callback: Function) {
    logger.info('acceptOffer called');
    offerService.getOfferByID(offerID).then((off) => {
        logger.debug(off);
        if (off?.carID) {
            carService.getCarByID(off.carID).then((rac) => {
                if (rac && off.username) {
                    logger.debug(rac);
                    rac.owner = off.username;
                    removeCar(rac.carID);
                    carService.updateCarOwner(rac);
                    userService.getUser(off.username).then((user) => {
                        if(user){
                            user.ownedCars.push(rac);
                            user.ongoingPay.push(new Payment(offerID, rac, off.username, off.downPay, off.months));
                            let remove = user.pendingOffers.indexOf(off);
                            user.pendingOffers.splice(remove,1);
                            userService.updateUser(user);
                        }
                        else{
                            logger.error('user is undefined');
                        }
                    })
                    rejectPending(rac.carID);
                }
                else {
                    logger.error('car or user are undefined')
                }
            })
        }
        else {
            logger.error('ID is undefined - offer does not exist');
        }
        callback();
    })
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

export async function calcMonthPay(carID: string, downPay: number, months: number){
    logger.info('clacMonthPay called');
    return await carService.getCarByID(carID).then((car) => {
        if(car?.price){
            let remaining: number = car?.price - downPay;
            let monthly: number = remaining/months;
            return monthly;
        }
        else{
            logger.error('Invalid input');
            return null;
        }
    })
}
