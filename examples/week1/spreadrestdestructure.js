console.log('destructuring')
// Destructuring. Taking values out of an array or object into other variables.
let arr1 = ['one', 'two', 'three'];

let [richard, salman, kirsten] = arr1;

console.log(salman);

let obj1 = { name: 'Richard', degree: 'Computer Science'};

let { name, degree } = obj1;

console.log(name);
console.log(degree);

// Spread Operator. Making a deep copy of an object.
console.log('spread')
let first = {name: 'Richard'};
let second = {name: 'Richard'};

console.log(first == second);

let third = first;

console.log(first == third); // third is just pointing to the same object as first.
third.name = 'Jamie';
console.log(first.name);

third = {...first}; // Make a copy of first as a new object using the spread operator.
console.log(first == third);
console.log(first.name);
console.log(third.name);
first.name = 'Michael';
console.log(first.name);
console.log(third.name);

// Rest operator
function add(one, two) {
    console.log(arguments);
    return one + two + (arguments[2] || 0);
}

console.log(add(1, 2, 3));

function minus(one, two, ...rest) {
    console.log(rest);
   
    let diff = one - two;
    for(let num of rest) {
        diff -= num;
    }
    return diff;
}

console.log(minus(8, 4, 2, 5));
console.log(minus(1,2));