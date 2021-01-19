export class AppRequest {
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
    approval: boolean[] = [];
    appStatus: string ='';
    notes: string = '';
    reqFI: RFI = new RFI();
}

export class RFI {
    question: string = '';
    answer: string = '';
    user: string = '';
    from: string = '';
}