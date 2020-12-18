import { exit } from 'process';
import readline from 'readline';

import { userLogin, loadUsers } from './user.js';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export let login = null;

export function load() {
    loadUsers();
}

//employeeMenu();
start();

function start() {
    read.question(
        `Welcome! Please log in or create an account. 
    Create Account: 0
    Login: 1\n`, (answer) => {
        if (answer == 0) {
            console.log('in progress');
            process.exit();
        }
        else if (answer == 1) {
            load();
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
function logUser() {
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
                //tryAgain();
                process.exit();
            }
        })
    });
}


//System Functions
/*git export function updateCar();
export function rejectPending();
export function monthlyPayment();*/

