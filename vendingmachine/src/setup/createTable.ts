import * as AWS from 'aws-sdk';
import inventoryService from '../inventory/inventory.service';
import userService from '../user/user.service';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Delete the table if it exists
const removeInventory = {
    TableName: 'inventory_items'
};

const removeUsers = {
    TableName: 'users'
}

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

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};


ddb.deleteTable(removeInventory, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(inventoryTableSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateInventoryTable();
                }, 5000);
            }
        });
    }, 5000);
});

ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 5000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({name: 'Bob', password: '1234', money: 10, role: 'Customer'}).then(()=>{});
    userService.addUser({name: 'Richard', password: 'pass', money: 10, role: 'Customer'}).then(()=>{});
    userService.addUser({name: 'Cynthia', password: 'pass', money: 10, role: 'Employee'}).then(()=>{});
}

function populateInventoryTable() {
    inventoryService.addItem({position: 'S76', item: 'Snickers', price: 5.6, stock: 7}).then(()=>{});
    inventoryService.addItem({position: 'A54', item: 'Water', price: 2, stock: 1}).then(()=>{});
    inventoryService.addItem({position: 'B63', item: 'Gatorade', price: 3.5, stock: 4}).then(()=>{});
    inventoryService.addItem({position: 'T3', item: 'Twix', price: 1.2, stock: 23}).then(()=>{});
    inventoryService.addItem({position: 'G78', item: 'Mars', price: 3.2, stock: 3}).then(()=>{});
}