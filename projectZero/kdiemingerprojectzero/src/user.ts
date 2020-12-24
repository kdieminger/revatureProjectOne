import fs from 'fs';
import logger from './log.js';
import { exit } from 'process';
import { Car, Offer, Payment } from './car.js';

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
        console.error(err);
      }
};
//loads offers from offers.json
export function loadOffers(){
    try {
      offers = JSON.parse((fs.readFileSync('./offers.json')).toString());
    } catch (err) {
      console.error(err);
    }
}



//ROLE NEUTRAL FUNCTIONS

//checks for matching username
export function getUser(userN: string){
  logger.trace(`get user called with parameter ${userN}`);
  return data.find((person: User) => person.username === userN);
}

//logs user in
export function userLogin (name: string, pass: string){
    return data.find((person: User) => person.username === name && person.password === pass);
};

//view cars on the lot
export function viewCars(){ 
    console.log(lot);
}

//calculate monthly payment
export function calcMonthPay(carID: string, downpay: number, months: number){
  //TODO: check appropriate type for vehicle - why not Object?
  let vehicle: any = lot.find((car: Car) => car.carID === carID);
  let z: number = vehicle.price;
  let remain: number = z - downpay;
  let monthly: any = remain/months;
  monthly = monthly.toFixed(2);
  return monthly;
}
//CUSTOMER FUNCTIONS
//registers a customer
export function registerCustomer(userN: string, passW: string){
    let role = 'Customer';
    data.push(new User(userN, passW, role, [], [], []));
}

//makes an offer on a car
export function makeOffer(carID: string, downPay: number, months: number, user: string){
    offers.push(new Offer (carID, downPay, months, user));
    let x = Number(downPay);
    let y = Number(months);
    let monthly = calcMonthPay(carID, x, y);
    addPending(carID,user);
    console.log(`Thank you for your offer. You have put a downpayment of ${downPay} on ${carID} and your monthly payment will be ${monthly} over ${months} months.`);
}

//lets the user view their cars
export function viewOwnedCars(username:string){
  let user: any;
  user = data.find((person: User) => person.username === username);
  console.log(user.ownedCars);
}

export function viewUserOffers(username: string){
  let user: any;
  user = data.find(person => person.username === username);
  console.log(user.pendingOffers);
}

//TODO: THIS FUNCTION
export function remainingPay(username: string, carID: string){
  let ongoing = data.find(person => person.username === username);
}


//EMPLOYEE FUNCTIONS
//registers an employee
//TODO: Consolidate into one registerUser function
export function registerEmployee(userN: string, passW: string){
    let role = 'Employee';
    data.push(new User(userN, passW, role, [], [], []));
}

//adds car to carLot
export function addCar(brand: string, color: string, carID: string, price: number){
  let newCar = new Car(brand, color, carID, price, 'dealer');
  let check = lot.find(car => car.carID === carID);
  if(check){
    console.log("CarID already exists.");
  }
  else if (!check){
    lot.push(newCar);
  }
}

//view pending offers
export function viewOffers(){
    console.log(offers);
}

//remove car from carLot
export function removeCar(carID: string){
  let index: number;
  let remove: any;
  remove = lot.find((car: Car) => car.carID === carID);
  index = lot.indexOf(remove);
  lot.splice(index, 1);
}

export function removeOffer(offerID: string){
  let remove: any = offers.find((off: Offer) => off.offerID === offerID);
  let index: number = offers.indexOf(remove);
  offers.splice(index, 1);
}

//accepts or rejects a pending offer
export function pendingOffer(offerID: string, action: number){
  let offer: any = offers.find(off => off.offerID === offerID);
  let car: string = offer.carID;
  let userN: string = offer.username;
  if(action == 0){
    updateCarOwner(car, userN);
    let user: any = data.find((person: User) => person.username === userN);
    let newCar: any = lot.find((vehicle: Car) => vehicle.carID === car);
    let newOngoing: Array<Payment> = user.ongoingPay;
    newOngoing.push(new Payment(offerID, newCar, userN, offer.downPay, offer.months, calcMonthPay(car, offer.downPay, offer.months)));
    removeCar(car);
    removeOffer(offerID);
    rejectPending(car);
  }
  else if(action == 1){
    let remove: any = offers.find(offer => offer.offerID === offerID);
    let index: number = offers.indexOf(remove);
    offers.splice(index, 1);
  }
  else{
    console.log("Oops!");
  }
}

export function viewOwnPayments(username: string){
  let user: any = data.find((person: User) => person.username === username);
  console.log(user.ongoingPay);
}

//SYSTEM FUNCTIONS
//updates a car's owner - to be called when an offer is accepted
export function updateCarOwner(carID: string, username: string){
  let userCar: any = lot.find(car => car.carID === carID);
  userCar.owner = username;
  let fUser: any = data.find(person => person.username === username);
  let newUserCar = fUser.ownedCars;
  newUserCar.push(userCar);
}

//add pending offer to user
export function addPending(carID: string, username: string){
  let pendOfferID: string = carID + username;
  let userOffer: any = offers.find(off => off.offerID === pendOfferID);
  let fUser: any = data.find(person => person.username === username);
  let newUserOffer = fUser.pendingOffers;
  newUserOffer.push(userOffer);
}

export function rejectPending(carID: string){
  for (let i = 0; i < offers.length; i++){
    if (offers[i].carID === carID){
      console.log(offers[i]);
      offers.splice(i, 1);
    }
  }
}





