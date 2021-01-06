import fs from 'fs';
import logger from '../log.js';
import userService from './user.service.js';

//Class declaration
export class User{
  constructor(public username: string, public password: string, public role: string){
  };
}

//registers a user
export async function registerUser(username: string, password: string, role: string): Promise<User | null> {
  logger.info('registerUser called');
  return await userService.getUser(username).then((user) => {
    if(user && user.username === username){
      logger.error('username already exists');
      return null;
    }
    else {
      let add = new User(username, password, role)
      userService.addUser(add);
      console.log(`Welcome new ${role}!`);
      return add;
    }
  })
}

//logs user in
export async function userLogin(name: string, pass: string): Promise<User | null> {
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
