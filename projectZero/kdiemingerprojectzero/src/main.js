import readline from 'readline';

import { userLogin, loadUsers } from './userfunctions.js';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export let login = null;

export function load(){
    loadUsers();
}

console.log('Welcome! Please log in.');
logUser();

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

function tryAgain(){
    read.question('Try Again: Yes | No', (answer) => {
        if (answer === "Yes" || answer === "yes"){
            userLogin();
        }
        else if (answer === "No" || answer === "no"){
            console.log('Okay');
        }
        else {
            console.log ('Error: Invalid response.');
            tryAgain();
        }
    });
}

