import fs from 'fs';
import logger from '../log.js';
import { Car, Payment } from '../car/car.js';
import { Offer } from '../offer/offer.js';
import userService from './user.service.js';

//Class declaration
export class User{
  constructor(public username: string, public password: string, public role: string, public ownedCars: Array<Car>, public pendingOffers: Array<Offer>, public ongoingPay: Array<Payment>){
  };
}


//registers a user
export function registerUser(userN: string, passW: string, role: string, callback: Function){
  userService.addUser(new User(userN,passW,role, [],[],[])).then((res) => {
    logger.trace(res);
    callback();
  }).catch((err) => {
    logger.error(err);
    console.log('Error, this probably means that the username is already taken');
    callback();
  })
  if(role == 'Employee'){
    console.log('Welcome new employee!');
  }
  else{
    console.log('Welcome new customer!');
  }
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


export function viewOwnedCars(username: string, callback: Function) {
  logger.info('viewOwnedCars called');
  userService.getUser(username).then((user) => {
    if(user){
      let view = user.ownedCars;
      for(let i = 0; i < view.length; i++){
        console.log(view[i]);
      }
    }
    else{
      logger.error('user is undefined');
    }
  });
  callback();
}

export function viewOwnPayments(username: string, callback: Function){
  logger.info('viewOwnPayments called');
  userService.getUser(username).then((user) => {
    if(user){
      let view = user.ongoingPay;
      for(let i = 0; i < view.length; i++){
        console.log(view[i]);
      }
    }
    else{
      logger.error('user is undefined');
    }
  });
  callback();
}

export function viewUserOffers(username: string, callback: Function){
  logger.info('viewUserOffers called');
  userService.getUser(username).then((user) => {
    if(user){
      let view = user.pendingOffers;
      for(let i = 0; i < view.length; i++){
        console.log(view[i]);
      }
    }
    else{
      logger.error('user is undefined');
    }
  });
  callback();
}

export function viewAllPayments() {
  userService.getUsers().then((users) => {
    users.forEach((user) => {
      if(user.ongoingPay.length > 0){
        console.log(user.ongoingPay, '\n');
      }
    });
  });
}