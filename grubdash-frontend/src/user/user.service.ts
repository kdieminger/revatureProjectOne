import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/users';
    }

    login(user: User): Promise<User []> {
        return axios.post(this.URI, user).then(result => result.data);
    }
    logout(): Promise<null> {
        return axios.delete(this.URI).then(result => null);
    }
}

export default new UserService();