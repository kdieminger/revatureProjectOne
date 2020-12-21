import fs from 'fs';
/**
 * Customer Properties
 * Name
 * Username
*/

let lot;
let offers = [];

//load data from carLot
export function loadCarLot() {
    try {
        lot = JSON.parse(fs.readFileSync('../carLot.json'));
      } catch (err) {
        console.error(err);
      }
};

export function loadOffers(){
  try {
    offers = JSON.parse(fs.readFileSync('../offers.json'));
  } catch (err) {
    console.error(err);
  }
}


//view cars on the lot
export function viewCars(){ 
  console.log(lot);
}

export function makeOffer(carID, downPay, months, user){
  offers.push({carID: carID, downPay: downPay, months: months, user: user});
}

export function viewOffers(){
  console.log(offers);
}

//Customer Functions
/*
export function makeOffer();
export function ownedCars();
export function remainingPay();
*/