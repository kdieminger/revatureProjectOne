import fs from 'fs';
import logger from './log';

export interface Inventory{
    item: string;
    position: string;
    price: number;
    stock: number;
}

export let inventory: Inventory[] = [];

export function loadInventory() {
    fs.readFile('inventory.json', (err, data)=> {
        if(err) {
            logger.error(err);
        } else {
            inventory = JSON.parse(data.toString());
        }
    });
}

export function restockItem(itemName: string){
    logger.trace(`restock called with parameter ${JSON.stringify(itemName)}`);
    let selection = inventory.find(item => item.item === itemName); // function(item){return item.item === itemName}
    if(selection) {
        selection.stock++;
    } else {
        console.log('Item does not exist.');
    }
}

export function getByPosition(position: string) {
    return inventory.find(item => item.position === position);
}

export function itemString(item: Inventory) {
    logger.trace(`itemString called with parameter ${JSON.stringify(item)}`);
    return item.position + '. ' + item.item + '- $' + item.price;
}

export function displayContents() {
    logger.trace('displayContents called!');
    inventory.forEach((item) => {console.log(itemString(item));});
}

export function saveInventory() {
    logger.trace('saveInventory called!');
    let i = JSON.stringify(inventory);
    fs.writeFileSync('inventory.json', i);
}