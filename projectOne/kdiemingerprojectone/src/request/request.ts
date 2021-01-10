import { Number } from 'aws-sdk/clients/iot';
import fs from 'fs';
import logger from '../log.js';
import requestService from './request.service.js';

export class Request {
    constructor(public requestID: string, public username: string, public type: string, public date: string, public time: string, public location: string,
        public description: string, public cost: number, public justification: string, public projectedRe: number, public approval: string[]) {
    };
}

export function makeRequest(username: string, type: number, date: string, time: string, location: string, description: string, cost: number, just: string){
    logger.info('makeRequest called');
    let typeOf: string;
    let reim: any = calcReimburse(type, cost);
    switch (type) {
        case 0:
            logger.info('Creating a request');
            typeOf = 'University Course';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, []));
        case 1:
            logger.info('Creating a request');
            typeOf = 'Seminar';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, []));
        case 2:
            logger.info('Creating a request');
            typeOf = 'Certification Preparation Course';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, []));
        case 3:
            logger.info('Creating a request');
            typeOf = 'Certification';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, []));
        case 4:
            logger.info('Technical Training');
            typeOf = 'Technical Training';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, []));
        case 4:
            logger.info('Technical Training');
            typeOf = 'Other';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, []));
    }
}

function calcReimburse(type: number, cost: number) {
    let reim: number;
    switch (type) {
        case 0:
            reim = cost * 0.8;
            return reim;
        case 1:
            reim = cost * 0.6;
            return reim;
        case 2:
            reim = cost * 0.75;
            return reim;
        case 3:
            reim = cost;
            return reim;
        case 4:
            reim = cost * 0.9;
            return reim;
        case 5:
            reim = cost * 0.3;
            return reim;
        default:
            logger.error('invalid input');
            break;
    }
}