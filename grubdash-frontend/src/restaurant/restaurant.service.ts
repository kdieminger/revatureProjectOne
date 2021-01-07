import axios from 'axios';
import { Restaurant } from './restaurant';

class RestaurantService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/restaurants';
    }

    getRestaurants(): Promise<Restaurant []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getRestaurant(id: string): Promise<Restaurant> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addRestaurant(r: Restaurant): Promise<null> {
        return axios.post(this.URI, r).then(result => null);
    }

    deleteRestaurant(id: string): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id).then(result => null)
    }
}

export default new RestaurantService();