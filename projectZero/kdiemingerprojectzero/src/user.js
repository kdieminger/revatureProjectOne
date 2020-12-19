import fs from 'fs';
import { exit } from 'process';
import { logUser } from './main.js' 

//variables
export let users;
export let data;


//loads users from usersdata.json
export function loadUsers() {
    try {
        data = JSON.parse(fs.readFileSync('./usersdata.json'));
      } catch (err) {
        console.error(err);
      }
};

//checks for matching username
export function getUser(userN){
    return data.find(person => person.username === userN);
}

//logs user in
export function userLogin (name, pass){
    return data.find(person => person.username === name && person.password === pass);
};

//gives the user to try to login again
export function tryAgain(answer){
    if (answer === "Yes" || answer === "yes"){   
        logUser();
    }
    else if (answer === "No" || answer === "no"){
            console.log('Okay');
            process.exit();
    }
    else {
            console.log ('Error: Invalid response.');
            tryAgain();
    }
};

//registers a user
export function registerUser(userN, passW, type){
    if (type === "customer" || type === "Customer"){
        data.push({username: userN, password: passW, role: "Customer"})
    }
    else if (type === "Employee" || type === "employee"){
        data.push({username: userN, password: passW, role: "Employee"})
    }
}