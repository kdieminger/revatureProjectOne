import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Car } from './car';

class CarService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async addCar(car: Car): Promise<boolean> {
        const params = {
            TableName: 'car lot',
            Item: car,
            ConditionExpression: '#carID <> :carID',
            ExpressionAttributeNames: {
                '#carID': 'carID'
            },
            ExpressionAttributeValues: {
                ':carID': car.carID
            }
        };
        return await this.doc.put(params).promise().then((result) => {
            logger.info('successfully created car');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }
}

const carService = new CarService();
export default carService;