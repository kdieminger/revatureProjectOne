import fs from 'fs';
import logger from './log.js';

export let inventory = [];

export function loadInventory() {
    fs.readFile('inventory.json', (err, data)=> {
        if(err) {
            logger.error(err);
        } else {
            inventory = JSON.parse(data);
        }
    });
}

export function restockItem(itemName){
    logger.trace(`restock called with parameter ${JSON.stringify(item)}`);
    let selection = inventory.find(item => item.item === itemName); // function(item){return item.item === itemName}
    selection.stock++;
}

export function getByPosition(position) {
    return inventory.find(item => item.position === position);
}

export function itemString(item) {
    logger.trace(`itemString called with parameter ${JSON.stringify(item)}`);
    return item.position + '. ' + item.item + '- $' + item.price;
}

export function displayContents() {
    logger.trace('displayContents called!');
    inventory.forEach((item) => {console.log(itemString(item))});
}

export function saveInventory() {
    logger.trace('saveInventory called!');
    let i = JSON.stringify(inventory);
    fs.writeFileSync('inventory.json', i);
}