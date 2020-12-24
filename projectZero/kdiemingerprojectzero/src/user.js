"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectPending = exports.addPending = exports.updateCarOwner = exports.viewOwnPayments = exports.pendingOffer = exports.removeOffer = exports.removeCar = exports.viewOffers = exports.addCar = exports.registerEmployee = exports.remainingPay = exports.viewUserOffers = exports.viewOwnedCars = exports.makeOffer = exports.registerCustomer = exports.calcMonthPay = exports.viewCars = exports.userLogin = exports.getUser = exports.loadOffers = exports.loadCarLot = exports.loadUsers = exports.offers = exports.lot = exports.data = exports.User = void 0;
var fs_1 = __importDefault(require("fs"));
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
        console.error(err);
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
        console.error(err);
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
        console.error(err);
    }
}
exports.loadOffers = loadOffers;
//ROLE NEUTRAL FUNCTIONS
//checks for matching username
function getUser(userN) {
    return exports.data.find(function (person) { return person.username === userN; });
}
exports.getUser = getUser;
//logs user in
function userLogin(name, pass) {
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
    //TODO: check appropriate type for vehicle - why not Object?
    var vehicle = exports.lot.find(function (car) { return car.carID === carID; });
    var z = vehicle.price;
    var remain = z - downpay;
    var monthly = remain / months;
    monthly = monthly.toFixed(2);
    return monthly;
}
exports.calcMonthPay = calcMonthPay;
//CUSTOMER FUNCTIONS
//registers a customer
function registerCustomer(userN, passW) {
    var role = 'Customer';
    exports.data.push(new User(userN, passW, role, [], [], []));
}
exports.registerCustomer = registerCustomer;
//makes an offer on a car
function makeOffer(carID, downPay, months, user) {
    exports.offers.push(new car_js_1.Offer(carID, downPay, months, user));
    var x = Number(downPay);
    var y = Number(months);
    var monthly = calcMonthPay(carID, x, y);
    addPending(carID, user);
    console.log("Thank you for your offer. You have put a downpayment of " + downPay + " on " + carID + " and your monthly payment will be " + monthly + " over " + months + " months.");
}
exports.makeOffer = makeOffer;
//lets the user view their cars
function viewOwnedCars(username) {
    var user;
    user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.ownedCars);
}
exports.viewOwnedCars = viewOwnedCars;
function viewUserOffers(username) {
    var user;
    user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.pendingOffers);
}
exports.viewUserOffers = viewUserOffers;
//TODO: THIS FUNCTION
function remainingPay(username, carID) {
    var ongoing = exports.data.find(function (person) { return person.username === username; });
}
exports.remainingPay = remainingPay;
//EMPLOYEE FUNCTIONS
//registers an employee
//TODO: Consolidate into one registerUser function
function registerEmployee(userN, passW) {
    var role = 'Employee';
    exports.data.push(new User(userN, passW, role, [], [], []));
}
exports.registerEmployee = registerEmployee;
//adds car to carLot
function addCar(brand, color, carID, price) {
    var newCar = new car_js_1.Car(brand, color, carID, price, 'dealer');
    var check = exports.lot.find(function (car) { return car.carID === carID; });
    if (check) {
        console.log("CarID already exists.");
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
    index = exports.lot.indexOf(remove);
    exports.lot.splice(index, 1);
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
    var car = offer.carID;
    var userN = offer.username;
    if (action == 0) {
        updateCarOwner(car, userN);
        var user = exports.data.find(function (person) { return person.username === userN; });
        var newCar = exports.lot.find(function (vehicle) { return vehicle.carID === car; });
        var newOngoing = user.ongoingPay;
        newOngoing.push(new car_js_1.Payment(offerID, newCar, userN, offer.downPay, offer.months, calcMonthPay(car, offer.downPay, offer.months)));
        removeCar(car);
        removeOffer(offerID);
        rejectPending(car);
    }
    else if (action == 1) {
        var remove = exports.offers.find(function (offer) { return offer.offerID === offerID; });
        var index = exports.offers.indexOf(remove);
        exports.offers.splice(index, 1);
    }
    else {
        console.log("Oops!");
    }
}
exports.pendingOffer = pendingOffer;
function viewOwnPayments(username) {
    var user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.ongoingPay);
}
exports.viewOwnPayments = viewOwnPayments;
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
