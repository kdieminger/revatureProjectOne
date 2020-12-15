import { restockItem, getByPosition, displayContents } from './inventory.js';
import readline from 'readline';

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

function makeSelection() {
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

function exit() {
    process.exit();
}

function start() {
    rl.question(
        `What do you want to do?
        1. Display Contents
        2. Make selection
        3. Restock
        q. Exit\n`,
        function (answer) {
            switch(answer) { 
                case '1': 
                    displayContents();
                    start();
                    break;
                case '2': makeSelection(); break;
                case '3': restock(); break;
                case 'q': exit(); break;
                default: start();
            }
    });
}

start();