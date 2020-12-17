const readline = require('readline');
const { stdin } = require('process');
const { stdout } = require('process');

readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start(){
    console.log('Welcome! Please log in.');
    userLogin();
}

function userLogin(){
    read.question('Username:', (username) => {
        read.question('Password:', (password) => {
            let login = userLogin(username, password);
            if (login){
                inUser = user;
                console.log(`Welcome back ${inUser.username}!`);
            }
            else {
                console.log('Login failed. Incorrect username or password.');
            }
        })
    })
}