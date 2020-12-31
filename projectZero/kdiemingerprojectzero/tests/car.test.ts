import { Car, carDisplay } from '../src/car/car';
import carService from '../src/car/car.service';

let testCar: Car;

beforeEach(() => {
    testCar = new Car('Honda', 'Black', 'H01', 15000, 'dealer');
});


test('carDisplay displays correctly', () => {
    let str = 'H01: Black Honda- $15000';
    expect(carDisplay(testCar)).toBe(str);
});