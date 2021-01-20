import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import requestService from '../request/request.service';
import { RFI } from '../request/request';

AWS.config.update({ region: 'us-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10'});

const removeUsers = {
    TableName: 'users'
}

const removeRequests = {
    TableName: 'requests'
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
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const requestSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'requestID',
            AttributeType: 'S'
        }
    ],
    KeySchema : [
        {
            AttributeName: 'requestID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'requests',
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

ddb.deleteTable(removeRequests, function(err, data) {
    if (err){
        console.error('Unable to delete table. Error JSON: ', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(requestSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(() => {
                    populateRequestTable();
                }, 5000);
            }
        });
    }, 5000)
});

function populateUserTable(){
    userService.addUser({username: 'smccall', password: 'allison', role: 'Employee', supervisor: 'lmartin', department: 'dummy', numReqs: 1, availableReim: 1000, numRFI: 0}).then(()=>{});
    userService.addUser({username: 'lmartin', password: 'ariel', role: 'Supervisor', supervisor: 'aargent', department: 'dummy', numReqs: 1, availableReim: 1000, numRFI: 0}).then(() => {});
    userService.addUser({username: 'aargent', password: 'arrow', role: 'Department Head', supervisor: 'kyuki', department: 'dummy', numReqs: 0, availableReim: 1000, numRFI: 0}).then(() => {});
    userService.addUser({username: 'kyuki', password: 'kitsune', role: 'BenCo', supervisor: 'mtate', department: 'dummy', numReqs: 0, availableReim: 1000, numRFI: 0}).then(() => {});
}

function populateRequestTable(){
    requestService.addRequest({requestID: 'smccall01', username: 'smccall',type: 'University Course', date: 'Jan 15th',time: '1:00pm',location: 'Clemson University',description: 'Learn a thing',cost: 100,justification: 'I would like this',projectedRe: 80, approval: [], appStatus: 'pending', notes: '', reqFI: new RFI('','','',''), grade: ''}).then(() => {});
    requestService.addRequest({requestID: 'lmartin01', username: 'lmartin',type: '', date: '',time: '',location: '',description: '',cost: 150,justification: '',projectedRe: 0, approval: [], appStatus: 'pending', notes: '', reqFI: new RFI('','','',''), grade: ''}).then(() => {});
}