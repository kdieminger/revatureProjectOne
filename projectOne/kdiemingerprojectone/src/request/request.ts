import fs from 'fs';
import logger from '../log.js';
import { User } from '../user/user.js';
import userService from '../user/user.service.js';
import requestService from './request.service.js';

export class Request {
    constructor(public requestID: string, public username: string, public type: string, public date: string, public time: string, public location: string,
        public description: string, public cost: number, public justification: string, public projectedRe: number, public approval: boolean[], public appStatus: string) {
    };
}

export async function makeRequest(username: string, type: string, date: string, time: string, location: string, description: string, cost: number, just: string) {
    logger.info('makeRequest called');
    let typeOf: string;
    let reim: any = calcReimburse(type, cost);
    let reqID: string = '';
    await userService.getUser(username).then((user) => {
        if(user){
            user.numReqs++;
            reqID = username + user.numReqs;
            userService.updateUser(user);
        }
        else{
            logger.error('user does not exist');
            return null;
        }
    })
    switch (type) {
        case 'University Course':
            logger.info('Creating a request');
            typeOf = 'University Course';
            requestService.addRequest(new Request(reqID, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Seminar':
            logger.info('Creating a request');
            typeOf = 'Seminar';
            requestService.addRequest(new Request(reqID, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Certification Prep Course':
            logger.info('Creating a request');
            typeOf = 'Certification Preparation Course';
            requestService.addRequest(new Request(reqID, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Certification':
            logger.info('Creating a request');
            typeOf = 'Certification';
            requestService.addRequest(new Request(reqID, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Technical Training':
            logger.info('Technical Training');
            typeOf = 'Technical Training';
            requestService.addRequest(new Request(reqID, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        case 'Other':
            logger.info('Other');
            typeOf = 'Other';
            requestService.addRequest(new Request(reqID, username, typeOf, date, time, location, description, cost, just, reim, [], 'pending'));
            break;
        default:
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

// export async function supervisorRequest(supervisor: string){
//     console.log('supervisor: '+JSON.stringify(supervisor));
//     let userArr: string[]=[];
//     let reqArr: Request[] = [];
//     await userService.getUsersBySupervisor(supervisor).then((users) => {
//         userArr = users;
//     })
//     if(userArr.length !== 0){
//         userArr.forEach((user) => {
//             requestService.getRequestByName(user).then((requests) => {
//                 requests.forEach((ind) => {
//                     reqArr.push(ind);
//                 })
//             })
//         })
//         console.log(reqArr);
//         return reqArr;
//     } else {
//         return reqArr;
//     }

// }