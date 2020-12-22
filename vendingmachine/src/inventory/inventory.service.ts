import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Inventory } from './inventory';
import dynamo from '../dynamo/dynamo';
import logger from '../log';

class InventoryService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getItems(): Promise<Inventory[]> {
        return await this.doc.scan({'TableName':'inventory_items'}).promise().then((result) => {
            return result.Items as Inventory[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }
    async addItem(inventory: Inventory): Promise<boolean>{
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'inventory_items',
            // Item - the object we are sending
            Item: inventory
        };
    
        /*
            The await is just returning all of that as another promise
                to be resolved by a different layer of the application.
            put function takes in our params, and PUTs (http method) the item in the db.
            promise function returns a promise representation of the request
        */
        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }
}

const inventoryService = new InventoryService();
export default inventoryService;