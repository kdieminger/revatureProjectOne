import readline from 'readline';

import { userLogin, loadUsers, tryAgain } from './userfunctions.js';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export let login = null;

export function load(){
    loadUsers();
}

employeeMenu();
//start();

function start() {
    read.question(
    `Welcome! Please log in or create an account. 
    Create Account: 0
    Login: 1\n`, (answer) => {
        if (answer == 0){
            console.log('in progress');
            process.exit();
        }
        else if (answer == 1){
            logUser();
        }
        else {
            console.log("invalid response");
            start();
        }
    });
}
//User Functions
//TODO: Role Check
function logUser(){
    read.question('Username:', (username) => {
        read.question('Password:', (password) => {
            login = userLogin(username, password);
            if (login){
                inUser = user;
                console.log(`Welcome back ${inUser.username}!`);
            }
            else {
                console.log('Login failed. Incorrect username or password.');
                tryAgain();
            }
        })
    });
}

function employeeMenu(){
    read.question(`What would you like to do?
    0. Add Car
    1. Remove Car
    2. Accept or Reject Pending Offer
    3. View All Payments
    4. Exit\n`, (answer) => {
        switch (answer){
            case '0':
                console.log("0: coming soon!");
                //addCar();
                process.exit();
                break;
            case '1':
                console.log("1: coming soon!");
                //removeCar();
                process.exit();
                break;
            case '2':
                console.log("2: coming soon!");
                //pendingOffer();
                process.exit();
                break;
            case '3':
                console.log("3: coming soon!");
                process.exit();
                //viewPayments();
                break;
            case '4': 
                process.exit(); 
                break;
        }
    })
}

//Employee Functions
/*export function addCar();
export function pendingOffer();
export function removeCar();
export function viewPayments();

//Customer Functions
export function viewCars();
export function makeOffer();
export function ownedCars();
export function remainingPay();

//System Functions
export function updateCar();
export function rejectPending();
export function monthlyPayment();*/

