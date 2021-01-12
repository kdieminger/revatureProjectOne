import fs from 'fs';
import logger from '../log.js';
import { User } from '../user/user.js';
import userService from '../user/user.service.js';
import requestService from './request.service.js';

export class Request {
    constructor(public requestID: string, public username: string, public type: string, public date: string, public time: string, public location: string,
        public description: string, public cost: number, public justification: string, public projectedRe: number, public approval: string[], public status: string) {
    };
}

export function makeRequest(username: string, type: string, date: string, time: string, location: string, description: string, cost: number, just: string){
    logger.info('makeRequest called');
    let typeOf: string;
    let reim: any = calcReimburse(type, cost);
    switch (type) {
        case 'University Course':
            logger.info('Creating a request');
            typeOf = 'University Course';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, [],'pending'));
            break;
        case 'Seminar':
            logger.info('Creating a request');
            typeOf = 'Seminar';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Certification Preparation Course':
            logger.info('Creating a request');
            typeOf = 'Certification Preparation Course';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Certification':
            logger.info('Creating a request');
            typeOf = 'Certification';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Technical Training':
            logger.info('Technical Training');
            typeOf = 'Technical Training';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Other':
            logger.info('Other');
            typeOf = 'Other';
            requestService.addRequest(new Request(username, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        default :
            logger.error('invalid input');
            break;
    }
}

function calcReimburse(type: string, cost: number) {
    let reim: number;
    switch (type) {
        case 'University Course':
            reim = cost * 0.8;
            return reim;
        case 'Seminar':
            reim = cost * 0.6;
            return reim;
        case 'Certification Preparation Course':
            reim = cost * 0.75;
            return reim;
        case 'Certification':
            reim = cost;
            return reim;
        case 'Technical Training':
            reim = cost * 0.9;
            return reim;
        case 'Other':
            reim = cost * 0.3;
            return reim;
        default:
            logger.error('invalid input');
            break;
    }
}

export async function supervisorRequest(supervisor: string){
    console.log(supervisor);
    let requests: Request[] = [];
    return await userService.getUsersBySupervisor(supervisor).then((results) => {
        console.log(results);
        if(results){
            results.forEach((username) => {
                requestService.getRequestByName(username).then((result) => {
                    result.forEach((req) => {
                        requests.push(req);
                    })
                })
            })
            console.log(requests);
            return requests;
        } else {
            logger.error('results are empty');
            return [];
        }
    });
    
}