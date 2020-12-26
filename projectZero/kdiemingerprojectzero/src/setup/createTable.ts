import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import carService from '../car/car.service';


AWS.config.update({ region: 'us-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10'});

const removeUsers = {
    TableName: 'users'
}

const removeCarLot = {
    TableName: 'car lot'
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
    TableName: 'car lot',
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
                }, 5000);
            }
        });
    }, 5000)
});


function populateUserTable(){
    userService.addUser({username: 'smccall', password: 'allison', role: 'Customer', ownedCars: [], pendingOffers: [], ongoingPay: []}).then(()=>{});
}

function populateCarTable(){

}