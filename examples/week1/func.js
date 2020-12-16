// Functions as constructors

// Object Literal
let person = {
    name: 'Richard',
    age: 29,
    degree: 'Computer Science',
    talk() {
        console.log('Hi.')
    }
}

console.log(person);
person.talk();

let person2 = {
    name: 'Salman',
    age: 27,
    degree: 'Accounting',
    talk() {
        console.log('Hi.')
    }
}

console.log(typeof person2);

function Person(name, age, degree) {
    this.name = name;
    this.age = age;
    this.degree = degree;
    this.talk = function() {
        console.log('Hi');
    }
}

let p3 = new Person('Adam', 27, 'Biology');
console.log(p3);
p3.talk();
console.log(typeof p3);
console.log(p3 instanceof Person);
console.log(p3.__proto__); // __proto__ is the actual prototype of the object.

function Associate(name, age, degree, track) {
    this.constructor(name, age, degree);
    this.track = track;
}

// is a field on a function that provides the protype to any object created with the function.
Associate.prototype = new Person(); // create the inheritance relationship
Associate.prototype.constructor = Person; // give the super class constructor

let a1 = new Associate('Medbh', 1/0, 'Unknown', 'ReactNative');
console.log(a1);

console.log(typeof a1);
console.log(a1 instanceof Person);
console.log(a1 instanceof Associate);

console.log(p3 instanceof Associate);

// Closures
/*
A closure is a function that remembers and accesses the variables and arguments of its outer
function even after the function returns.
The closure able to access the variables defined between its curly brackets, the outer function’s
variables and the global variables.
*/


// outerfunction gets immediately called, returning the inner function, which I can then call.
let currentCount = function() {
    let count = 0;
    return function() {
        return count++;
    }
}();

console.log(currentCount());
console.log(currentCount());
console.log(currentCount());
console.log(currentCount());
console.log(currentCount());

function BankAccount() {
    let balance = 50;
    this.withdraw = (amount) => {
        // sanitization
        balance -= amount;
    }
    this.deposit = (amount) => {
        // sanitization
        balance += amount;
    }
    this.checkBalance = () => balance;
}

let bank = new BankAccount();
bank.balance = 7000;
console.log(bank);
console.log(bank.checkBalance())


function Salman(){
    this.name = "Salman";
}

let x = new Salman();
console.log(x);