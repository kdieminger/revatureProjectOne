import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Restaurant, Food, Hours } from './restaurant';

class RestaurantService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getRestaurants(): Promise<Restaurant[]> {
        const params = {
            TableName: 'restaurants'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Restaurant[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async addRestaurant(rest: Restaurant): Promise<boolean> {
        const datayorb = {...rest};
        delete datayorb.eta;
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'restaurants',
            // Item - the object we are sending
            Item: datayorb,
            ConditionExpression: '#name <> :name',
            ExpressionAttributeNames: {
                '#name': 'name',
            },
            ExpressionAttributeValues: {
                ':name': datayorb.name,
            }
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }
}

const restaurantService = new RestaurantService();
export default restaurantService;
