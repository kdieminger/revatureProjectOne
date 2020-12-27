"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOfferMenu = exports.start = exports.logUser = exports.register = exports.tryAgain = exports.login = void 0;
var readline_1 = __importDefault(require("readline"));
var log_js_1 = __importDefault(require("./log.js"));
var user_js_1 = require("./user/user.js");
var car_js_1 = require("./car/car.js");
var offer_js_1 = require("./offer/offer.js");
var offer_service_js_1 = __importDefault(require("./offer/offer.service.js"));
var read = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
//gives the user to try to login again
function tryAgain(answer) {
    if (answer === "Yes" || answer === "yes") {
        logUser();
    }
    else if (answer === "No" || answer === "no") {
        console.log('Okay');
        process.exit();
    }
    else {
        log_js_1.default.warn('invalid input');
        console.log('Error: Invalid response.');
        //tryAgain();
        logUser();
    }
}
exports.tryAgain = tryAgain;
;
//registers a user
function register() {
    read.question('Username:', function (username) {
        // if (getUser(username)){
        //     logger.warn('username already exists');
        //     console.log('Username is taken.');
        //     start();
        // }
        // else {
        read.question('Password:', function (password) {
            read.question('Employee Code? (enter 0 to skip)\n', function (code) {
                if (code === '0') {
                    user_js_1.registerUser(username, password, 'Customer', start);
                }
                else if (code === '1234') {
                    user_js_1.registerUser(username, password, 'Employee', start);
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
    read.question('Username:', function (username) {
        read.question('Password:', function (password) {
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
                    console.log('Login failed. Incorrect username or password.');
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
    read.question("Welcome! Please log in or create an account. Enter q to quit. \n    Create Account: 0\n    Login: 1\n", function (answer) {
        if (answer == 0) {
            log_js_1.default.info('Registration');
            register();
        }
        else if (answer == 1) {
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
    read.question("What would you like to do?\n        1. View Car Lot\n        2. Make an Offer\n        3. View Owned cars\n        4. View remaining payments \n        5. Logout\n", function (answer) {
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
            default: customerMenu();
        }
    });
}
//runs after login or register as employee
function employeeMenu() {
    read.question("What would you like to do?\n        1. View Car Lot\n        2. Add or Remove Car from Lot\n        3. View Pending Offers\n        4. Accept or Reject a Pending Offer\n        5. View All Payments\n        6. Switch to Customer View\n        7. Logout\n", function (answer) {
        switch (answer) {
            case '1':
                log_js_1.default.info('view car lot');
                car_js_1.viewCars(employeeMenu);
                break;
            case '2':
                log_js_1.default.info('add or remove car from lot');
                read.question("1. Add or 2. Remove?\n", function (answer) {
                    if (answer == 1) {
                        read.question("Brand:\n", function (brand) {
                            read.question("Color:\n", function (color) {
                                read.question("CarID:\n", function (carID) {
                                    read.question("Price:\n", function (price) {
                                        car_js_1.addCar(brand, color, carID, price, employeeMenu);
                                    });
                                });
                            });
                        });
                    }
                    else if (answer == 2) {
                        read.question("Enter CarID:\n", function (carID) {
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
                read.question("Enter Offer ID: \n", function (offerID) {
                    read.question("0. Accept \n1. Reject\n", function (num) {
                        if (num == 0) {
                            offer_js_1.acceptOffer(offerID, employeeMenu);
                        }
                        else if (num == 1) {
                            offer_service_js_1.default.removeOffer(offerID);
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
                user_js_1.viewAllPayments();
                employeeMenu();
                break;
            case '6':
                customerMenu();
                break;
            case '7':
                start();
                break;
            default: employeeMenu();
        }
    });
}
//runs if customer selects make an offer
//TODO: make a way to exit back to main menu at any time
function makeOfferMenu() {
    read.question('Enter the car ID.\n', function (ID) {
        read.question('Enter your down payment.\n', function (DP) {
            read.question('Over how many months will you pay off the rest?\n', function (month) {
                var offerID = ID + exports.login.username;
                log_js_1.default.debug(offerID);
                log_js_1.default.debug(offer_js_1.checkOffer(offerID));
                offer_js_1.checkOffer(offerID).then(function (offer) {
                    if (offer) {
                        log_js_1.default.warn('Offer with this ID already exists');
                        read.question('You have already made an offer on this car. Would you like to replace it? Yes | No\n', function (answer) {
                            if (answer === 'Yes' || answer === 'yes') {
                                log_js_1.default.info('replacing old offer');
                                offer_js_1.replaceOffer(ID, DP, month, exports.login.username);
                                customerMenu();
                            }
                            else if (answer === 'No' || answer === 'no') {
                                customerMenu();
                            }
                            else {
                                customerMenu();
                            }
                        });
                    }
                    else {
                        log_js_1.default.info('attempting to make a new offer');
                        offer_js_1.makeOffer(ID, DP, month, exports.login.username, customerMenu);
                    }
                });
            });
        });
    });
}
exports.makeOfferMenu = makeOfferMenu;
