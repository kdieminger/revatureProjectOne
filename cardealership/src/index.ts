import readline from 'readline';
import logger from './log';

import { User, login, register } from './users/user';
import { viewCarLot, addCar, removeCar } from './cars/cars';

export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export let loggedUser: User;

function attemptRegister() {
	rl.question('Username? ', (username) => {
		if (getUser(username)) {
			console.log('User already exists');
			startMenu();
		} else {
			rl.question('Password? ', (password) => {
				rl.question('Are you a customer or employee? ', (role) => {
					let roleToRegister = role.toLowerCase();
					if (roleToRegister === 'customer' || 'employee') {
						rl.question(
							'How much money do you have? (Enter a number)',
							(money) => {
								if (isNaN(Number(money))) {
									console.log('Invalid number. Try again.');
									startMenu();
								} else {
									register(username, password, role, Number(money));
									startMenu();
								}
							}
						);
					} else {
						console.log('Invalid role. Attempt to register again.');
						startMenu();
					}
				});
			});
		}
	});
}

export function attemptLogin() {
	rl.question('Username? ', (username) => {
		rl.question('Password? ', (password) => {
			logger.debug(`${username + ' ' + password}`);
			let user = login(username, password);
			if (user) {
				loggedUser = user;
				console.log(`Welcome back ${loggedUser.username}.`);
			} else {
				console.log('Login Failed.');
			}
			startMenu();
		});
	});
}

export function checkUserRole() {
	logger.trace('Checking user role.');
	if (loggedUser && loggedUser.role === 'employee') {
		employeeMenu();
	} else {
		console.log('Login as Employee');
		startMenu();
	}
}

export function carLotMenu() {
	rl.question(
		`
  What would you like to do?
  0. Make an offer
  1. Go back to Start Menu\n`,
		(answer) => {
			let valid = false;
			if (answer === '0' || '1') {
				valid = true;
			} else {
				console.log('Invalid input.');
				carLotMenu();
			}
			if (valid) {
				switch (answer) {
					case '0':
						makeOffer();
						break;
					case '1':
						startMenu();
				}
			}
		}
	);
}

export function employeeMenu() {
	rl.question(
		`What would you like to do?
		0. Add car to lot
		1. Look at car offers
		2. Remove car from lot
		3. View all payments
		4. Go back to Start Menu`,
		(answer) => {
			let valid = false;
			if (answer === '0' || '1' || '2' || '3' || '4') {
				valid = true;
			}
			if (valid) {
				switch (answer) {
					case '0':
						addCar();
						break;
					case '1':
						viewCarLot();
						viewCarOffers();
						break;
					case '2':
						viewCarLot();
						removeCar();
						break;
					case '3':
						// viewPayments();
						break;
					case '4':
						startMenu();
						break;
				}
			}
		}
	);
}

function exit() {
	saveUsers();
	saveCars();
	process.exit();
}

export function startMenu() {
	rl.question(
		`Welcome to the Car Lot! Please select an option:
			0. Register
			1. Log in
			2. View car lot
			3. Your cars
			4. Employee access
			q. Exit \n`,
		function (answer) {
			let valid = false;
			if (answer === '0' || '1' || '2' || '3' || '4' || 'q') {
				valid = true;
			}
			if (valid) {
				switch (answer) {
					case '0':
						logger.info('Registration.');
						attemptRegister();
						break;
					case '1':
						logger.info('Login');
						attemptLogin();
						break;
					case '2':
						logger.info('Car lot');
						viewCarLot();
						carLotMenu();
						break;
					case '3':
						logger.info('Customer Cars');
						// viewCustomerCars();
						break;
					case '4':
						logger.info('Employee menu');
						checkUserRole();
						break;
					case 'q':
						exit();
						break;
					default:
						startMenu();
				}
			} else {
				console.log('invalid input.');
				startMenu();
			}
		}
	);
}

load();
startMenu();
