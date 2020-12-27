"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCar = exports.addCar = exports.viewCars = exports.carDisplay = exports.Payment = exports.Car = void 0;
var log_js_1 = __importDefault(require("../log.js"));
var car_service_js_1 = __importDefault(require("./car.service.js"));
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
var Payment = /** @class */ (function () {
    function Payment(payID, vehicle, username, downPay, months, remainingPay) {
        if (remainingPay === void 0) { remainingPay = (vehicle.price) - downPay; }
        this.payID = payID;
        this.vehicle = vehicle;
        this.username = username;
        this.downPay = downPay;
        this.months = months;
        this.remainingPay = remainingPay;
    }
    return Payment;
}());
exports.Payment = Payment;
function carDisplay(car) {
    log_js_1.default.trace("carDisplay called with parameter " + JSON.stringify(car));
    return car.carID + ': ' + car.color + ' ' + car.brand + '- $' + car.price;
}
exports.carDisplay = carDisplay;
function viewCars(callback) {
    log_js_1.default.trace('viewCars called');
    car_service_js_1.default.getCars().then(function (cars) {
        cars.forEach(function (car) { console.log(carDisplay(car)); });
        callback();
    });
}
exports.viewCars = viewCars;
function addCar(brand, color, carID, price, callback) {
    log_js_1.default.trace("addCar called with parameters " + brand + ", " + color + ", " + carID + ", and " + price + ".");
    car_service_js_1.default.getCarByID(carID).then(function (car) {
        if (!car) {
            var newCar = new Car(brand, color, carID, price, 'dealer');
            car_service_js_1.default.addCar(newCar);
        }
        else {
            log_js_1.default.error('carID already exists');
        }
    });
    callback();
}
exports.addCar = addCar;
function removeCar(carID) {
    log_js_1.default.trace("removeCar called with parameter " + carID);
    car_service_js_1.default.getCarByID(carID).then(function (car) {
        if (car) {
            car_service_js_1.default.removeCar(carID);
        }
        else {
            log_js_1.default.error('car does not exist');
        }
    });
}
exports.removeCar = removeCar;
