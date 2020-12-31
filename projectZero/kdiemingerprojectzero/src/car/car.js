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
exports.changeOwner = exports.removeCar = exports.addCar = exports.viewCars = exports.carDisplay = exports.Payment = exports.Car = void 0;
var log_js_1 = __importDefault(require("../log.js"));
var user_service_js_1 = __importDefault(require("../user/user.service.js"));
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
    function Payment(payID, carID, username, downPay, months, remainingPay) {
        this.payID = payID;
        this.carID = carID;
        this.username = username;
        this.downPay = downPay;
        this.months = months;
        this.remainingPay = remainingPay;
    }
    return Payment;
}());
exports.Payment = Payment;
//formats cars for display
function carDisplay(car) {
    log_js_1.default.trace("carDisplay called with parameter " + JSON.stringify(car));
    return car.carID + ': ' + car.color + ' ' + car.brand + '- $' + car.price;
}
exports.carDisplay = carDisplay;
//allows user to view all cars on the lot
function viewCars(callback) {
    log_js_1.default.trace('viewCars called');
    car_service_js_1.default.getCars().then(function (cars) {
        cars.forEach(function (car) { console.log(carDisplay(car)); });
        callback();
    });
}
exports.viewCars = viewCars;
//adds a car to the car lot
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
//removes a car from the lot
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
//changes owner of car and moves the car to the new owner with optional callback to remove car from lot
function changeOwner(carID, username, callback) {
    var _this = this;
    log_js_1.default.info("changeOwner called with params " + carID + " and " + username);
    car_service_js_1.default.getCarByID(carID).then(function (car) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            if (car && username) {
                log_js_1.default.debug(car);
                car.owner = username;
                car_service_js_1.default.updateCarOwner(car);
                user_service_js_1.default.getUser(username).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (user) {
                            user.ownedCars.push(car);
                            log_js_1.default.debug('this is ownedCars: ' + user.ownedCars);
                            user_service_js_1.default.updateUser(user);
                            callback;
                        }
                        else {
                            log_js_1.default.error('user is undefined');
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
            else {
                log_js_1.default.error('car is undefined');
            }
            return [2 /*return*/];
        });
    }); });
}
exports.changeOwner = changeOwner;
