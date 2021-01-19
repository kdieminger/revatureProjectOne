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

    async getUsersBySupervisor(supervisor: string): Promise<User[]> {
        return await this.doc.scan({TableName: 'users'}).promise().then((results) => {
            const users: User[] = [];
            if(results && results.Items){
                results.Items.forEach((user) => {
                    if(user.supervisor === supervisor){
                        users.push(user as User);
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

    async getUsersByDept(dept: string): Promise<User[]> {
        logger.debug(dept);
        return await this.doc.scan({TableName: 'users'}).promise().then((results) => {
            const users: User[] = [];
            if(results && results.Items){
                results.Items.forEach((user) => {
                    if(user.department === dept){
                        users.push(user as User);
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

    async updateUser(user: User): Promise<boolean>{
        const params = {
            TableName: 'users',
            Key: {
                'username': user.username
            },
            UpdateExpression: 'set #n = :numReqs, #a = :availableReim, #r = :numRFI',
            ExpressionAttributeNames: {
                '#n': 'numReqs',
                '#a': 'availableReim',
                '#r': 'numRFI'
            },
            ExpressionAttributeValues: {
                ':numReqs': user.numReqs,
                ':availableReim': user.availableReim,
                ':numRFI': user.numRFI
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