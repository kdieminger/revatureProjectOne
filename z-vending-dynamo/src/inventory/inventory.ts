import inventoryService from './inventory.service';
import logger from '../log';

export interface Inventory{
    item: string;
    position: string;
    price: number;
    stock?: number;
}

export function updateItem(item: Inventory, callback: Function) {
    logger.trace(`update called with parameter ${JSON.stringify(item)}`);
    inventoryService.updateItem(item).then((bool)=>{
        callback();
    });
}

export function getByPosition(position: string, success: Function, cont: Function, operation?:Function) {
    inventoryService.getItemByPositionSimple(position).then((selection) => {
        if (selection) {
            if(operation) {
                operation(selection);
            }
            success(selection as Inventory, cont);
        } else {
            console.log('Incorrect, try again.');
            cont();
        }
    })
}

export function itemString(item: Inventory) {
    logger.trace(`itemString called with parameter ${JSON.stringify(item)}`);
    return item.position + '. ' + item.item + '- $' + item.price;
}

export function displayContents(callback: Function) {
    logger.trace('displayContents called!');
    inventoryService.getItemsForDisplay().then((items)=>{
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