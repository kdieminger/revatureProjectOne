import readline from 'readline';

import { userLogin, loadUsers, tryAgain } from './user.js';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export let login = null;

export function load() {
    loadUsers();
}

employeeMenu();
//start();

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




//System Functions
/*git export function updateCar();
export function rejectPending();
export function monthlyPayment();*/

