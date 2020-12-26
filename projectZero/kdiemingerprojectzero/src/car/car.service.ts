import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Car } from './car';

export class CarService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async addCar(car: Car): Promise<boolean> {
        const params = {
            TableName: 'carlot',
            Item: car,
            ConditionExpression: '#carID <> :carID',
            ExpressionAttributeNames: {
                '#carID': 'carID'
            },
            ExpressionAttributeValues: {
                ':carID': car.carID
            }
        };
        return await this.doc.put(params).promise().then(() => {
            logger.info('successfully created car');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async removeCar(carID: string): Promise<boolean> {
        const params = {
            TableName: "carlot",
            Key: {
                carID: carID
            }
        };
        return await this.doc.delete(params).promise().then(() => {
            logger.info('succesffully deleted car');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async getCars(): Promise<Car[]> {
        return await this.doc.scan({ 'TableName': 'carlot' }).promise().then((result) => {
            return result.Items as Car[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }
}

const carService = new CarService();
export default carService;