// Imports should ideally be done at the top of the file, but don't necessarily have to.
const readline = require('readline');
// const readline declares a variable to contain the 'readline' module from node, which the require function is loading.
// createInterface allows us to ask questions and get answers from the user.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// comments - Single line comment
/*
    Multi-line comment
    Comments are often used for:
        Describing what the code does
        Explaining part of the code
        Leaving a todo for us to come back to later
*/
console.log('Hello World');

/*
    List of features:
        Contains products.
        Displays info on products.
        Accepts selection of object.
        Accepts payment for object.
        Dispenses object.
        Be able to be restocked.
*/

let inventory = ['Pepsi Zero', 'Cookies', 'Chocolate Chips', 'Snickers', 'Nuts', 'Chips', 'Water'];
let object = {'item': 'Gatorade', 'position': 'Z67', 'price': 5 }

console.log(object);
console.log(object.position+'. '+object.item+'- $'+object.price);
console.log(inventory);

for(let i = 0; i < inventory.length; i++) {
    console.log(i + '. ' + inventory[i]);
}
inventory = [
    {'item': 'Gatorade', 'position': 'Z67', 'price': 5 },
    {'item': 'Pepsi Zero', 'position': 'Z68', 'price': 5 },
    {'item': 'Water', 'position': 'Z69', 'price': 8 },
    {'item': 'Chocolate chips', 'position': 'A23', 'price': 2 },
    {'item': 'Snickers', 'position': 'B37', 'price': 3 },
    {'item': 'Chips', 'position': 'S7', 'price': 4 }
]
function itemString(item) {
    return item.position+'. '+item.item+'- $'+item.price;
}
console.log(inventory);
//for(index in inventory) { // Use for-in loops when you need an index.
//    console.log(index);
//    console.log(itemString(inventory[index]))
//}
for(item of inventory) { // Use for-of loops when you need just the item
    console.log(itemString(item));
}

// console.log(inventory[0]);

rl.question('Which one do you want? ', (answer) => {
    // TODO: Sanitize inputs
    let selection;
    for(item of inventory) {
        if(item.position == answer) {
            selection = item;
        }
    }
    if(selection) {
        console.log(selection);
    } else {
        console.log("Incorrect, try again.") // JavaScript performs a process called semi-colon injection.
        /*
        In other words, JS will put semi-colons in for you.

        Probably don't trust it to do that?
        */
    }
    // console.log(inventory[answer]);
    process.exit();
});