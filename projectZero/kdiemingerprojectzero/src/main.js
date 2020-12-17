import readline from 'readline';

import { userLogin } from './userfunctions.js';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log('Welcome! Please log in.');
logUser();

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

function logUser(){
    read.question('Username:', (username) => {
        read.question('Password:', (password) => {
            let login = userLogin(username, password);
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
