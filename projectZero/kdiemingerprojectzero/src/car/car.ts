import { calcMonthPay } from '../user/user.js';
import logger from '../log.js';
import carService from './car.service.js';

export class Car {
    constructor(public brand: string, public color: string, public carID: string, public price: number, public owner: string){
    };
}

export class Payment {
    constructor(public payID: string, public vehicle: Car, public username: string, public downPay: number,public months: number, public monthlyPay: number, public remainingPay: any = (vehicle.price) - downPay){
    }
}

export function carDisplay(car: Car){
    logger.trace(`carDisplay called with parameter ${JSON.stringify(car)}`);
    return car.carID + ': ' + car.color + ' ' + car.brand + '- $' + car.price;
}

export function viewCars(callback: Function){
    logger.trace('viewCars called');
    carService.getCars().then((cars) =>{
        cars.forEach((car) => {console.log(carDisplay(car));});
        callback();
    })
}

//updates a car's owner - to be called when an offer is accepted
// export function updateCarOwner(car: Car, username: string){
//     carService.updateCarOwner(car, username).then((success) =>{
//         logger.info('car owner updated successfully');
//     }).catch((error) => {
//         logger.warn('car owner not updated');
//     });
//     // let userCar: any = lot.find(car => car.carID === carID);
//     // userCar.owner = username;
//     // let fUser: any = data.find(person => person.username === username);
//     // let newUserCar = fUser.ownedCars;
//     // newUserCar.push(userCar);
//   }

export function addCar(brand: string, color: string, carID: string, price: number, callback: Function){
    logger.trace(`addCar called with parameters ${brand}, ${color}, ${carID}, and ${price}.`);
    let newCar = new Car(brand, color, carID, price, 'dealer');
    carService.addCar(newCar);
    callback();
}

export function removeCar(carID: string, callback: Function){
    logger.trace(`removeCar called with parameter ${carID}`);
    carService.removeCar(carID);
    callback();
}
