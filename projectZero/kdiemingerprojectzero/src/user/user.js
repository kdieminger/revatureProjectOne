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
exports.paymentDisplay = exports.viewAllPayments = exports.viewUserOffers = exports.viewOwnPayments = exports.viewOwnedCars = exports.userLogin = exports.registerUser = exports.User = void 0;
var log_js_1 = __importDefault(require("../log.js"));
var car_js_1 = require("../car/car.js");
var user_service_js_1 = __importDefault(require("./user.service.js"));
var car_service_js_1 = __importDefault(require("../car/car.service.js"));
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
//registers a user
function registerUser(username, password, role) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_js_1.default.info('registerUser called');
                    return [4 /*yield*/, user_service_js_1.default.getUser(username).then(function (user) {
                            if (user && user.username === username) {
                                log_js_1.default.error('username already exists');
                                return null;
                            }
                            else {
                                var add = new User(username, password, role, [], [], []);
                                user_service_js_1.default.addUser(add);
                                console.log("Welcome new " + role + "!");
                                return add;
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.registerUser = registerUser;
//logs user in
function userLogin(name, pass) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_js_1.default.trace("user login called with parameters " + name + " and " + pass);
                    return [4 /*yield*/, user_service_js_1.default.getUser(name).then(function (user) {
                            if (user && user.password === pass) {
                                return user;
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
exports.userLogin = userLogin;
;
//allows user to view their owned cars
function viewOwnedCars(username, callback) {
    log_js_1.default.info('viewOwnedCars called');
    user_service_js_1.default.getUser(username).then(function (user) {
        if (user) {
            var view = user.ownedCars;
            for (var i = 0; i < view.length; i++) {
                console.log(view[i]);
            }
        }
        else {
            log_js_1.default.error('user is undefined');
        }
    });
    callback();
}
exports.viewOwnedCars = viewOwnedCars;
//allows the user to view their ongoing payments
function viewOwnPayments(username, callback) {
    log_js_1.default.info('viewOwnPayments called');
    user_service_js_1.default.getUser(username).then(function (user) {
        if (user) {
            var view = user.ongoingPay;
            for (var i = 0; i < view.length; i++) {
                console.log(view[i]);
            }
        }
        else {
            log_js_1.default.error('user is undefined');
        }
    });
    callback();
}
exports.viewOwnPayments = viewOwnPayments;
//allows the user to view their pending offers
function viewUserOffers(username, callback) {
    log_js_1.default.info('viewUserOffers called');
    user_service_js_1.default.getUser(username).then(function (user) {
        if (user) {
            var view = user.pendingOffers;
            for (var i = 0; i < view.length; i++) {
                console.log(view[i]);
            }
        }
        else {
            log_js_1.default.error('user is undefined');
        }
    });
    callback();
}
exports.viewUserOffers = viewUserOffers;
//allows an employee to view all ongoing payments
function viewAllPayments(callback) {
    log_js_1.default.info('viewAllPayments called');
    user_service_js_1.default.getPayments().then(function (payments) {
        log_js_1.default.debug(payments);
        payments.forEach(function (pay) {
            log_js_1.default.debug(pay);
            console.log(paymentDisplay(pay));
        });
        callback();
    });
}
exports.viewAllPayments = viewAllPayments;
//formats ongoing payments for display
function paymentDisplay(pay) {
    log_js_1.default.info("paymentDisplay called with parameter " + JSON.stringify(pay));
    car_service_js_1.default.getCarByID(pay.carID).then(function (car) {
        if (car) {
            return pay.payID + ': ' + car_js_1.carDisplay(car) + '\nCustomer:  ' + pay.username + '\nDown Payment- $' +
                pay.downPay + '\nMonths Remaining- ' + pay.months + '\nRemaining Payment- $' + pay.remainingPay;
        }
    });
}
exports.paymentDisplay = paymentDisplay;
