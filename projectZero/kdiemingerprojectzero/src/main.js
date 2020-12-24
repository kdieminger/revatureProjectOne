import { exit } from 'process';
import readline from 'readline';

import { loadUsers, loadCarLot, loadOffers, getUser, userLogin, viewCars, calcMonthPay, registerCustomer, makeOffer, registerEmployee, 
    addCar, viewOffers, removeCar, lot, updateCarOwner, data, ownedCars, pendingOffer, rejectPending} from './user.js';


const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export let login = null;

//loads files
export function load() {
    loadUsers();
    loadCarLot();
    loadOffers();
}

//gives the user to try to login again
export function tryAgain(answer){
    if (answer === "Yes" || answer === "yes"){   
        logUser();
    }
    else if (answer === "No" || answer === "no"){
            console.log('Okay');
            process.exit();
    }
    else {
            console.log ('Error: Invalid response.');
            tryAgain();
    }
};

//registers a user
export function register() {
    read.question('Username:', (username) => {
        if (getUser(username)){
            console.log('Username is taken.');
            start();
        }
        else {
            read.question('Password:', (password) => {
                read.question('Employee Code? (enter 0 to skip)\n', (code) => {
                    if (code === '0'){
                        registerCustomer(username, password);
                        console.log("Welcome new customer!");
                        start();
                    }
                    else if (code === '1234'){
                        registerEmployee(username, password);
                        console.log("Welcome new employee!");
                        start();
                    }
                    else {
                        console.log("Incorrect employee code.");
                        start();
                    }
                })
                
            })
        }
    })
}

//logs a user in
export function logUser() {
    read.question('Username:', (username) => {
        read.question('Password:', (password) => {
            login = userLogin(username, password);
            if (login) {
                let inUser = login;
                console.log(`Welcome back ${inUser.username}!`);
                if (inUser.role === 'Customer'){
                    customerMenu();
                }
                else if (inUser.role === 'Employee'){
                    employeeMenu();
                }
            }
            else {
                console.log('Login failed. Incorrect username or password.');
                read.question('Try Again: Yes | No\n', (answer) => {
                    tryAgain(answer);
                });
            }
        })
    });
}



//loads files and then runs the start menu
load();
start();


//start menu, login or register
function start() {
    read.question(
        `Welcome! Please log in or create an account. Enter q to quit. 
    Create Account: 0
    Login: 1\n`, (answer) => {
        if (answer == 0) {
            register();
        }
        else if (answer == 1) {
            logUser();
        }
        else if (answer == 'q' || answer == 'Q'){
            process.exit();
        }
        else {
            console.log("invalid response");
            start();
        }
    });
}

//runs after login or register as customer
function customerMenu(){
    read.question( 
        `What would you like to do?
        1. View Car Lot
        2. Make an Offer
        3. View Owned cars
        4. View remaining payments 
        5. Logout\n`, (answer) => {
            switch (answer) {
                case '1':
                    viewCars();
                    customerMenu();
                    break;
                case '2':
                    makeOfferMenu();
                    customerMenu();
                    break;
                case '3':
                    read.question("Enter username: \n", (user) => {
                        ownedCars(user); 
                        customerMenu();   
                    })
                    break;
                case '4':
                    console.log('In progress');
                    break;
                case '5':
                    start();
                    break;
                default: customerMenu();
            }
        });
}

//runs after login or register as employee
function employeeMenu(){
    read.question(
        `What would you like to do?
        1. View Car Lot
        2. Add or Remove Car from Lot
        3. View Pending Offers
        4. Accept or Reject a Pending Offer
        5. View All Payments
        6. Switch to Customer View
        7. Logout\n`, (answer) => {
            switch (answer) {
                case '1':
                    viewCars();
                    employeeMenu();
                    break;
                case '2':
                    read.question("1. Add or 2. Remove?\n", (answer) =>{
                        if (answer == 1){
                            read.question("Brand:\n", (brand) => {
                                read.question("Color:\n", (color) =>{
                                    read.question("CarID:\n", (carID) =>{
                                        read.question("Price:\n", (price) =>{
                                            addCar(brand,color,carID,price);
                                            viewCars();
                                            employeeMenu();
                                        })
                                    })
                                })
                            })
                        }
                        else if (answer == 2){
                            read.question("Enter CarID:\n", (answer) => {
                                removeCar(answer);
                                viewCars();
                                employeeMenu();
                            })
                        }
                    })
                    break;
                case '3':
                    viewOffers();
                    employeeMenu();
                    break;
                case '4':
                    read.question("Enter Car ID: \n", (carid) =>{
                        read.question("Enter Customer Username: \n", (user) =>{
                            read.question("0. Accept \n1. Reject\n", (num) =>{
                                pendingOffer(carid, user, num);
                                employeeMenu();
                            })
                        })
                    })
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
        })
}

//runs if customer selects make an offer
//TODO: make a way to exit back to main menu at any time
export function makeOfferMenu(){
    read.question('Enter your username.\n', (uName) => {
        read.question('Enter the car ID.\n', (ID) => {
            read.question('Enter your down payment.\n', (DP) => {
                read.question('Over how many months will you pay off the rest?\n', (month) => {
                    makeOffer(ID, DP, month, uName);
                    customerMenu();
                })
            })
        })
    })
        
}

