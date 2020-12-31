"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceOfferMenu = exports.makeOfferMenu = exports.start = exports.logUser = exports.register = exports.login = exports.read = void 0;
var readline_1 = __importDefault(require("readline"));
var log_js_1 = __importDefault(require("./log.js"));
var user_js_1 = require("./user/user.js");
var car_js_1 = require("./car/car.js");
var offer_js_1 = require("./offer/offer.js");
var offer_service_1 = __importDefault(require("./offer/offer.service"));
var car_service_1 = __importDefault(require("./car/car.service"));
exports.read = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
//registers a user
function register() {
    exports.read.question('Username:', function (username) {
        exports.read.question('Password:', function (password) {
            exports.read.question('Employee Code? (enter 0 to skip)\n', function (code) {
                if (code === '0') {
                    user_js_1.registerUser(username, password, 'Customer');
                    start();
                }
                else if (code === '1234') {
                    user_js_1.registerUser(username, password, 'Employee');
                    start();
                }
                else {
                    log_js_1.default.warn('Code did not correspond to anything.');
                    console.log("Incorrect employee code.");
                    start();
                }
            });
        });
        //}
    });
}
exports.register = register;
//logs a user in
function logUser() {
    exports.read.question('Username:', function (username) {
        exports.read.question('Password:', function (password) {
            user_js_1.userLogin(username, password).then(function (user) {
                if (user) {
                    exports.login = user;
                    console.log("Welcome back " + exports.login.username + "!");
                    if (exports.login.role == 'Employee') {
                        employeeMenu();
                    }
                    else {
                        customerMenu();
                    }
                }
                else {
                    log_js_1.default.error('Incorrect username or password');
                    start();
                }
            });
        });
    });
}
exports.logUser = logUser;
//start menu, login or register
function start() {
    log_js_1.default.debug('Display start menu');
    exports.read.question("Welcome! Please log in or create an account. Enter q to quit. \n    Create Account: 1\n    Login: 2\n", function (answer) {
        if (answer == 1) {
            log_js_1.default.info('Registration');
            register();
        }
        else if (answer == 2) {
            log_js_1.default.info('Login');
            logUser();
        }
        else if (answer == 'q' || answer == 'Q') {
            process.exit();
        }
        else {
            log_js_1.default.warn('Invalid input.');
            start();
        }
    });
}
exports.start = start;
//runs after login or register as customer
function customerMenu() {
    exports.read.question("What would you like to do?\n        1. View Car Lot\n        2. Make an Offer\n        3. View Owned cars\n        4. View remaining payments \n        5. Logout\n", function (answer) {
        switch (answer) {
            case '1':
                log_js_1.default.info('view all cars in car lot');
                car_js_1.viewCars(customerMenu);
                break;
            case '2':
                log_js_1.default.info('pull menu for makeOffer');
                makeOfferMenu();
                customerMenu();
                break;
            case '3':
                log_js_1.default.info('view current users cars');
                user_js_1.viewOwnedCars(exports.login.username, customerMenu);
                break;
            case '4':
                log_js_1.default.info('view current users payments');
                user_js_1.viewOwnPayments(exports.login.username, customerMenu);
                break;
            case '5':
                log_js_1.default.info('return to start menu');
                start();
                break;
            default:
                log_js_1.default.error('Invalid user input.');
                customerMenu();
        }
    });
}
//runs after login or register as employee
function employeeMenu() {
    exports.read.question("What would you like to do?\n        1. View Car Lot\n        2. Add or Remove Car from Lot\n        3. View Pending Offers\n        4. Accept or Reject a Pending Offer\n        5. View All Payments\n        6. Switch to Customer View\n        7. Logout\n", function (answer) {
        switch (answer) {
            case '1':
                log_js_1.default.info('view car lot');
                car_js_1.viewCars(employeeMenu);
                break;
            case '2':
                log_js_1.default.info('add or remove car from lot');
                exports.read.question("1. Add or 2. Remove?\n", function (answer) {
                    if (answer == 1) {
                        exports.read.question("Brand:\n", function (brand) {
                            exports.read.question("Color:\n", function (color) {
                                exports.read.question("CarID:\n", function (carID) {
                                    exports.read.question("Price:\n", function (price) {
                                        car_js_1.addCar(brand, color, carID, price, employeeMenu);
                                    });
                                });
                            });
                        });
                    }
                    else if (answer == 2) {
                        exports.read.question("Enter CarID:\n", function (carID) {
                            car_js_1.removeCar(carID);
                            employeeMenu();
                        });
                    }
                    else {
                        log_js_1.default.error('invalid input');
                        console.log('invalid input');
                    }
                });
                break;
            case '3':
                log_js_1.default.info('view offers');
                offer_js_1.viewOffers(employeeMenu);
                break;
            case '4':
                log_js_1.default.info('accept or reject offer');
                exports.read.question("Enter Offer ID: \n", function (offerID) {
                    exports.read.question("0. Accept \n1. Reject\n", function (num) {
                        if (num == 0) {
                            offer_js_1.acceptOffer(offerID, employeeMenu);
                        }
                        else if (num == 1) {
                            offer_service_1.default.removeOffer(offerID);
                            employeeMenu();
                        }
                        else {
                            log_js_1.default.error('invalid input');
                            employeeMenu();
                        }
                        //pendingOffer(offerID, num);
                    });
                });
                break;
            case '5':
                user_js_1.viewAllPayments(employeeMenu);
                break;
            case '6':
                customerMenu();
                break;
            case '7':
                start();
                break;
            default:
                log_js_1.default.error('Invalid input');
                employeeMenu();
        }
    });
}
function makeOfferMenu() {
    exports.read.question('Enter the car ID.\n', function (ID) {
        exports.read.question('Enter your down payment.\n', function (DP) {
            exports.read.question('Over how many months will you pay off the rest?\n', function (month) {
                car_service_1.default.getCarByID(ID).then(function (car) {
                    if (car && car.price > DP) {
                        if (month == 0 && DP != car.price) {
                            log_js_1.default.error('must enter a number over 0');
                            customerMenu();
                        }
                        else {
                            offer_js_1.checkOffer(ID, DP, month, exports.login.username, replaceOfferMenu, offer_js_1.makeOffer, customerMenu);
                        }
                    }
                    else if (car && car.price < DP) {
                        log_js_1.default.error('downpayment is greater than the car price');
                        console.log('Your down payment exceeds the price of the car.');
                        customerMenu();
                    }
                    else {
                        offer_js_1.checkOffer(ID, DP, month, exports.login.username, replaceOfferMenu, offer_js_1.makeOffer, customerMenu);
                    }
                });
            });
        });
    });
}
exports.makeOfferMenu = makeOfferMenu;
function replaceOfferMenu(ID, DP, month) {
    log_js_1.default.warn('Offer with this ID already exists');
    exports.read.question('You have already made an offer on this car. Would you like to replace it? Yes | No\n', function (answer) {
        if (answer.toLowerCase() == 'yes') {
            log_js_1.default.info('replacing old offer');
            offer_js_1.replaceOffer(ID, DP, month, exports.login.username, customerMenu);
            customerMenu();
        }
        else if (answer.toLowerCase() === 'no') {
            customerMenu();
        }
        else {
            customerMenu();
        }
    });
}
exports.replaceOfferMenu = replaceOfferMenu;
