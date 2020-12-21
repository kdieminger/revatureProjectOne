import fs from 'fs';
import { exit } from 'process';

//Class declaration
export class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
        this.role = 'Customer';
        this.userCars = [];
    }
}

//variables
export let data = [];


//loads users from usersdata.json
export function loadUsers() {
    try {
        data = JSON.parse(fs.readFileSync('../usersdata.json'));
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



//registers a customer
export function registerCustomer(userN, passW){
    data.push({username: userN, password: passW, role: 'Customer'});
}

//registers an employee
export function registerEmployee(userN, passW){
    data.push({username: userN, password: passW, role: 'Employee'});
}
