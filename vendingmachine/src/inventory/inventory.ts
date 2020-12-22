import inventoryService from './inventory.service';
import logger from '../log';

export interface Inventory{
    item: string;
    position: string;
    price: number;
    stock: number;
}

export let inventory: Inventory[] = [];


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

export function displayContents(callback: Function) {
    logger.trace('displayContents called!');
    inventoryService.getItems().then((items)=>{
        items.forEach((item) => {console.log(itemString(item));});
        callback();
    })
}

export function createItem(item: Inventory, callback: Function) {
    logger.info('Adding item to db');
    inventoryService.addItem(item).then((res) => {
        logger.trace(res);
        callback();
    }).catch( (err)=> {
        logger.error(err);
        callback();
    });
}