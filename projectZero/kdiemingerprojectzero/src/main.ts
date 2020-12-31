import { exit } from 'process';
import readline from 'readline';
import logger from './log.js';
import {
    User, userLogin, registerUser, viewOwnedCars, viewUserOffers, viewOwnPayments, viewAllPayments } from './user/user.js';
import { Car, viewCars, addCar, removeCar } from './car/car.js';
import { Offer, viewOffers, offerDisplay, makeOffer, replaceOffer, checkOffer, acceptOffer } from './offer/offer.js';
import offerService from './offer/offer.service';
import carService from './car/car.service'

export const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//will be set to the current user upon login
export let login: User;


//registers a user as either customer or employee
export function register() {
    read.question('Username:', (username: string) => {
        read.question('Password:', (password: string) => {
            read.question('Employee Code? (enter 0 to skip)\n', (code: string) => {
                if (code === '0') {
                    registerUser(username, password, 'Customer');
                    start();
                }
                else if (code === '1234') {
                    registerUser(username, password, 'Employee');
                    start();
                }
                else {
                    logger.warn('Code did not correspond to anything.');
                    console.log("Incorrect employee code.");
                    start();
                }
            })

        })
    })
}

//logs a user in - sets login to the user
export function logUser() {
    read.question('Username:', (username: string) => {
        read.question('Password:', (password: string) => {
            userLogin(username, password).then((user) => {
                if(user){
                    login = user;
                    console.log(`Welcome back ${login.username}!`);
                    if(login.role == 'Employee'){
                        employeeMenu();
                    }
                    else{
                        customerMenu();
                    }
                }
                else {
                    logger.error('Incorrect username or password');
                    start();
                }
            })
        })
    });
}


//start menu, login or register
export function start() {
    logger.debug('Display start menu');
    read.question(
        `Welcome! Please log in or create an account. Enter q to quit. 
    Create Account: 1
    Login: 2\n`, (answer: any) => {
        if (answer == 1) {
            logger.info('Registration');
            register();
        }
        else if (answer == 2) {
            logger.info('Login');
            logUser();
        }
        else if (answer == 'q' || answer == 'Q'){
            process.exit();
        }
        else {
            logger.warn('Invalid input.');
            start();
        }
    });
}

//menu for customer role
function customerMenu(){
    read.question( 
        `What would you like to do?
        1. View Car Lot
        2. Make an Offer
        3. View Owned cars
        4. View remaining payments 
        5. Logout\n`, (answer: string) => {
            switch (answer) {
                case '1':
                    logger.info('view all cars in car lot');    
                    viewCars(customerMenu);
                    break;
                case '2':
                    logger.info('pull menu for makeOffer');
                    makeOfferMenu();
                    customerMenu();
                    break;
                case '3':
                    logger.info('view current users cars');
                    viewOwnedCars(login.username, customerMenu);   
                    break;
                case '4':
                    logger.info('view current users payments');
                    viewOwnPayments(login.username, customerMenu);
                    break;
                case '5':
                    logger.info('return to start menu');
                    start();
                    break;
                default: 
                    logger.error('Invalid user input.');
                    customerMenu();
            }
        });
}

//menu for employee role
function employeeMenu(){
    read.question(
        `What would you like to do?
        1. View Car Lot
        2. Add or Remove Car from Lot
        3. View Pending Offers
        4. Accept or Reject a Pending Offer
        5. View All Payments
        6. Switch to Customer View
        7. Logout\n`, (answer: string) => {
            switch (answer) {
                case '1':
                    logger.info('view car lot');
                    viewCars(employeeMenu);
                    break;
                case '2':
                    logger.info('add or remove car from lot');
                    read.question("1. Add or 2. Remove?\n", (answer: any) =>{
                        if (answer == 1){
                            read.question("Brand:\n", (brand) => {
                                read.question("Color:\n", (color) =>{
                                    read.question("CarID:\n", (carID) =>{
                                        read.question("Price:\n", (price: any) =>{
                                            addCar(brand, color, carID, price, employeeMenu);
                                        })
                                    })
                                })
                            })
                        }
                        else if (answer == 2){
                            read.question("Enter CarID:\n", (carID: string) => {
                                removeCar(carID);
                                employeeMenu();
                            })
                        }
                        else {
                            logger.error('invalid input');
                            console.log('invalid input');
                        }
                    })
                    break;
                case '3':
                    logger.info('view offers');
                    viewOffers(employeeMenu);
                    break;
                case '4':
                    logger.info('accept or reject offer');
                    read.question("Enter Offer ID: \n", (offerID: string) =>{
                            read.question("0. Accept \n1. Reject\n", (num: any) =>{
                                if (num == 0){
                                    acceptOffer(offerID, employeeMenu);
                                }
                                else if(num == 1){
                                    offerService.removeOffer(offerID);
                                    employeeMenu();
                                }
                                else{
                                    logger.error('invalid input');
                                    employeeMenu();
                                }
                            });
                    })
                    break;
                case '5':
                    viewAllPayments(employeeMenu);
                    break;
                case '6':
                    customerMenu();
                    break;
                case '7':
                    start();
                    break;
                default: 
                    logger.error('Invalid input');
                    employeeMenu();
            }
        })
}

//menu to accept input for making an offer
export function makeOfferMenu() {
    read.question('Enter the car ID.\n', (ID: string) => {
        read.question('Enter your down payment.\n', (DP: any) => {
            read.question('Over how many months will you pay off the rest?\n', (month: any) => {
                let dPay: number = parseInt(DP);
                let mnths: number = parseInt(month);
                if (isNaN(dPay) || isNaN(mnths)) {
                    logger.error('invalid input, NaN');
                }
                else{
                    carService.getCarByID(ID).then((car) => {
                        if(car && car.price > DP){
                            if(month == 0 && DP != car.price){
                                logger.error('must enter a number over 0');
                                customerMenu();
                            }
                            else{
                                checkOffer(ID, DP, month, login.username, customerMenu, makeOffer, customerMenu)
                            }
                        }
                        else if(car && car.price < DP){
                            logger.error('downpayment is greater than the car price');
                            console.log('Your down payment exceeds the price of the car.');
                            customerMenu();
                        }
                        else{
                            checkOffer(ID, DP, month, login.username, customerMenu, makeOffer, customerMenu);
                        }
                    })
                }                
            })
        })
    })
}

//menu to handle replacing an existing offer
export function replaceOfferMenu(ID: string, DP: number, month: number) {
    logger.warn('Offer with this ID already exists');
    read.question('You have already made an offer on this car. Would you like to replace it? Yes | No\n', (answer) => {
        if (answer.toLowerCase() == 'yes') {
            logger.info('replacing old offer');
            replaceOffer(ID, DP, month, login.username);
            customerMenu();
        }
        else if (answer.toLowerCase() === 'no') {
            customerMenu();
        }
        else {
            customerMenu();
        }
    })
}


