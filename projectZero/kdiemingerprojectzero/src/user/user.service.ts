import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }
    
    async getUser(username: string): Promise<User | null> {
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.trace(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as User;
            }
            else {
                return null;
            }
        })
    }

    async getUsers(): Promise<User[]>{
        return await this.doc.scan({ 'TableName': 'users'}).promise().then((result) =>{
            return result.Items as User[]; 
        }).catch((err) =>{
            logger.error(err);
            return [];
        });
    }
    
    async addUser(user: User): Promise<boolean> {
        const params = {
            TableName: 'users',
            Item: user,
            ConditionExpression: '#username <> :username',
            ExpressionAttributeNames: {
                '#username': 'username'
            },
            ExpressionAttributeValues: {
                ':username': user.username
            }
        };
        return await this.doc.put(params).promise().then((result) => {
            logger.info('successfully created a user');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }
    async updateUser(user: User): Promise<boolean>{
        const params = {
            TableName: 'users',
            Key: {
                'username': user.username
            },
            UpdateExpression: 'set #c = :cars, #o = :offers, #p = :payment',
            ExpressionAttributeNames: {
                '#c': 'ownedCars',
                '#o': 'pendingOffers',
                '#p': 'ongoingPay'
            },
            ExpressionAttributeValues: {
                ':cars': user.ownedCars,
                ':offers': user.pendingOffers,
                ':payment': user.ongoingPay
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.debug(data);
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }
}

const userService = new UserService();
export default userService;