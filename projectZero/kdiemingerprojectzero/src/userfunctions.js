import fs from 'fs'

export let users;

export function loadUsers() {
    fs.readFile ('usersdata.json',(err,data) => {
        if (err){
            console.log(err);
        }else{
            users = JSON.parse(data);
        }
    });
}

export function userLogin (name, pass){
    return users.find(person => person.username === name && person.password === pass);
}