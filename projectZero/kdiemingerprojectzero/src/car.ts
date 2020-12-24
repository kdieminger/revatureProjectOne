import { calcMonthPay } from './user.js';

export class Car {
    constructor(public brand: string, public color: string, public carID: string, public price: number, public owner: string){
    };
}

export class Offer {
    constructor(public carID: string, public downPay: number, public months: number, public username: string, public offerID: string = carID + username){
        //the next line breaks when called with pendingOffer function
        //this.mPay = calcMonthPay(carID, downPay, months);
    };
}

export class Payment {
    constructor(public payID: string, public vehicle: Car, public username: string, public downPay: number,public months: number, public monthlyPay: number, public remainingPay: any = (vehicle.price) - downPay){
    }
}
