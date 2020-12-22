import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface Inventory{
    item: string;
    position: string;
    price: number;
    stock: number;
}

async function addItem(item: Inventory): Promise<boolean>{
    let params = {
        TableName: 'inventory_items',
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

addItem({position: 'S76', item: 'Snickers', price: 5.6, stock: 7}).then((result)=>{
    console.log(result);
});
console.log('blocking?')