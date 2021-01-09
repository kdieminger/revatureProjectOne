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
}

const requestService = new RequestService();
export default requestService;