"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptOffer = exports.replaceOffer = exports.viewOffers = exports.offerDisplay = exports.makeOffer = exports.Offer = void 0;
var log_js_1 = __importDefault(require("../log.js"));
var offer_service_js_1 = __importDefault(require("./offer.service.js"));
var car_service_js_1 = __importDefault(require("../car/car.service.js"));
var Offer = /** @class */ (function () {
    function Offer(carID, downPay, months, username, offerID) {
        if (offerID === void 0) { offerID = carID + username; }
        this.carID = carID;
        this.downPay = downPay;
        this.months = months;
        this.username = username;
        this.offerID = offerID;
    }
    ;
    return Offer;
}());
exports.Offer = Offer;
function makeOffer(carID, downPay, months, user, callback) {
    var check = car_service_js_1.default.getCarByID(carID);
    var dPay = parseInt(downPay);
    var mnths = parseInt(months);
    if (isNaN(dPay) || isNaN(mnths)) {
        log_js_1.default.error('invalid input, NaN');
        console.log('Invalid input.');
    }
    if (!check) {
        log_js_1.default.error('Car doesnt exist');
        console.log('invalid carID');
    }
    else {
        offer_service_js_1.default.addOffer(new Offer(carID, dPay, mnths, user));
        // let monthly = calcMonthPay(carID, dPay, mnths);
        //TO DO: Add Pending to User
        console.log("Thank you for your offer. You have put a downpayment of " + downPay + " on " + carID + ".");
    }
    callback();
}
exports.makeOffer = makeOffer;
function offerDisplay(offer) {
    return offer.offerID + ': Downpayment: ' + offer.downPay + ' Months: ' + offer.months + ' on ' + offer.carID + '.';
}
exports.offerDisplay = offerDisplay;
function viewOffers(callback) {
    log_js_1.default.trace('viewOffers called');
    offer_service_js_1.default.getOffers().then(function (offers) {
        offers.forEach(function (offer) { console.log(offerDisplay(offer)); });
        callback();
    });
}
exports.viewOffers = viewOffers;
function replaceOffer(carID, downPay, months, user) {
    offer_service_js_1.default.removeOffer(carID + user);
    log_js_1.default.debug('Offers after removal: ', viewOffers);
    offer_service_js_1.default.addOffer(new Offer(carID, downPay, months, user));
    log_js_1.default.debug('Offers after addition: ', viewOffers);
}
exports.replaceOffer = replaceOffer;
function acceptOffer(offerID) {
}
exports.acceptOffer = acceptOffer;
// export function calcMonthPay(carID: string, downPay: number, months: number){
//     let remain: number = 
// }
