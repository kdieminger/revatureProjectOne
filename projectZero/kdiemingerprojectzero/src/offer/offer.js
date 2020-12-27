"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcMonthPay = exports.rejectPending = exports.acceptOffer = exports.replaceOffer = exports.checkOffer = exports.viewOffers = exports.offerDisplay = exports.makeOffer = exports.Offer = void 0;
var log_js_1 = __importDefault(require("../log.js"));
var offer_service_js_1 = __importDefault(require("./offer.service.js"));
var car_service_js_1 = __importDefault(require("../car/car.service.js"));
var car_js_1 = require("../car/car.js");
var user_service_js_1 = __importDefault(require("../user/user.service.js"));
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
    car_service_js_1.default.getCarByID(carID).then(function (car) {
        if (car) {
            var dPay = parseInt(downPay);
            var mnths = parseInt(months);
            if (isNaN(dPay) || isNaN(mnths)) {
                log_js_1.default.error('invalid input, NaN');
                console.log('Invalid input.');
            }
            else {
                var offer_1 = new Offer(carID, dPay, mnths, user);
                offer_service_js_1.default.addOffer(offer_1);
                user_service_js_1.default.getUser(user).then(function (person) {
                    if (person) {
                        person.pendingOffers.push(offer_1);
                        user_service_js_1.default.updateUser(person);
                    }
                });
                calcMonthPay(carID, dPay, mnths).then(function (pay) {
                    if (pay) {
                        console.log("Thank you for your offer. You have put a downpayment of $" + downPay + " on " + carID + ". Your monthly payment will be $" + pay + " over " + months + ".");
                    }
                    else {
                        log_js_1.default.debug('error');
                    }
                });
            }
        }
        else {
            log_js_1.default.error('Car doesnt exist');
            console.log('invalid carID');
        }
    });
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
function checkOffer(offerID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_js_1.default.info('checkOffer called');
                    return [4 /*yield*/, offer_service_js_1.default.getOfferByID(offerID).then(function (offer) {
                            if (offer && offer.offerID) {
                                return offer;
                            }
                            else {
                                return null;
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.checkOffer = checkOffer;
function replaceOffer(carID, downPay, months, user) {
    offer_service_js_1.default.removeOffer(carID + user);
    log_js_1.default.debug('Offers after removal: ', viewOffers);
    offer_service_js_1.default.addOffer(new Offer(carID, downPay, months, user));
    log_js_1.default.debug('Offers after addition: ', viewOffers);
}
exports.replaceOffer = replaceOffer;
function acceptOffer(offerID, callback) {
    log_js_1.default.info('acceptOffer called');
    offer_service_js_1.default.getOfferByID(offerID).then(function (off) {
        log_js_1.default.debug(off);
        if (off === null || off === void 0 ? void 0 : off.carID) {
            car_service_js_1.default.getCarByID(off.carID).then(function (rac) {
                if (rac && off.username) {
                    log_js_1.default.debug(rac);
                    rac.owner = off.username;
                    car_js_1.removeCar(rac.carID);
                    car_service_js_1.default.updateCarOwner(rac);
                    user_service_js_1.default.getUser(off.username).then(function (user) {
                        if (user) {
                            user.ownedCars.push(rac);
                            user.ongoingPay.push(new car_js_1.Payment(offerID, rac, off.username, off.downPay, off.months));
                            var remove = user.pendingOffers.indexOf(off);
                            user.pendingOffers.splice(remove, 1);
                            user_service_js_1.default.updateUser(user);
                        }
                        else {
                            log_js_1.default.error('user is undefined');
                        }
                    });
                    rejectPending(rac.carID);
                }
                else {
                    log_js_1.default.error('car or user are undefined');
                }
            });
        }
        else {
            log_js_1.default.error('ID is undefined - offer does not exist');
        }
        callback();
    });
}
exports.acceptOffer = acceptOffer;
function rejectPending(carID) {
    log_js_1.default.info('rejectPending called');
    offer_service_js_1.default.getOffers().then(function (offers) {
        offers.forEach(function (offer) {
            if (offer.carID == carID) {
                log_js_1.default.debug(offer, ' removed');
                offer_service_js_1.default.removeOffer(offer.offerID);
            }
        });
    });
}
exports.rejectPending = rejectPending;
function calcMonthPay(carID, downPay, months) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_js_1.default.info('clacMonthPay called');
                    return [4 /*yield*/, car_service_js_1.default.getCarByID(carID).then(function (car) {
                            if (car === null || car === void 0 ? void 0 : car.price) {
                                var remaining = (car === null || car === void 0 ? void 0 : car.price) - downPay;
                                var monthly = remaining / months;
                                return monthly;
                            }
                            else {
                                log_js_1.default.error('Invalid input');
                                return null;
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.calcMonthPay = calcMonthPay;
