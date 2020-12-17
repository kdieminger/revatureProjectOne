import fs from 'fs';

export let usersData;

export function loadUsers() {
    usersdata = fs.readFileSync('./usersdata.json');
        usersData = JSON.parse(usersData);
    console.log(usersData);
};


export function userLogin (name, pass){
    return users.find(person => person.username === name && person.password === pass);
};