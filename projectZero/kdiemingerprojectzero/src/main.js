import { exit } from 'process';
import readline from 'readline';

import { userLogin, loadUsers, registerCustomer, getUser, registerEmployee } from './user.js';
import { loadCarLot, viewCars, viewOffers, makeOffer } from './customer.js';
import { addCar } from './employee.js';


const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export let login = null;

export function load() {
    loadUsers();
    loadCarLot();
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



//employeeMenu();
load();
start();


function start() {
    read.question(
        `Welcome! Please log in or create an account. 
    Create Account: 0
    Login: 1\n`, (answer) => {
        if (answer == 0) {
            register();
        }
        else if (answer == 1) {
            logUser();
        }
        else {
            console.log("invalid response");
            start();
        }
    });
}

function customerMenu(){
    read.question( 
        `What would you like to do?
        1. View Car Lot
        2. Make an Offer
        3. View owned cars
        4. View remaining payments 
        5. Logout\n`, (answer) => {
            switch (answer) {
                case '1':
                    viewCars();
                    break;
                case '2':
                    makeOfferMenu();
                    break;
                case '3':
                    console.log('In progress');
                    break;
                case '4':
                    console.log('In progress');
                    break;
                case '5':
                    start();
                    break;
                default: start();
            }
        });
}


export function makeOfferMenu(){
    read.question('Enter your username.\n', (uName) => {
        read.question('Enter the car ID.\n', (ID) => {
            read.question('Enter your down payment.\n', (DP) => {
                read.question('Over how many months will you pay off the rest?\n', (month) => {
                    makeOffer(ID, DP, month, uName);
                    viewOffers();
                })
            })
        })
    })
        
}
//System Functions
/*git export function updateCar();
export function rejectPending();
export function monthlyPayment();*/

