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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var user_service_1 = __importDefault(require("../user/user.service"));
var car_service_1 = __importDefault(require("../car/car.service"));
var offer_service_1 = __importDefault(require("../offer/offer.service"));
AWS.config.update({ region: 'us-west-2' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var removeUsers = {
    TableName: 'users'
};
var removeCarLot = {
    TableName: 'carlot'
};
var removeOffers = {
    TableName: 'offers'
};
var userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'username',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};
var carSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'carID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'carID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'carlot',
    StreamSpecification: {
        StreamEnabled: false
    }
};
var offerSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'offerID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'offerID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'offers',
    StreamSpecification: {
        StreamEnabled: false
    }
};
ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(userSchema, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(function () {
                    populateUserTable();
                }, 5000);
            }
        });
    }, 5000);
});
ddb.deleteTable(removeCarLot, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(carSchema, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(function () {
                    populateCarTable();
                }, 7000);
            }
        });
    }, 7000);
});
ddb.deleteTable(removeOffers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(offerSchema, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(function () {
                    populateOfferTable();
                }, 9000);
            }
        });
    }, 9000);
});
function populateUserTable() {
    user_service_1.default.addUser({ username: 'smccall', password: 'allison', role: 'Customer', ownedCars: [], pendingOffers: [], ongoingPay: [] }).then(function () { });
    user_service_1.default.addUser({ username: 'lmartin', password: 'ariel', role: 'Employee', ownedCars: [], pendingOffers: [], ongoingPay: [] }).then(function () { });
}
function populateCarTable() {
    car_service_1.default.addCar({ brand: 'Honda', color: 'Black', carID: 'H01', price: 20500, owner: 'dealer' }).then(function () { });
    car_service_1.default.addCar({ brand: 'Toyota', color: 'White', carID: 'T01', price: 17500, owner: 'dealer' }).then(function () { });
    car_service_1.default.addCar({ brand: 'Kia', color: 'Red', carID: 'K01', price: 15700, owner: 'dealer' }).then(function () { });
}
function populateOfferTable() {
    offer_service_1.default.addOffer({ carID: 'H01', downPay: 5000, months: 5, username: 'smccall', offerID: 'H01smccall' });
    offer_service_1.default.addOffer({ carID: 'K01', downPay: 5000, months: 5, username: 'lmartin', offerID: 'K01lmartin' });
}
