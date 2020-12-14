const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
    List of features:
        Contains products.
        Displays info on products.
        Accepts selection of object.
        Accepts payment for object.
        Dispenses object.
        Be able to be restocked.
*/

let inventory = [
    { 'item': 'Gatorade', 'position': 'Z67', 'price': 5, 'stock': 5 },
    { 'item': 'Pepsi Zero', 'position': 'Z68', 'price': 5, 'stock': 5 },
    { 'item': 'Water', 'position': 'Z69', 'price': 8, 'stock': 5  },
    { 'item': 'Chocolate chips', 'position': 'A23', 'price': 2, 'stock': 5  },
    { 'item': 'Snickers', 'position': 'B37', 'price': 3, 'stock': 5  },
    { 'item': 'Chips', 'position': 'S7', 'price': 4, 'stock': 5  }
]
function itemString(item) {
    return item.position + '. ' + item.item + '- $' + item.price;
}

function displayContents() {
    for (item of inventory) { // Use for-of loops when you need just the item
        console.log(itemString(item));
    }
    start();
}

function makeSelection() {
    rl.question('Which one do you want? ', (answer) => {
        // TODO: Sanitize inputs
        let selection;
        for (item of inventory) {
            if (item.position == answer) {
                selection = item;
            }
        }
        if (selection) {
            console.log(selection);
            obtainPayment(selection);
        } else {
            console.log("Incorrect, try again.");
            start();
        }
    });
}

function obtainPayment(selection) {
    console.log(`Remit payment of $${selection.price}.`); // Template literal
    // ${} <- Expression: Executes JS code inside of a template literal.
    rl.question('Accept? (y/n)', function(answer) {
        if(answer == 'y') {
            dispenseProduct(selection);
        } else {
            start();
        }
    });
}

function dispenseProduct(selection) {
    if(selection.stock > 0) {
        console.log(`Here is your ${selection.item}.`)
        selection.stock--;
        start();
    } else {
        console.log(`Not enough ${selection.item}. Returning $${selection.price}.`);
        start();
    }
}

function restock() {
    rl.question('Restock which? ', (answer) => {
        selection = inventory.find(function(item) { 
            return item.position == answer
        });
        if (selection) {
            console.log(`Adding 1 ${selection.item}`);
            selection.stock++;
        } else {
            console.log("Incorrect, try again.");
            start();
        }
    });
}

function exit() {
    process.exit();
}

function start() {
    rl.question(
        `What do you want to do?
        1. Display Contents
        2. Make selection
        3. Restock
        q. Exit\n`,
        function (answer) {
            switch(answer) { 
                case '1': displayContents(); break;
                case '2': makeSelection(); break;
                case '3': restock(); break;
                case 'q': exit(); break;
                default: start();
            }
    });
}

start();