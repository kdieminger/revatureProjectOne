import readline from 'readline';

import { restockItem, getByPosition, displayContents } from './inventory.js';
import { login } from './user.js';


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
    rl.question('Which one do you want? ', (answer) => {
        // TODO: Sanitize inputs
        //As a system, when input is given, I check to make sure it is of the correct type/format.
        //Position: Two or Three Characters. The first character is a letter, followed by one or two numbers.
        if (typeof(answer) === 'string') {
            console.log('input is string')
            if (answer.length <= 3 && answer.length > 1) {
                console.log('input is correct length')
                if (isNaN(answer[0]) == false) {
                    console.log('first char is string')
                }
            }
        }
        let selection = getByPosition(answer);
        if (selection) {
            console.log(selection);
            obtainPayment(selection);
        } else {
            console.log("Incorrect, try again.");
            start();
        }
    });
}

function obtainPayment(selection) {
    console.log(`Remit payment of $${selection.price}.`); // Template literal
    // ${} <- Expression: Executes JS code inside of a template literal.
    rl.question('Accept? (y/n)', function(answer) {
        if(answer == 'y') {
            dispenseProduct(selection);
        } else {
            start();
        }
    });
}

function dispenseProduct(selection) {
    if(selection.stock > 0) {
        console.log(`Here is your ${selection.item}.`)
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
        1. Login
        2. Display Contents
        3. Make selection
        4. Restock
        q. Exit\n`,
        function (answer) {
            switch(answer) { 
                case '1':
                    attemptLogin();
                    break;
                case '2': 
                    displayContents();
                    start();
                    break;
                case '3': makeSelection(); break;
                case '4': restock(); break;
                case 'q': exit(); break;
                default: start();
            }
    });
}

start();