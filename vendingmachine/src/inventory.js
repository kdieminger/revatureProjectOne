import fs from 'fs';

export let inventory = [];

export function loadInventory() {
    fs.readFile('inventory.json', (err, data)=> {
        if(err) {
            console.log(err);
        } else {
            inventory = JSON.parse(data);
        }
    });
}

export function restockItem(itemName){
    let selection = inventory.find(item => item.item === itemName); // function(item){return item.item === itemName}
    selection.stock++;
}

export function getByPosition(position) {
    return inventory.find(item => item.position === position);
}

export function itemString(item) {
    return item.position + '. ' + item.item + '- $' + item.price;
}

export function displayContents() {
    inventory.forEach((item) => {console.log(itemString(item))});
}

export function saveInventory() {
    let i = JSON.stringify(inventory);
    fs.writeFileSync('inventory.json', i);
}