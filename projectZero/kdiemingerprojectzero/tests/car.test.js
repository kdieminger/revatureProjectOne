"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var car_1 = require("../src/car/car");
var testCar;
beforeEach(function () {
    testCar = new car_1.Car('Honda', 'Black', 'H01', 15000, 'dealer');
});
test('carDisplay displays correctly', function () {
    var str = 'H01: Black Honda- $15000';
    expect(car_1.carDisplay(testCar)).toBe(str);
});
