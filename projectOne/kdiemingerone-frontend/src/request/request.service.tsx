import axios from 'axios';
import { Request } from './request';

class RequestService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/request';
    }

    getRequests(): Promise<Request []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getRequest(id: string): Promise<Request> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addRequest(r: Request): Promise<null> {
        return axios.post(this.URI, r).then(result => null);
    }
}

export default new RequestService();