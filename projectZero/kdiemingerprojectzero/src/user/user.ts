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
// export function registerUser(userN: string, passW: string, role: string, callback: Function): Promise<User | null>{
//   logger.info('registerUser called');
//   logger.trace(`newUser called with parameters ${userN}, ${passW}, and ${role}.`);
//   userService.getUserByName(userN).then((person) => {
//     logger.debug(person);
//     if (!person) {
//       let newUser = new User(userN, passW, role, [], [], []);
//       userService.addUser(newUser);
//       if(role == 'Employee'){
//         console.log('Welcome new employee!');
//       }
//       else{
//         console.log('Welcome new customer!');
//       }
//       return newUser;
//     }
//     else if (person) {
//       logger.error('username already exists');
//       return null;
//     }
//   })
//   callback();
// }

//registers a user
export async function registerUser(username: string, password: string, role: string): Promise<User|null> {
  logger.info('registerUser called');
  return await userService.getUserByName(username).then((user) => {
    if(user && user.username === username){
      return null;
    }
    else {
      let add = new User(username, password, role, [], [], [])
      userService.addUser(add);
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

export function paymentDisplay(pay: Payment){
  logger.info(`paymentDisplay called with parameter ${JSON.stringify(pay)}`);
  carService.getCarByID(pay.carID).then((car) => {
    if(car){
      return pay.payID + ': ' + carDisplay(car) + '\nCustomer:  ' + pay.username + '\nDown Payment- $' + 
      pay.downPay + '\nMonths Remaining- ' + pay.months + '\nRemaining Payment- $' + pay.remainingPay;
    }  
  })
}