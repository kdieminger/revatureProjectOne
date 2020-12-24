import fs from 'fs';
import { exit } from 'process';
import { removeEmitHelper } from 'typescript';
import { Car, Offer } from './car.js';

//Class declaration
export class User{
    constructor(username, password, role){
        this.username = username;
        this.password = password;
        this.role = role;
        this.userCars = [];
    }
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
export function getUser(userN){
    return data.find(person => person.username === userN);
}

//logs user in
export function userLogin (name, pass){
    return data.find(person => person.username === name && person.password === pass);
};

//view cars on the lot
export function viewCars(){ 
    console.log(lot);
}

//calculate monthly payment
export function calcMonthPay(carID, downpay, months){
  let vehicle = lot.find(car => car.carID === carID);
  let z = vehicle.price;
  let remain = z - downpay;
  let monthly = remain/months;
  monthly = monthly.toFixed(2);
  return monthly;
}
//CUSTOMER FUNCTIONS
//registers a customer
export function registerCustomer(userN, passW){
    let role = 'Customer';
    data.push(new User(userN, passW, role, []));
}

//makes an offer on a car
export function makeOffer(carID, downPay, months, user){
    offers.push(new Offer (carID, downPay, months, user));
    let x = Number(downPay);
    let y = Number(months);
    let monthly = calcMonthPay(carID, x, y);
    console.log(`Thank you for your offer. You have put a downpayment of ${downPay} on ${carID} and your monthly payment will be ${monthly} over ${months} months.`);
}

//lets the user view their cars
export function ownedCars(username){
  let user = data.find(person => person.username === username);
  console.log(user.ownedCars);
}


//export function remainingPay();


//EMPLOYEE FUNCTIONS
//registers an employee
export function registerEmployee(userN, passW){
    let role = 'Employee';
    data.push(new User(userN, passW, role, []));
}

//adds car to carLot
export function addCar(brand, color, carID, price){
    lot.push(new Car(brand, color, carID, price));
}

//view pending offers
export function viewOffers(){
    console.log(offers);
}

//remove car from carLot
export function removeCar(carID){
  let remove = lot.indexOf(lot.find(car => car.carID === carID));
  lot.splice(remove, 1);
}

//accepts or rejects a pending offer
export function pendingOffer(carID, username, action){
  let offer = offers.find(off => off.carID === carID && off.username === username);
  let fCarID = offer.carID;
  let user = offer.username;
  if(action == 0){
    updateCarOwner(fCarID, user);
    removeCar(fCarID);
    let remove = offers.indexOf(offers.find(offer => offer.carID === carID && offer.username === username));
    offers.splice(remove, 1);
    rejectPending();
  }
  else if(action == 1){
    let remove = offers.indexOf(offers.find(offer => offer.carID === carID && offer.username === username));
    offers.splice(remove, 1);
  }
  else{
    console.log("Oops!");
  }
}

//export function viewPayments()

//SYSTEM FUNCTIONS
//updates a car's owner - to be called when an offer is accepted
export function updateCarOwner(carID, username){
  let userCar = lot.find(car => car.carID === carID);
  userCar.owner = username;
  let fUser = data.find(person => person.username === username);
  let newUserCar = fUser.ownedCars;
  newUserCar.push(userCar);
}

export function rejectPending(carID){
  for (let i = 0; i < offers.length; i++){
    if (offers[i].carID === carID){
      console.log(offers[i]);
      offers.splice(i, 1);
    }
  }
}





