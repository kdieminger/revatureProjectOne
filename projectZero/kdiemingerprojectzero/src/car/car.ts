import { calcMonthPay } from '../user/user.js';
import logger from '../log.js';

export class Car {
    constructor(public brand: string, public color: string, public carID: string, public price: number, public owner: string){
    };
}

export class Offer {
    constructor(public carID: string, public downPay: number, public months: number, public username: string, public offerID: string = carID + username){
    };
}

export class Payment {
    constructor(public payID: string, public vehicle: Car, public username: string, public downPay: number,public months: number, public monthlyPay: number, public remainingPay: any = (vehicle.price) - downPay){
    }
}
