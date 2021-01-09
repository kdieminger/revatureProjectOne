export class Request {
    requestID: string = '';
    username: string = '';
    type: string = '';
    date: string = '';
    time: string = '';
    location: string = '';
    description: string = '';
    cost: number = 0;
    justification: string = '';
    projectedRe: number = 0;
    approval: string[] = [];
    RFI: string = '';
    constructor() {};
}