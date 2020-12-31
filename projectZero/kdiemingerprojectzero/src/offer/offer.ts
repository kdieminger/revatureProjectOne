import logger from '../log.js';
import offerService from './offer.service.js';
import carService from '../car/car.service.js';
import { Car, changeOwner, Payment, removeCar } from '../car/car.js';
import userService from '../user/user.service.js';

export class Offer {
    constructor(public carID: string, public downPay: number, public months: number, public username: string, public offerID: string = carID + username){
    };
}

//TODO: modularize?
//creates a new offer
export function makeOffer(carID: string, downPay: string, months: string, user: string, callback: Function) {
    carService.getCarByID(carID).then((car) => {
        if (car) {
            let dPay: number = parseInt(downPay);
            let mnths: number = parseInt(months);
            if (isNaN(dPay) || isNaN(mnths)) {
                logger.error('invalid input, NaN');
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
                        let round: string = pay.toFixed(2);
                        console.log(`Thank you for your offer. You have put a downpayment of $${downPay} on ${carID}. If accepted, your monthly payment will be $${round} over ${months} months.`);
                    }
                    else {
                        logger.debug('error');
                    }
                });
            }
        }
        else {
            logger.error('Invalid carID - car doesnt exist');
        }
    });
    callback();
}

//formats offers for display
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

//checks if an offer exists and performs a function based on whether it exists or not
export async function checkOffer(carID: string, downPay: number, months: number, user: string, existant: Function, nonexistant: Function, callback?: Function){
    let offerID = carID + user;
    offerService.getOfferByID(offerID).then((offer) => {
        if(offer){
            existant(carID, downPay, months, user, callback);
        }
        else {
            nonexistant(carID, downPay, months, user, callback);
        }
    })
}

//replaces an existing offer
export function replaceOffer(carID: string, downPay: number, months: number, user: string, callback: Function){
    offerService.removeOffer(carID+user);
    logger.debug('Offers after removal: ', viewOffers);
    offerService.addOffer(new Offer(carID, downPay, months, user));
    // console.log(`Thank you for your offer. You have put a downpayment of $${downPay} on ${carID}. If accepted, your monthly payment will be $${pay} over ${months} months.`);
    logger.debug('Offers after addition: ', viewOffers);
    callback;
}

//accepts an offer
export function acceptOffer(offerID: string, callback: Function){
    offerService.getOfferByID(offerID).then((offer) => {
        if(offer){
            changeOwner(offer.carID, offer.username);
            setTimeout(() => {offerAccepted(offer, offer.username)}, 5000);
            rejectPending(offer.carID);
        }
        else {
            logger.error('Offer does not exist - check ID');
        }
        callback();
    })
}

//removes an offer and the corresponding car and adds payment to user
export function offerAccepted(offer: Offer, username: string) {
    userService.getUser(username).then((user) => {
        if(user){
            console.log(JSON.stringify(user));
            carService.getCarByID(offer.carID).then((car) => {
                if(car){
                    user.ongoingPay.push(new Payment(offer.offerID, offer.carID, username, offer.downPay, offer.months, car?.price-offer.downPay));
                    let remove = user.pendingOffers.indexOf(offer);
                    user.pendingOffers.splice(remove,1);
                    userService.updateUser(user);
                    offerService.removeOffer(offer.offerID);
                    removeCar(car.carID);
                }
                else{
                    logger.error('car does not exist');
                }
            })
        }
        else{
            logger.error('User does not exist');
        }

    })
}

//rejects a pending offer
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

//calculates the monthly payment of an offer
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
