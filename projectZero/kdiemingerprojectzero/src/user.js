import fs from 'fs';
import { exit } from 'process';
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
    viewOffers();
}

/*
export function ownedCars();
export function remainingPay();
*/

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
/*export function pendingOffer()
export function removeCar()
export function viewPayments()*/



