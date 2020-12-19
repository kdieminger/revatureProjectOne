import fs from 'fs';

/**
 * Employee Properties
 * Name
 * Username
 * Salary
*/

let data;

export function loadCarLotE() {
    try {
        data = JSON.parse(fs.readFileSync('./carLot.json'));
      } catch (err) {
        console.error(err);
      }
};

//adds car to carLot
export function addCar(brand, color, price){
    data.push({brand: brand, color: color, price: price});
}

//Employee Functions
/*export function employeeMenu() {
    read.question(`What would you like to do?
    0. Add Car
    1. Remove Car
    2. Accept or Reject Pending Offer
    3. View All Payments
    4. Exit\n`, (answer) => {
        switch (answer) {
            case '0':
                console.log("0: coming soon!");
                //addCar();
                process.exit();
                break;
            case '1':
                console.log("1: coming soon!");
                //removeCar();
                process.exit();
                break;
            case '2':
                console.log("2: coming soon!");
                //pendingOffer();
                process.exit();
                break;
            case '3':
                console.log("3: coming soon!");
                process.exit();
                //viewPayments();
                break;
            case '4':
                process.exit();
                break;
        }
    })
}
export function pendingOffer();
export function removeCar();
export function viewPayments();
*/