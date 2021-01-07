import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import restaurantService from '../restaurant/restaurant.service';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}
const removeRest = {
    TableName: 'restaurants'
}

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
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const restSchema = {
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
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'restaurants',
    StreamSpecification: {
        StreamEnabled: false
    }
};

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
                }, 10000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({name: 'Bob', password: '1234', money: 10, role: 'Customer'}).then(()=>{});
    userService.addUser({name: 'Richard', password: 'pass', money: 10, role: 'Customer'}).then(()=>{});
    userService.addUser({name: 'Cynthia', password: 'pass', money: 10, role: 'Employee'}).then(()=>{});
}

ddb.deleteTable(removeRest, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(restSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateRestTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateRestTable() {
    restaurantService.addRestaurant({
        name: 'McDonalds',
        chef: 'Ronald',
        rating: 4,
        hours: [],
        img: 'https://corporate.mcdonalds.com/is/image//content/dam/gwscorp/nfl/newsroom/media_assets/The%20Token.png?$MEDIA_LISTING_MODAL_IMAGE$',
        menu: [{name: 'McDouble', price: 1}],
        type: 'American'
    });
    restaurantService.addRestaurant(
        {name: 'Wendys', chef: 'Wendy', rating: 3.5, hours: [], img:'https://img.foodlogistics.com/files/base/acbm/fl/image/2015/08/wendys_co_logo.55d5ec69667bb.png?auto=format&fit=max&w=1200', menu: [{name: 'Fries', price: 2}], type: 'American'});
    restaurantService.addRestaurant(
        {name: 'The Krusty Krab', chef: 'SpongeBob', rating: 5, img:'https://thefreshtoast.com/wp-content/uploads/2017/01/krusty-krab-1-1068x580.jpg', hours: [], menu: [{name: 'Krabby Patty', price: 5},{name: 'Krabby Patty with Cheese', price: 6}], type: 'Seafood'});
    restaurantService.addRestaurant(
        {name: 'Central Perk', chef: 'Gunther', rating: 10, img:'https://i.etsystatic.com/13571447/r/il/b9f2e8/2071038622/il_570xN.2071038622_j4vn.jpg', hours: [], menu: [{name: 'Richael\'s Coffee', price: 5}], type: 'Coffee'});
}