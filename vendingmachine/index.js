import readline from 'readline';

import { restockItem, getByPosition, displayContents } from './inventory.js';
import { getUser, login, register } from './user.js';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
    List of features:
        Contains products. - Fine
        Displays info on products. - Fine
        Accepts selection of object. - Fine
        Accepts payment for object. - Fine
        Dispenses object. - Fine
        Be able to be restocked. - Fine
*/

let loggedUser = null;

function makeSelection() {
    if (loggedUser != null) {
        rl.question('Which one do you want? ', (answer) => {
            // TODO: Sanitize inputs
            let selection = getByPosition(answer);
            if (selection) {
                console.log(selection);
                obtainPayment(selection);
            } else {
                console.log("Incorrect, try again.");
                start();
            }
        });
    } else {
        console.log("Please login to proceed.");
        start();
    }
}

function obtainPayment(selection) {
    console.log(`Remit payment of $${selection.price}.`); // Template literal
    // ${} <- Expression: Executes JS code inside of a template literal.
    if (selection.price > loggedUser.money) {
        console.log(`You don't have enough money to buy it. You have $${loggedUser.money}.`);
        start();
    } else {
        rl.question('Accept? (y/n)', function(answer) {
            if(answer == 'y') {
                dispenseProduct(selection);
            } else {
                start();
            }
        });
    }
}

function dispenseProduct(selection) {
    if(selection.stock > 0) {
        loggedUser.money = loggedUser.money - selection.price;
        console.log(`Here is your ${selection.item}. You have $${loggedUser.money} remaining.`);
        selection.stock--;
        start();
    } else {
        console.log(`Not enough ${selection.item}. Returning $${selection.price}.`);
        start();
    }
}

function restock() {
    rl.question('Restock which? ', (answer) => {
        let selection = getByPosition(answer);
        if (selection) {
            restockItem(selection.item);
            start();
        } else {
            console.log("Incorrect, try again.");
            start();
        }
    });
}

function attemptRegister() {
    rl.question('Username? ', (username) => {
         //if username already exists, print output
         if(getUser(username)) { //
            console.log("User already exists");
            start();
        }
        else {
            console.log("Register new user");
            //ask for password
            rl.question('Password? ', (password) => {
                //TO-DO: confirm password
                rl.question('Money? ', (money) => {
                    /*TO-DO: validate money */
                    register(username, password, money);
                    start();
                })
            })
        }
        
    });
}
function checkUserRole() {
    if (loggedUser.role === 'Employee'){
        restock();
    }
    else {
        console.log("Login as Employee");
        start();
    }
}

function attemptLogin() {
    rl.question('Username? ', (username) => {
        rl.question('Password? ', (password) => {
            let user = login(username, password);
            if(user) {
                loggedUser = user;
                console.log(`Welcome back ${loggedUser.name}. You have $${loggedUser.money}`);
            } else {
                console.log('Login Failed.')
            }
            start();
        })
    });
}

function exit() {
    process.exit();
}

function start() {
    rl.question(
        `What do you want to do?
        0. Register
        1. Login
        2. Display Contents
        3. Make selection
        4. Restock
        q. Exit\n`,
        function (answer) {
            switch(answer) { 
                case '0':
                    attemptRegister();
                    break;
                case '1':
                    attemptLogin();
                    break;
                case '2':
                    displayContents();
                    start();
                    break;
                case '3': makeSelection(); break;
                case '4': checkUserRole(); break;
                case 'q': exit(); break;
                default: start();
            }
    });
}

start();