"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectPending = exports.addPending = exports.updateCarOwner = exports.pendingOffer = exports.removeOffer = exports.removeCar = exports.viewOffers = exports.addCar = exports.viewOwnPayments = exports.viewUserOffers = exports.viewOwnedCars = exports.makeOffer = exports.calcMonthPay = exports.viewCars = exports.userLogin = exports.registerUser = exports.getUser = exports.loadOffers = exports.loadCarLot = exports.loadUsers = exports.offers = exports.lot = exports.data = exports.User = void 0;
var fs_1 = __importDefault(require("fs"));
var log_js_1 = __importDefault(require("./log.js"));
var car_js_1 = require("./car.js");
//Class declaration
var User = /** @class */ (function () {
    function User(username, password, role, ownedCars, pendingOffers, ongoingPay) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.ownedCars = ownedCars;
        this.pendingOffers = pendingOffers;
        this.ongoingPay = ongoingPay;
    }
    ;
    return User;
}());
exports.User = User;
//loads users from usersdata.json
function loadUsers() {
    try {
        exports.data = JSON.parse((fs_1.default.readFileSync('./usersdata.json')).toString());
    }
    catch (err) {
        log_js_1.default.error(err);
    }
}
exports.loadUsers = loadUsers;
;
//loads cars from carLot.json
function loadCarLot() {
    try {
        exports.lot = JSON.parse((fs_1.default.readFileSync('./carLot.json')).toString());
    }
    catch (err) {
        log_js_1.default.error(err);
    }
}
exports.loadCarLot = loadCarLot;
;
//loads offers from offers.json
function loadOffers() {
    try {
        exports.offers = JSON.parse((fs_1.default.readFileSync('./offers.json')).toString());
    }
    catch (err) {
        log_js_1.default.error(err);
    }
}
exports.loadOffers = loadOffers;
//ROLE NEUTRAL FUNCTIONS
//checks for matching username
function getUser(userN) {
    log_js_1.default.trace("get user called with parameter " + userN);
    return exports.data.find(function (person) { return person.username === userN; });
}
exports.getUser = getUser;
//registers a user
function registerUser(userN, passW, role) {
    log_js_1.default.trace('Attempt to register user');
    exports.data.push(new User(userN, passW, role, [], [], []));
}
exports.registerUser = registerUser;
//logs user in
function userLogin(name, pass) {
    log_js_1.default.trace("user login called with parameters " + name + " and " + pass);
    return exports.data.find(function (person) { return person.username === name && person.password === pass; });
}
exports.userLogin = userLogin;
;
//view cars on the lot
function viewCars() {
    console.log(exports.lot);
}
exports.viewCars = viewCars;
//calculate monthly payment
function calcMonthPay(carID, downpay, months) {
    log_js_1.default.trace("calculate monthly payment called with parameters " + carID + ", " + downpay + ", " + months + ".");
    var vehicle = exports.lot.find(function (car) { return car.carID === carID; });
    var z = vehicle.price;
    var remain = z - downpay;
    var monthly = remain / months;
    monthly = monthly.toFixed(2);
    return monthly;
}
exports.calcMonthPay = calcMonthPay;
//CUSTOMER FUNCTIONS
//makes an offer on a car
function makeOffer(carID, downPay, months, user) {
    log_js_1.default.trace("create a new offer using parameters " + carID + ", " + downPay + ", " + months + ", and " + user);
    var check = exports.lot.find(function (car) { return car.carID == carID; });
    var dPay = parseInt(downPay);
    var mnths = parseInt(months);
    if (isNaN(dPay) || isNaN(mnths)) {
        log_js_1.default.error('invalid input, NaN');
        console.log('Invalid input.');
    }
    else {
        if (!check) {
            log_js_1.default.error('Car doesnt exist');
            console.log('invalid carID');
        }
        else {
            exports.offers.push(new car_js_1.Offer(carID, dPay, mnths, user));
            var x = Number(downPay);
            var y = Number(months);
            var monthly = calcMonthPay(carID, x, y);
            addPending(carID, user);
            console.log("Thank you for your offer. You have put a downpayment of " + downPay + " on " + carID + " and your monthly payment will be " + monthly + " over " + months + " months.");
        }
    }
}
exports.makeOffer = makeOffer;
//lets the user view their cars
function viewOwnedCars(username) {
    log_js_1.default.info("view cars owned by " + username + ".");
    var user;
    user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.ownedCars);
}
exports.viewOwnedCars = viewOwnedCars;
function viewUserOffers(username) {
    log_js_1.default.info("view offers made by " + username);
    var user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.pendingOffers);
}
exports.viewUserOffers = viewUserOffers;
//allows user to view their ongoing payments
function viewOwnPayments(username) {
    log_js_1.default.info("view outstanding payments for " + username);
    var user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.ongoingPay);
}
exports.viewOwnPayments = viewOwnPayments;
//EMPLOYEE FUNCTIONS
//adds car to carLot
function addCar(brand, color, carID, price) {
    log_js_1.default.trace("adds a car to the lot with parameters " + brand + ", " + color + ", " + price + ", " + price);
    var newCar = new car_js_1.Car(brand, color, carID, price, 'dealer');
    var check = exports.lot.find(function (car) { return car.carID === carID; });
    if (check) {
        log_js_1.default.warn('carID already exists');
        console.log('CarID already exists. No car added.');
    }
    else if (!check) {
        exports.lot.push(newCar);
    }
}
exports.addCar = addCar;
//view pending offers
function viewOffers() {
    console.log(exports.offers);
}
exports.viewOffers = viewOffers;
//remove car from carLot
function removeCar(carID) {
    var index;
    var remove;
    remove = exports.lot.find(function (car) { return car.carID === carID; });
    if (!remove) {
        log_js_1.default.error('car does not exist');
        console.log('invalid carID');
    }
    else {
        index = exports.lot.indexOf(remove);
        exports.lot.splice(index, 1);
    }
}
exports.removeCar = removeCar;
function removeOffer(offerID) {
    var remove = exports.offers.find(function (off) { return off.offerID === offerID; });
    var index = exports.offers.indexOf(remove);
    exports.offers.splice(index, 1);
}
exports.removeOffer = removeOffer;
//accepts or rejects a pending offer
function pendingOffer(offerID, action) {
    var offer = exports.offers.find(function (off) { return off.offerID === offerID; });
    if (!offer) {
        log_js_1.default.error('offer does not exist');
        console.log('Invalid offerID');
    }
    else {
        var car_1 = offer.carID;
        var userN_1 = offer.username;
        if (action == 0) {
            updateCarOwner(car_1, userN_1);
            var user = exports.data.find(function (person) { return person.username === userN_1; });
            var newCar = exports.lot.find(function (vehicle) { return vehicle.carID === car_1; });
            var newOngoing = user.ongoingPay;
            newOngoing.push(new car_js_1.Payment(offerID, newCar, userN_1, offer.downPay, offer.months, calcMonthPay(car_1, offer.downPay, offer.months)));
            removeCar(car_1);
            removeOffer(offerID);
            rejectPending(car_1);
        }
        else if (action == 1) {
            var remove = exports.offers.find(function (offer) { return offer.offerID === offerID; });
            var index = exports.offers.indexOf(remove);
            exports.offers.splice(index, 1);
        }
    }
}
exports.pendingOffer = pendingOffer;
//SYSTEM FUNCTIONS
//updates a car's owner - to be called when an offer is accepted
function updateCarOwner(carID, username) {
    var userCar = exports.lot.find(function (car) { return car.carID === carID; });
    userCar.owner = username;
    var fUser = exports.data.find(function (person) { return person.username === username; });
    var newUserCar = fUser.ownedCars;
    newUserCar.push(userCar);
}
exports.updateCarOwner = updateCarOwner;
//add pending offer to user
function addPending(carID, username) {
    var pendOfferID = carID + username;
    var userOffer = exports.offers.find(function (off) { return off.offerID === pendOfferID; });
    var fUser = exports.data.find(function (person) { return person.username === username; });
    var newUserOffer = fUser.pendingOffers;
    newUserOffer.push(userOffer);
}
exports.addPending = addPending;
function rejectPending(carID) {
    for (var i = 0; i < exports.offers.length; i++) {
        if (exports.offers[i].carID === carID) {
            console.log(exports.offers[i]);
            exports.offers.splice(i, 1);
        }
    }
}
exports.rejectPending = rejectPending;
