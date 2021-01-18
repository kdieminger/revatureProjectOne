import axios from 'axios';
import { AppRequest } from '../request/request';
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
    getUser(user: string): Promise<User> {
        return axios.get(this.URI+'/'+user).then(result => result.data);
    }
    getUsers(): Promise<User[]> {
        return axios.get(this.URI+'/all').then(result => result.data);
    }
    getBySupervisor(username: string): Promise<User[]> {
        return axios.get(this.URI+'/'+username).then(result => result.data);
    }
    getReqByUsers(user: string): Promise<AppRequest[]> {
        return axios.get(this.URI +'/' + user + '/requests').then((results) => results.data);
    }
    getByDepartment(dept: string): Promise<User[]> {
        console.log(dept);
        return axios.get(this.URI+'/'+dept+'/employees').then(result => result.data);
    }
    updateUser(u: User): Promise<null> {
        return axios.put(this.URI, u).then(result => null);
    }
}

export default new UserService();