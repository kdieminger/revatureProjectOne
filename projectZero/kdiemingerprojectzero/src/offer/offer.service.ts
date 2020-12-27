import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Offer } from './offer';

export class OfferService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async addOffer(offer: Offer): Promise<boolean>{
        const params = {
            TableName: 'offers',
            Item: offer,
            ConditionExpression: '#offerID <> :offerID',
            ExpressionAttributeNames: {
                '#offerID': 'offerID'
            },
            ExpressionAttributeValues: {
                ':offerID': offer.offerID
            }
        };
        return await this.doc.put(params).promise().then(() => {
            logger.info('successfully created an offer');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async removeOffer(offerID: string): Promise<boolean>{
        const params = {
            TableName: 'offers',
            Key: {
                offerID: offerID
            }
        };
        return await this.doc.delete(params).promise().then(() => {
            logger.info('successfully deleted offer');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async getOffers(): Promise<Offer[]>{
        return await this.doc.scan({ 'TableName': 'offers'}).promise().then((result) =>{
            return result.Items as Offer[]; 
        }).catch((err) =>{
            logger.error(err);
            return [];
        });
    }

    async getOfferByID(offerID: string): Promise<Offer|null> {
        logger.debug(`getOfferByID called with param ${offerID}`);
        const params = {
            TableName: 'offers',
            Key: {
                'offerID': offerID
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if(data && data.Item){
                logger.trace(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as Offer;
            }
            else{
                return null;
            }
        })
    }
}

const offerService = new OfferService();
export default offerService;