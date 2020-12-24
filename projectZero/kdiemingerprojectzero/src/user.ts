import fs from 'fs';
import { exit } from 'process';
import { Car, Offer } from './car.js';

//Class declaration
export class User{
  constructor(public username: string, public password: string, public role: string, public userCars: Array<Object>){
    userCars = [];
  };
}


//variables
export let data = [];
export let lot = [];
export let offers = [];


//loads users from usersdata.json
export function loadUsers() {
    try {
        data = JSON.parse(fs.readFileSync('../usersdata.json'));
      } catch (err) {
        console.error(err);
      }
};
//loads cars from carLot.json
export function loadCarLot() {
    try {
        lot = JSON.parse(fs.readFileSync('../carLot.json'));
      } catch (err) {
        console.error(err);
      }
};
//loads offers from offers.json
export function loadOffers(){
    try {
      offers = JSON.parse(fs.readFileSync('../offers.json'));
    } catch (err) {
      console.error(err);
    }
}



//ROLE NEUTRAL FUNCTIONS

//checks for matching username
export function getUser(userN: string){
    return data.find(person => person.username === userN);
}

//logs user in
export function userLogin (name: string, pass: string){
    return data.find(person => person.username === name && person.password === pass);
};

//view cars on the lot
export function viewCars(){ 
    console.log(lot);
}

//calculate monthly payment
export function calcMonthPay(carID: string, downpay: number, months: number){
  //TODO: check appropriate type for vehicle - why not Object?
  let vehicle: any = lot.find(car => car.carID === carID);
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
    data.push(new User(userN, passW, role, []));
}

//makes an offer on a car
export function makeOffer(carID: string, downPay: number, months: number, user: string){
    offers.push(new Offer (carID, downPay, months, user, ''));
    let x = Number(downPay);
    let y = Number(months);
    let monthly = calcMonthPay(carID, x, y);
    addPending(carID,user);
    console.log(`Thank you for your offer. You have put a downpayment of ${downPay} on ${carID} and your monthly payment will be ${monthly} over ${months} months.`);
}

//lets the user view their cars
export function viewOwnedCars(username:string){
  let user = data.find(person => person.username === username);
  console.log(user.ownedCars);
}

export function viewUserOffers(username: string){
  let user = data.find(person => person.username === username);
  console.log(user.pendingOffers);
}

//TODO: THIS FUNCTION
export function remainingPay(username: string, carID: string){
  let ongoing = data.find(person => person.username === username);
}


//EMPLOYEE FUNCTIONS
//registers an employee
export function registerEmployee(userN: string, passW: string){
    let role = 'Employee';
    data.push(new User(userN, passW, role, []));
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
  let remove = lot.indexOf(lot.find(car => car.carID === carID));
  lot.splice(remove, 1);
}

//accepts or rejects a pending offer
export function pendingOffer(carID: string, username: string, action: number){
  let offer = offers.find(off => off.carID === carID && off.username === username);
  let fCarID = offer.carID;
  let user = offer.username;
  if(action == 0){
    updateCarOwner(fCarID, user);
    removeCar(fCarID);
    let userPay = data.find(person => person.username === username);
    let newOngoing = userPay.ongoingPay;
    newOngoing.push(new Offer(offer.carID, offer.downPay, offer.months, offer.username, ''));
    console.log(newOngoing);
    let remove = offers.indexOf(offers.find(offer => offer.carID === carID && offer.username === username));
    offers.splice(remove, 1);
    rejectPending(carID);
  }
  else if(action == 1){
    let remove = offers.indexOf(offers.find(offer => offer.carID === carID && offer.username === username));
    offers.splice(remove, 1);
  }
  else{
    console.log("Oops!");
  }
}

//export function viewPayments(username){}

//SYSTEM FUNCTIONS
//updates a car's owner - to be called when an offer is accepted
export function updateCarOwner(carID: string, username: string){
  let userCar = lot.find(car => car.carID === carID);
  userCar.owner = username;
  let fUser = data.find(person => person.username === username);
  let newUserCar = fUser.ownedCars;
  newUserCar.push(userCar);
}

//add pending offer to user
export function addPending(carID: string, username: string){
  let pendOfferID = carID + username;
  let userOffer = offers.find(off => off.offerID === pendOfferID);
  let fUser = data.find(person => person.username === username);
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





