import fs from 'fs';
import logger from '../log.js';
import { Car, carDisplay, Payment } from '../car/car.js';
import { Offer } from '../offer/offer.js';
import userService from './user.service.js';
import carService from '../car/car.service.js';

//Class declaration
export class User{
  constructor(public username: string, public password: string, public role: string, public ownedCars: Array<Car>, public pendingOffers: Array<Offer>, public ongoingPay: Array<Payment>){
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
      let add = new User(username, password, role, [], [], [])
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

//allows user to view their owned cars
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

//allows the user to view their ongoing payments
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

//allows the user to view their pending offers
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

//allows an employee to view all ongoing payments
export function viewAllPayments(callback: Function){
  logger.info('viewAllPayments called');
  userService.getPayments().then((payments) => {
    logger.debug(payments);
    payments.forEach((pay) => {
      logger.debug(pay);
      console.log(paymentDisplay(pay));
    });
    callback();
  })
}

//formats ongoing payments for display
export function paymentDisplay(pay: Payment){
  logger.info(`paymentDisplay called with parameter ${JSON.stringify(pay)}`);
  carService.getCarByID(pay.carID).then((car) => {
    if(car){
      return pay.payID + ': ' + carDisplay(car) + '\nCustomer:  ' + pay.username + '\nDown Payment- $' + 
      pay.downPay + '\nMonths Remaining- ' + pay.months + '\nRemaining Payment- $' + pay.remainingPay;
    }  
  })
}