import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Car } from './car';

export class CarService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }
    
    //adds car to table
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
            logger.info('successfully created a car');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    //removes car from table
    async removeCar(carID: string): Promise<boolean> {
        const params = {
            TableName: 'carlot',
            Key: {
                carID: carID
            }
        };
        return await this.doc.delete(params).promise().then(() => {
            logger.info('succesfully deleted car');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    //gets all the cars in the table
    async getCars(): Promise<Car[]> {
        return await this.doc.scan({ 'TableName': 'carlot' }).promise().then((result) => {
            return result.Items as Car[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    //gets a specific car by the carID
    async getCarByID(carID: string): Promise<Car|null> {
        const params = {
            TableName: 'carlot',
            Key: {
                'carID': carID
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if(data && data.Item){
                return data.Item as Car;
            }
            else{
                return null;
            }
        })
    }

    //updates the car - can only update the owner
    async updateCarOwner(car: Car): Promise<boolean>{
        const params = {
            TableName: 'carlot',
            Key: {
                'carID': car.carID
            },
            UpdateExpression: 'set #o = :user',
            ExpressionAttributeNames: {
                '#o': 'owner'
            },
            ExpressionAttributeValues: {
                ':user': car.owner
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

const carService = new CarService();
export default carService;