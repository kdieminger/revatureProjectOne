import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Request } from './request';

class RequestService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }
    
    //gets a specific request by the requestID
    async getRequest(requestID: string): Promise<Request | null> {
        const params = {
            TableName: 'requests',
            Key: {
                'requestID': requestID
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.trace(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as Request;
            }
            else {
                return null;
            }
        })
    }

    async getRequestByName(username: string): Promise<Request[]> {
        return await this.doc.scan({'TableName': 'requests'}).promise().then((results) => {
            const requests: Request[] = [];
            if(results && results.Items) {
                results.Items.forEach((request) => {
                    if(request.username === username){
                        requests.push(request as Request);
                    }
                })
                return requests;
            } else {
                return [];
            }
        }).catch((err) => {
            logger.error(err);
            return [];
        })
    }

    //gets all the requests (not recommended)
    async getRequests(): Promise<Request[]>{
        return await this.doc.scan({ 'TableName': 'requests'}).promise().then((result) =>{
            return result.Items as Request[]; 
        }).catch((err) =>{
            logger.error(err);
            return [];
        });
    }

    //adds a request to the table
    async addRequest(request: Request): Promise<boolean> {
        logger.debug(request);
        const params = {
            TableName: 'requests',
            Item: request,
            ConditionExpression: '#requestID <> :requestID',
            ExpressionAttributeNames: {
                '#requestID': 'requestID'
            },
            ExpressionAttributeValues: {
                ':requestID': request.requestID
            }
        };
        return await this.doc.put(params).promise().then(() => {
            logger.info('successfully created a request');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async updateRequest(req: Request): Promise<boolean>{
        const params = {
            TableName: 'requests',
            Key: {
                'requestID': req.requestID
            },
            UpdateExpression: 'set #a = :approval, #s = :appStatus',
            ExpressionAttributeNames: {
                '#a': 'approval',
                '#s': 'appStatus'
            },
            ExpressionAttributeValues: {
                ':approval': req.approval,
                ':appStatus': req.appStatus
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

const requestService = new RequestService();
export default requestService;