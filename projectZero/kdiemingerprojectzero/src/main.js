import { exit } from 'process';
import readline from 'readline';

import { userLogin, loadUsers, tryAgain, registerUser, getUser } from './user.js';
import { loadCarLot, viewCars } from './customer.js';
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

export function register() {
    read.question('Username:', (username) => {
        if (getUser(username)){
            console.log(getUser(username));
            console.log('Username is taken.');
            start();
        }
        else {
            read.question('Password:', (password) => {
                read.question('Customer or Employee? ', (type) => {
                    registerUser(username, password, type);
                    start();
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
                process.exit();
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

//System Functions
/*git export function updateCar();
export function rejectPending();
export function monthlyPayment();*/
