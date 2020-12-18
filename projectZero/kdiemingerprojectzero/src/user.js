import fs from 'fs';

export let users;
export let data;

export function loadUsers() {
    try {
        data = JSON.parse(fs.readFileSync('./usersdata.json'));
      } catch (err) {
        console.error(err);
      }
};


export function userLogin (name, pass){
    return data.find(person => person.username === name && person.password === pass);
};

/*export function tryAgain(){
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
}*/