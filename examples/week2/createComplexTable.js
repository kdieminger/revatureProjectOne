"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
// Set the region
AWS.config.update({ region: 'us-west-2' });
// Create a DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var params = {
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
ddb.createTable(params, function (err, data) {
    if (err) {
        // log the error
        console.log("Error", err);
    }
    else {
        // celebrate, I guess
        console.log("Table Created", data);
    }
});
