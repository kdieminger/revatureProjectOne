import fs from 'fs';

export let users;

export function loadUsers() {
    fs.readFileSync('./usersdata.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            users = JSON.parse(data);
        }
    });
}


export function userLogin (name, pass){
    return users.find(person => person.username === name && person.password === pass);
};

export function tryAgain(){
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