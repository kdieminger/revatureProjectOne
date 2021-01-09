import axios from 'axios';
import { Request } from './request';

class RestaurantService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/restaurants';
    }

    getRestaurants(): Promise<Request []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getRestaurant(id: string): Promise<Request> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addRestaurant(r: Request): Promise<null> {
        return axios.post(this.URI, r).then(result => null);
    }
}

export default new RestaurantService();