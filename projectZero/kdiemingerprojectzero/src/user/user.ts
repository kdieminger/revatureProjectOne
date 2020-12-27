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


//variables
export let data: Array<User>;
export let lot: Array<Car>;
export let offers: Array<Offer>;


//ROLE NEUTRAL FUNCTIONS

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


//CUSTOMER FUNCTIONS


//lets the user view their cars
export function viewOwnedCars(username:string){
  logger.info(`view cars owned by ${username}.`);
  let user: any;
  user = data.find((person: User) => person.username === username);
  console.log(user.ownedCars);
}

export function viewUserOffers(username: string){
  logger.info(`view offers made by ${username}`);
  let user: any = data.find(person => person.username === username);
  console.log(user.pendingOffers);
}

//allows user to view their ongoing payments
export function viewOwnPayments(username: string){
  logger.info(`view outstanding payments for ${username}`)
  let user: any = data.find((person: User) => person.username === username);
  console.log(user.ongoingPay);
}