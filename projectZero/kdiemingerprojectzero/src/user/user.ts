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


//loads users from usersdata.json
export function loadUsers() {
    try {
        data = JSON.parse((fs.readFileSync('./usersdata.json')).toString());
      } catch (err) {
        logger.error(err);
      }
};
//loads cars from carLot.json
export function loadCarLot() {
    try {
        lot = JSON.parse((fs.readFileSync('./carLot.json')).toString());
      } catch (err) {
        logger.error(err);
      }
};
//loads offers from offers.json
export function loadOffers(){
    try {
      offers = JSON.parse((fs.readFileSync('./offers.json')).toString());
    } catch (err) {
      logger.error(err);
    }
};


//ROLE NEUTRAL FUNCTIONS

//checks for matching username
export function getUser(userN: string) {
  logger.trace(`get user called with parameter ${userN}`);
  return data.find((person: User) => person.username === userN);
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

//view cars on the lot
export function viewCarsOld(){ 
  console.log(lot);
}

//calculate monthly payment
export function calcMonthPay(carID: string, downpay: number, months: number){
  logger.trace(`calculate monthly payment called with parameters ${carID}, ${downpay}, ${months}.`);
  let vehicle: any = lot.find((car: Car) => car.carID === carID);
  let z: number = vehicle.price;
  let remain: number = z - downpay;
  let monthly: any = remain/months;
  monthly = monthly.toFixed(2);
  return monthly; 
}
//CUSTOMER FUNCTIONS

//makes an offer on a car
// export function makeOffer(carID: string, downPay: string, months: string, user: string) {
//   logger.trace(`create a new offer using parameters ${carID}, ${downPay}, ${months}, and ${user}`);
//   let check = lot.find((car: Car) => car.carID == carID);
//   let dPay: number = parseInt(downPay);
//   let mnths: number = parseInt(months);
//   if (isNaN(dPay) || isNaN(mnths)) {
//     logger.error('invalid input, NaN');
//     console.log('Invalid input.');
//   }
//   else if (!check) {
//     logger.error('Car doesnt exist');
//     console.log('invalid carID');
//   }
//   else {
//     offers.push(new Offer(carID, dPay, mnths,user));
//     let monthly = calcMonthPay(carID, dPay, mnths);
//     addPending(carID, user);
//     console.log(`Thank you for your offer. You have put a downpayment of ${downPay} on ${carID} and your monthly payment will be ${monthly} over ${months} months.`);
//   }
// }

//replaces an existing offer
// export function replaceOffer(carID: string, downPay: string, months: string, user: string){
//   let dPay: number = parseInt(downPay);
//   let mnths: number = parseInt(months);
//   if (isNaN(dPay) || isNaN(mnths)) {
//     logger.error('invalid input, NaN');
//     console.log('Invalid input.');
//   }
//   else{
//     removeOffer((carID + user));
//     logger.debug('Offers after removal: ', offers);
//     offers.push(new Offer(carID, dPay, mnths, user));
//     logger.debug('Offers after addition: ', offers)
//   }
// }

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


//EMPLOYEE FUNCTIONS

//view pending offers
export function viewOffersOld(){
  console.log(offers);
}

// export function removeOffer(offerID: string){
//   let remove: any = offers.find((off: Offer) => off.offerID === offerID);
//   let index: number = offers.indexOf(remove);
//   offers.splice(index, 1);
// }

//accepts or rejects a pending offer
// export function pendingOffer(offerID: string, action: number){
//   let offer: any = offers.find(off => off.offerID === offerID);
//   if(!offer){
//     logger.error('offer does not exist');
//     console.log('Invalid offerID');
//   }
//   else{
//     let car: string = offer.carID;
//     let userN: string = offer.username;
//     if(action == 0){
//       updateCarOwner(car, userN);
//       let user: any = data.find((person: User) => person.username === userN);
//       let newCar: any = lot.find((vehicle: Car) => vehicle.carID === car);
//       let newOngoing: Array<Payment> = user.ongoingPay;
//       newOngoing.push(new Payment(offerID, newCar, userN, offer.downPay, offer.months, calcMonthPay(car, offer.downPay, offer.months)));
//       removeCarOld(car);
//       removeOffer(offerID);
//       rejectPending(car);
//     }
//     else if(action == 1){
//       let remove: any = offers.find(offer => offer.offerID === offerID);
//       let index: number = offers.indexOf(remove);
//       offers.splice(index, 1);
//     }
//   }
// }

//SYSTEM FUNCTIONS


//add pending offer to user
export function addPending(carID: string, username: string){
  let pendOfferID: string = carID + username;
  let userOffer: any = offers.find(off => off.offerID === pendOfferID);
  let fUser: any = data.find(person => person.username === username);
  let newUserOffer = fUser.pendingOffers;
  newUserOffer.push(userOffer);
}

//rejects all offers matching carID    
export function rejectPending(carID: string){
  for (let i: number = 0; i < offers.length; i++){
    if (offers[i].carID === carID){
      logger.debug(offers[i]);
      offers.splice(i, 1);
    }
  }
}