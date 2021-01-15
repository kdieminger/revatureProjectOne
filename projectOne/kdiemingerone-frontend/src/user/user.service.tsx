import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/users';
    }
    getLogin(): Promise<User> {
        // withCredentials sends our cookies with the request.
        return axios.get(this.URI, {withCredentials: true}).then(result=>{
            console.log(result);
            return result.data
        });
    }

    login(user: User): Promise<User> {
        return axios.post(this.URI, user, {withCredentials: true}).then(result => result.data);
    }
    logout(): Promise<null> {
        return axios.delete(this.URI, {withCredentials: true}).then(result => null);
    }
    getUser(): Promise<User> {
        return axios.get(this.URI).then(result => result.data);
    }
    getBySupervisor(username: string): Promise<string[]> {
        return axios.get(this.URI+'/'+username).then(result => result.data);
    }
    getReqByUsers(user: string): Promise<Request[]> {
        return axios.get(this.URI + '/supervisor/requests').then((results) => results.data);
    }
}

export default new UserService();