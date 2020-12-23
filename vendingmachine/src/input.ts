import readline from 'readline';

import { updateItem, getByPosition, displayContents, Inventory, createItem } from './inventory/inventory';
import { getUser, login, register, saveUsers, loadUsers, User } from './user/user';
import logger from './log';


export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export let loggedUser: User;

export function makeSelection() {
    if (loggedUser != null) {
        rl.question('Which one do you want? ', (answer) => {
            // TODO: Sanitize inputs
            //As a system, when input is given, I check to make sure it is of the correct type/format.
            //Position: Two or Three Characters. The first character is a letter, followed by one or two numbers.
            let valid = false;
            if (answer.length <= 3 && answer.length > 1) {
                //console.log('input is correct length')
                if (answer[0].match(/^[A-Z]/)) {
                    //console.log('first char is string')
                    switch (answer.length) {
                    case 2:
                        if (answer[1].match(/^[0-9]/)) {
                            //console.log('second character is number');
                            valid = true;
                        } else {
                            console.log('second character is not number');
                        }
                        break;
                    case 3:
                        if (answer[1].match(/^[0-9]/) && answer[2].match(/^[0-9]/)) {
                            //console.log('second and third char is number');
                            valid = true;
                        } else {
                            console.log('The second or third values aren\'t numbers.');
                        }
                        break;
                    default:
                        console.log('Please check your input again.');
                        break;
                    }
                } else {
                    console.log('The first character is not a character.');
                }
            } else {
                console.log('Please check the length of your input.');
            }

            if (valid == true) {
                getByPosition(answer, obtainPayment, start);
            } else {
                start();
            }
        });
    } else {
        console.log('Please login to proceed.');
        start();
    }
}

export function obtainPayment(selection: Inventory, callback?: Function) {
    console.log(`Remit payment of $${selection.price}.`); // Template literal
    // ${} <- Expression: Executes JS code inside of a template literal.
    if (selection.price > loggedUser.money) {
        console.log(`You don't have enough money to buy it. You have $${loggedUser.money}.`);
        start();
    } else {
        rl.question('Accept? (y/n)', function (answer) {
            if (answer == 'y') {
                dispenseProduct(selection);
            } else {
                start();
            }
        });
    }
}

export function dispenseProduct(selection: Inventory) {
    if (selection.stock > 0) {
        loggedUser.money = loggedUser.money - selection.price;
        console.log(`Here is your ${selection.item}. You have $${loggedUser.money} remaining.`);
        selection.stock--;
        updateItem(selection, start);
    } else {
        console.log(`Not enough ${selection.item}. Returning $${selection.price}.`);
        start();
    }
}

export function restock() {
    logger.trace('Attempting Restock');
    rl.question('Restock which? ', (answer) => {
        getByPosition(answer, updateItem, start, function(item: Inventory) {item.stock++});
    });
}

export function addItem() {
    rl.question('position: ', (position) => {
        rl.question('name: ', (item) => {
            rl.question('price: ', (price) => {
                rl.question('stock: ', (stock) => {
                    try{
                        createItem({position, item, price: Number(price), stock: Number(stock)}, start);
                    } catch {
                        logger.warn('String input for price or stock. Try Again.')
                        start();
                    }
                });
            });
        });
    });
}

export function attemptRegister() {
    rl.question('Username? ', (username) => {
        //if username already exists, print output
        if (getUser(username)) { //
            console.log('User already exists');
            start();
        }
        else {
            console.log('Register new user');
            //ask for password
            rl.question('Password? ', (password) => {
                //TO-DO: confirm password
                rl.question('Money? ', (money) => {
                    /*TO-DO: validate money */
                    register(username, password, Number(money));
                    start();
                });
            });
        }

    });
}
export function checkUserRole(callback: Function) {
    logger.trace('Checking user role.');
    if (loggedUser && loggedUser.role === 'Employee') {
        callback();
    }
    else {
        logger.warn('Attempted Restock not permitted.');
        console.log('Login as Employee');
        start();
    }
}

export function attemptLogin() {
    rl.question('Username? ', (username) => {
        rl.question('Password? ', (password) => {
            logger.debug(`${username + ' ' + password}`);
            let user = login(username, password);
            if (user) {
                loggedUser = user;
                console.log(`Welcome back ${loggedUser.name}. You have $${loggedUser.money}`);
            } else {
                console.log('Login Failed.');
            }
            start();
        });
    });
}

export function exit() {
    saveUsers();
    process.exit();
}

export function start() {
    logger.trace('Display menu.');
    rl.question(
        `What do you want to do?
        0. Register
        1. Login
        2. Display Contents
        3. Make selection
        4. Restock
        5. Add Item
        q. Exit\n`,
        function (answer) {
            let valid = false;
            if (answer.match(/^[0-9]*/) || (answer === 'q')) {
                valid = true;
            }
            if (valid) {
                switch (answer) {
                case '0':
                    logger.info('Registration.')
                    attemptRegister();
                    break;
                case '1':
                    logger.info('Login');
                    attemptLogin();
                    break;
                case '2':
                    logger.info('Contents');
                    displayContents(start);
                    break;
                case '3':
                    logger.info('Selection');
                    makeSelection();
                    break;
                case '4':
                    logger.info('Restock');
                    checkUserRole(restock);
                    break;
                case '5':
                    logger.info('Add Item');
                    checkUserRole(addItem);
                    break;
                case 'q': exit(); break;
                default: start();
                }
            } else {
                console.log('invalid input.');
                start();
            }
        });
}

export function load() {
    loadUsers();
}