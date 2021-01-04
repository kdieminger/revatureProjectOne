import axios from 'axios';
import { RestaurantType } from './restaurant.types';

class RestaurantService {
    private URI: string;
    constructor() {
        this.URI = 'http://localhost:3000/restaurants';
    }

    getRestaurants(): Promise<RestaurantType []> {
        return axios.get(this.URI).then(result => result.data);
    }
}

export default new RestaurantService();