import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }
    
    //gets a specific user by username
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

    //gets all the users in the table
    async getUsers(): Promise<User[]>{
        return await this.doc.scan({ 'TableName': 'users'}).promise().then((result) =>{
            return result.Items as User[]; 
        }).catch((err) =>{
            logger.error(err);
            return [];
        });
    }

    //adds a user to the table
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
        return await this.doc.put(params).promise().then(() => {
            logger.info('successfully created a user');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async getUsersBySupervisor(supervisor: string): Promise<string[]> {
        return await this.doc.scan({TableName: 'users'}).promise().then((results) => {
            const users: string[] = [];
            if(results && results.Items){
                results.Items.forEach((user) => {
                    if(user.supervisor === supervisor){
                        users.push(user.username);
                    }
                })
                return users;
            } else {
                return [];
            }
        }).catch((err) => {
            logger.error(err);
            return [];
        })
    }
}

const userService = new UserService();
export default userService;