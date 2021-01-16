import axios from 'axios';
import { AppRequest } from './request';

class RequestService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/requests';
    }

    getRequests(): Promise<AppRequest []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getRequest(id: string): Promise<AppRequest> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addRequest(r: AppRequest): Promise<null> {
        return axios.post(this.URI, r).then(result => null);
    }
    updateRequest(r: AppRequest): Promise<null> {
        return axios.put(this.URI, r).then(result => null);
    }
}

export default new RequestService();