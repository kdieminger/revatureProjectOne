import { calcMonthPay } from './user.js';

export class Car {
    constructor(public brand: string, public color: string, public price: number, public owner: string){
    };
}

export class Offer {
    public offerID = '';
    constructor(public carID: string, public downPay: number, public months: number, public user: string, public offerID: string){
        offerID = carID + user;
        //the next line breaks when called with pendingOffer function
        //this.mPay = calcMonthPay(carID, downPay, months);
    };
}
