import * as AWS from 'aws-sdk';

// Set the region
AWS.config.update({region: 'us-west-2'});

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const params = {
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

ddb.createTable(params, (err, data)=> {
    if(err) {
        // log the error
        console.log("Error", err);
    } else {
        // celebrate, I guess
        console.log("Table Created", data);
    }
});