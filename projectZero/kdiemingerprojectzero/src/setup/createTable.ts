import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import carService from '../car/car.service';
import offerService from '../offer/offer.service';


AWS.config.update({ region: 'us-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10'});

const removeUsers = {
    TableName: 'users'
}

const removeCarLot = {
    TableName: 'carlot'
}

const removeOffers = {
    TableName: 'offers'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S'
        }
    ],
    KeySchema : [
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

const carSchema = {
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

const offerSchema = {
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

ddb.deleteTable(removeUsers, function(err, data) {
    if (err){
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(() => {
                    populateUserTable();
                }, 5000);
            }
        });
    }, 5000)
});


ddb.deleteTable(removeCarLot, function(err, data){
    if(err) {
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(() => {
        ddb.createTable(carSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(() => {
                    populateCarTable();
                }, 7000);
            }
        });
    }, 7000)
});

ddb.deleteTable(removeOffers, function(err, data){
    if(err) {
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(offerSchema, (err, data) => {
            if(err){
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(() => {
                    populateOfferTable();
                }, 9000);
            }
        });
    }, 9000)
});

function populateUserTable(){
    userService.addUser({username: 'smccall', password: 'allison', role: 'Customer', ownedCars: [], pendingOffers: [], ongoingPay: []}).then(()=>{});
    userService.addUser({username: 'lmartin', password: 'ariel', role: 'Employee', ownedCars: [], pendingOffers:[], ongoingPay:[]}).then(() => {});
}

function populateCarTable(){
    carService.addCar({brand: 'Honda', color: 'Black', carID: 'H01', price: 20500, owner: 'dealer' }).then(() => {});
    carService.addCar({brand: 'Toyota', color: 'White', carID: 'T01', price: 17500, owner: 'dealer' }).then(() => {});
    carService.addCar({brand: 'Kia', color: 'Red', carID: 'K01', price: 15700, owner: 'dealer' }).then(() => {});
}

function populateOfferTable(){
    offerService.addOffer({carID: 'H01', downPay: 5000, months: 5, username: 'smccall', offerID: 'H01smccall'});
    offerService.addOffer({carID: 'K01', downPay: 5000, months: 5, username: 'lmartin', offerID: 'K01lmartin'})
}