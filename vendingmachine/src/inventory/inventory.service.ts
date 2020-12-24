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
        // Scan retrieves every record in the table. In very large tables, this can be very resource intensive
        return await this.doc.scan({'TableName':'inventory_items'}).promise().then((result) => {
            return result.Items as Inventory[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async getItemsForDisplay(): Promise<Inventory[]> {
        // Scan retrieves every record in the table. In very large tables, this can be very resource intensive
        const params = {
            'TableName':'inventory_items',
            ProjectionExpression: '#item, #pos, #price',
            ExpressionAttributeNames: {
                '#item': 'item',
                '#pos': 'position',
                '#price': 'price'
            }
        }
        return await this.doc.scan(params).promise().then((result) => {
            logger.debug(result.Items);
            return result.Items as Inventory[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async getItemByPosition(position: string): Promise<Inventory|null> {
        // Query allows us to query along a partition key.
        const params = {
            TableName: 'inventory_items',
            KeyConditionExpression: '#pos = :position',
            ExpressionAttributeNames: {
                '#pos': 'position'
            },
            ExpressionAttributeValues: {
                ':position': position
            }
        };
        return await this.doc.query(params).promise().then((data) => {
            if(data && data.Items && data.Items.length)
                return data.Items[0] as Inventory;
            else
                return null;
        })
    }

    async getItemByPositionSimple(position: string): Promise<Inventory|null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'inventory_items',
            Key: {
                'position': position
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if(data && data.Item)
                return data.Item as Inventory;
            else
                return null;
        })
    }

    async updateItem(inventory: Inventory): Promise<boolean> {
        const params = {
            TableName: 'inventory_items',
            Key: {
                'position': inventory.position
            },
            UpdateExpression: 'set stock = :s, price = :p',
            ExpressionAttributeValues: {
                ':p': inventory.price,
                ':s': inventory.stock
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data)=> {
            console.log(data);
            return true;
        }).catch(error=> {
            logger.error(error);
            return false;
        })
    }

    async addItem(inventory: Inventory): Promise<boolean> {
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'inventory_items',
            // Item - the object we are sending
            Item: inventory,
            ConditionExpression: '#p <> :pos',
            ExpressionAttributeNames: {
                '#p': 'position'
            },
            ExpressionAttributeValues: {
                ':pos': inventory.position
            }
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
Object.freeze(inventoryService);
export default inventoryService;