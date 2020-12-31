import logger from '../log.js';
import userService from '../user/user.service.js';
import carService from './car.service.js';

export class Car {
    constructor(public brand: string, public color: string, public carID: string, public price: number, public owner: string){
    };
}

export class Payment {
    constructor(public payID: string, public carID: string, public username: string, public downPay: number,public months: number, public remainingPay: number){
    }
}

//formats cars for display
export function carDisplay(car: Car){
    logger.trace(`carDisplay called with parameter ${JSON.stringify(car)}`);
    return car.carID + ': ' + car.color + ' ' + car.brand + '- $' + car.price;
}

//allows user to view all cars on the lot
export function viewCars(callback: Function){
    logger.trace('viewCars called');
    carService.getCars().then((cars) =>{
        cars.forEach((car) => {console.log(carDisplay(car));});
        callback();
    })
}

//adds a car to the car lot
export function addCar(brand: string, color: string, carID: string, price: number, callback: Function){
    logger.trace(`addCar called with parameters ${brand}, ${color}, ${carID}, and ${price}.`);
    carService.getCarByID(carID).then((car) => {
        if (!car){
            let newCar = new Car(brand, color, carID, price, 'dealer');
            carService.addCar(newCar);
        }
        else{
            logger.error('carID already exists');
        }
    })
    callback();
}

//removes a car from the lot
export function removeCar(carID: string){
    logger.trace(`removeCar called with parameter ${carID}`);
    carService.getCarByID(carID).then((car)=> {
        if(car){
            carService.removeCar(carID);
        }
        else {
            logger.error('car does not exist');
        }
    })
}


//changes owner of car and moves the car to the new owner with optional callback to remove car from lot
export function changeOwner(carID: string, username: string, callback?: Function) {
    logger.info(`changeOwner called with params ${carID} and ${username}`);
    carService.getCarByID(carID).then(async (car) => {
        if (car && username) {
            logger.debug(car);
            car.owner = username;
            carService.updateCarOwner(car);
            userService.getUser(username).then(async (user) => {
                if (user) {
                    user.ownedCars.push(car);
                    logger.debug('this is ownedCars: ' + user.ownedCars);
                    userService.updateUser(user);
                    callback;
                }
                else{
                    logger.error('user is undefined');
                }
            })
        }
        else{
            logger.error('car is undefined');
        }
    })
}
