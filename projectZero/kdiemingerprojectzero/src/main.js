"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOfferMenu = exports.start = exports.logUser = exports.register = exports.tryAgain = exports.load = exports.login = void 0;
var readline_1 = __importDefault(require("readline"));
var user_js_1 = require("./user.js");
var read = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
//loads files
function load() {
    user_js_1.loadUsers();
    user_js_1.loadCarLot();
    user_js_1.loadOffers();
}
exports.load = load;
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
        if (user_js_1.getUser(username)) {
            console.log('Username is taken.');
            start();
        }
        else {
            read.question('Password:', function (password) {
                read.question('Employee Code? (enter 0 to skip)\n', function (code) {
                    if (code === '0') {
                        user_js_1.registerCustomer(username, password);
                        console.log("Welcome new customer!");
                        start();
                    }
                    else if (code === '1234') {
                        user_js_1.registerEmployee(username, password);
                        console.log("Welcome new employee!");
                        start();
                    }
                    else {
                        console.log("Incorrect employee code.");
                        start();
                    }
                });
            });
        }
    });
}
exports.register = register;
//logs a user in
function logUser() {
    read.question('Username:', function (username) {
        read.question('Password:', function (password) {
            exports.login = user_js_1.userLogin(username, password);
            if (exports.login) {
                var inUser = exports.login;
                console.log("Welcome back " + inUser.username + "!");
                if (inUser.role === 'Customer') {
                    customerMenu();
                }
                else if (inUser.role === 'Employee') {
                    employeeMenu();
                }
            }
            else {
                console.log('Login failed. Incorrect username or password.');
                read.question('Try Again: Yes | No\n', function (answer) {
                    tryAgain(answer);
                });
            }
        });
    });
}
exports.logUser = logUser;
//start menu, login or register
function start() {
    read.question("Welcome! Please log in or create an account. Enter q to quit. \n    Create Account: 0\n    Login: 1\n", function (answer) {
        if (answer == 0) {
            register();
        }
        else if (answer == 1) {
            logUser();
        }
        else if (answer == 'q' || answer == 'Q') {
            process.exit();
        }
        else {
            console.log("invalid response");
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
                user_js_1.viewCars();
                customerMenu();
                break;
            case '2':
                makeOfferMenu();
                customerMenu();
                break;
            case '3':
                user_js_1.viewOwnedCars(exports.login.username);
                customerMenu();
                break;
            case '4':
                user_js_1.viewOwnPayments(exports.login.username);
                customerMenu();
                break;
            case '5':
                start();
                break;
            case 'e':
                employeeMenu();
                break;
            default: customerMenu();
        }
    });
}
//runs after login or register as employee
function employeeMenu() {
    read.question("What would you like to do?\n        1. View Car Lot\n        2. Add or Remove Car from Lot\n        3. View Pending Offers\n        4. Accept or Reject a Pending Offer\n        5. View All Payments\n        6. Switch to Customer View (enter 'e' to switch back)\n        7. Logout\n", function (answer) {
        switch (answer) {
            case '1':
                user_js_1.viewCars();
                employeeMenu();
                break;
            case '2':
                read.question("1. Add or 2. Remove?\n", function (answer) {
                    if (answer == 1) {
                        read.question("Brand:\n", function (brand) {
                            read.question("Color:\n", function (color) {
                                read.question("CarID:\n", function (carID) {
                                    read.question("Price:\n", function (price) {
                                        user_js_1.addCar(brand, color, carID, price);
                                        employeeMenu();
                                    });
                                });
                            });
                        });
                    }
                    else if (answer == 2) {
                        read.question("Enter CarID:\n", function (answer) {
                            user_js_1.removeCar(answer);
                            user_js_1.viewCars();
                            employeeMenu();
                        });
                    }
                });
                break;
            case '3':
                user_js_1.viewOffers();
                employeeMenu();
                break;
            case '4':
                read.question("Enter Offer ID: \n", function (offerID) {
                    read.question("0. Accept \n1. Reject\n", function (num) {
                        user_js_1.pendingOffer(offerID, num);
                        employeeMenu();
                    });
                });
                break;
            case '5':
                console.log("In progress");
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
                user_js_1.makeOffer(ID, DP, month, exports.login.username);
                customerMenu();
            });
        });
    });
}
exports.makeOfferMenu = makeOfferMenu;
