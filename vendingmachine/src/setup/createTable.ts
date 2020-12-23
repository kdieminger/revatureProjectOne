import * as AWS from 'aws-sdk';
import inventoryService from '../inventory/inventory.service';
import {Inventory} from '../inventory/inventory';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Delete the table if it exists
const removeInventory = {
    TableName: "inventory_items"
};

const inventoryTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'position',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'position',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'inventory_items',
    StreamSpecification: {
        StreamEnabled: false
    }
};


ddb.deleteTable(removeInventory, function (err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(inventoryTableSchema, (err, data) => {
            if (err) {
                // log the error
                console.log("Error", err);
                populateTable();
            } else {
                // celebrate, I guess
                console.log("Table Created", data);
            }
        });
    }, 1000);
});
    
function populateTable(){
    inventoryService.addItem({position: 'S76', item: 'Snickers', price: 5.6, stock: 7});
    inventoryService.addItem({position: 'A54', item: 'Water', price: 2, stock: 1});
    inventoryService.addItem({position: 'B63', item: 'Gatorade', price: 3.5, stock: 4});
    inventoryService.addItem({position: 'T3', item: 'Twix', price: 1.2, stock: 23});
    inventoryService.addItem({position: 'G78', item: 'Mars', price: 3.2, stock: 3});
}