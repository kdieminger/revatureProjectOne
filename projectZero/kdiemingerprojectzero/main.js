import readline from 'readline'

export const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userLogin(){
    read.question('Username:', (username) => {
        read.question('Password:', (password) => {
            
        }
    }
} 