"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Offer = exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(brand, color, carID, price, owner) {
        this.brand = brand;
        this.color = color;
        this.carID = carID;
        this.price = price;
        this.owner = owner;
    }
    ;
    return Car;
}());
exports.Car = Car;
var Offer = /** @class */ (function () {
    function Offer(carID, downPay, months, username, offerID) {
        if (offerID === void 0) { offerID = carID + username; }
        this.carID = carID;
        this.downPay = downPay;
        this.months = months;
        this.username = username;
        this.offerID = offerID;
        //the next line breaks when called with pendingOffer function
        //this.mPay = calcMonthPay(carID, downPay, months);
    }
    ;
    return Offer;
}());
exports.Offer = Offer;
var Payment = /** @class */ (function () {
    function Payment(payID, vehicle, username, downPay, months, monthlyPay, remainingPay) {
        if (remainingPay === void 0) { remainingPay = (vehicle.price) - downPay; }
        this.payID = payID;
        this.vehicle = vehicle;
        this.username = username;
        this.downPay = downPay;
        this.months = months;
        this.monthlyPay = monthlyPay;
        this.remainingPay = remainingPay;
    }
    return Payment;
}());
exports.Payment = Payment;
