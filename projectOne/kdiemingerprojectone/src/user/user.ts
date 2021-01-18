import fs from 'fs';
import logger from '../log.js';
import userService from './user.service.js';

//Class declaration
export class User{
  constructor(public username: string, public password: string, public role: string, public supervisor: string,
    public department: string, public numReqs: number, public availableReim: number, public numRFI: number){
  };
}

//registers a user
export async function register(username: string, password: string, role: string, supervisor: string, department: string): Promise<User | null> {
  logger.info('registerUser called');
  return await userService.getUser(username).then((user) => {
    if(user && user.username === username){
      logger.error('username already exists');
      return null;
    }
    else {
      let add = new User(username, password, role, supervisor, department,0, 1000, 0);
      userService.addUser(add);
      console.log(`Welcome new ${role}!`);
      return add;
    }
  })
}

//logs user in
export async function login(name: string, pass: string): Promise<User | null> {
  logger.trace(`user login called with parameters ${name} and ${pass}`);
  return await userService.getUser(name).then((user) => {
    if (user && user.password === pass) {
      return user;
    }
    else {
      return null;
    }
  })
};
