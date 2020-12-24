import { calcMonthPay } from './user.js';

export class Car {
    constructor(brand, color, carID, price, owner) {
        this.brand = brand;
        this.color = color;
        this.carID = carID;
        this.price = price;
        this.owner = null;
    }
}

export class Offer {
    constructor(carID, downPay, months, user) {
        this.carID = carID;
        this.downPay = downPay;
        this.months = months;
        this.user = user;
        //the next line breaks when called with pendingOffer function
        //this.mPay = calcMonthPay(carID, downPay, months);
    }
}
