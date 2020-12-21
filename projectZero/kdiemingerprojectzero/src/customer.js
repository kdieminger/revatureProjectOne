import fs from 'fs';
/**
 * Customer Properties
 * Name
 * Username
*/

let data;

//load data from carLot
export function loadCarLot() {
    try {
        data = JSON.parse(fs.readFileSync('../carLot.json'));
      } catch (err) {
        console.error(err);
      }
};

//view cars on the lot
export function viewCars(){
    console.log(data);
}

//Customer Functions
/*
export function makeOffer();
export function ownedCars();
export function remainingPay();
*/