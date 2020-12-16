import readline from 'readline'

export const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start(){
    read.question('Welcome! Would you like to login?')
}

function userLogin(){
    read.question('Username:', (username) => {
        read.question('Password:', (password) => {
            if (userLogin){
                inUser = user;
                console.log(`Welcome back ${inUser.username}!`);
            }
            else {
                console.log('Login failed. Incorrect username or password.');
            }
            }
        }
    }
} 