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

export function calcMonthPay(carID, downpay, months){
  let vehicle = lot.find(car => car.carID === carID);
  let z = vehicle.price;
  let remain = z - downpay;
  let monthly = remain/months;
  monthly = monthly.toFixed(2);
  return monthly;
}

export function makeOffer(carID, downPay, months, user){
  offers.push({carID: carID, downPay: downPay, months: months, user: user});
  let x = Number(downPay);
  let y = Number(months);
  console.log(x, '+', y, '\n');
  let monthly = calcMonthPay(carID, x, y);
  console.log(monthly, '\n');
  console.log(`Thank you for your offer. You have put a downpayment of ${downPay} on ${carID} and your monthly payment will be ${monthly} over ${months}.`);
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