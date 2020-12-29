let array = ['one', 'two', 'three'];


console.log(array);
console.log(array[0]);
console.log(array.__proto__);
console.log(array.__proto__.__proto__);

/*
An object is a group of key value pairs.
An array is a ordered list of values. (It's actually a group of key-value pairs with an index as the key.)
*/
console.log(array[0]); // array.0 <- I can't use a number when trying to access a key
console.log(array.length);
console.log(array['length']);

let object = {'1': 'one', '2': 'two', '3': 'three', 'length': 3};
console.log(object[1])
console.log(object.length);

let order = ['cheese', 'cheese', 'ham', 'pineapple'];

let pizza = { }

for(let ingredient of order) {
    if(pizza[ingredient]) {
        pizza[ingredient] += 1;
    } else {
        pizza[ingredient] = 1;
    }
}

console.log(pizza);