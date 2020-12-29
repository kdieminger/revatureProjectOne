import * as AWS from 'aws-sdk';

// Set the region
AWS.config.update({region: 'us-west-2'});

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const params = {
    AttributeDefinitions: [
        {
            AttributeName: 'owner',
            AttributeType: 'S'
        },
        {
            AttributeName: 'make',
            AttributeType: 'S'
        },
        {
            AttributeName: 'model',
            AttributeType: 'S'
        },
        {
            AttributeName: 'car_id',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'owner',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'car_id',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'dealership',
    StreamSpecification: {
        StreamEnabled: false
    },
    LocalSecondaryIndexes: [
        {
            IndexName: 'MakeIndex',
            KeySchema: [
                {
                    AttributeName: 'owner',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'make',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            }
        }
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'MakeModelIndex',
            KeySchema: [
                {
                    AttributeName: 'make',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'model',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ]
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