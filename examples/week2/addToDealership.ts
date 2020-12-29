import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface Car {
    owner: string;
    car_id: number;
    make: string;
    model: string;
}

async function addItem(item: Car): Promise<boolean>{
    let params = {
        TableName: 'dealership',
        Item: item
    };

    

    return await docClient.put(params).promise().then((result) => {
        console.log(result);
        return true;
    }).catch((error) => {
        console.error(error);
        return false;
    })
}
let car: Car = {
    owner: 'dealer',
    car_id: 1,
    make: 'Kia',
    model: 'Rio'
};
addItem(car).then((result)=>{
    console.log(result);
});
car = {
    owner: 'dealer',
    car_id: 2,
    make: 'Kia',
    model: 'Soul'
};

addItem(car).then((result)=>{
    console.log(result);
});
car = {
    owner: 'richard',
    car_id: 3,
    make: 'Kia',
    model: 'Forte'
};
addItem(car).then((result)=>{
    console.log(result);
});
car = {
    owner: 'dealer',
    car_id: 5,
    make: 'Ford',
    model: 'Focus'
};
addItem(car).then((result)=>{
    console.log(result);
});
