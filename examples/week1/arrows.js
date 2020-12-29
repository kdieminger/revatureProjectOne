function add(one, two) {
    return one + two;
}

// arrow functions without brackets return the result of a single line of code.
const arrowAdd = (one, two) => one+two;



function foo(hi) {
    hi++;
    return hi*5;
}

// Arrow functions with brackets behave just like regular functions
const arrowFoo = (hi) => {
    hi++;
    return hi*5;
}

console.log(add(1,2));
console.log(arrowAdd(1,2));
console.log(foo(5));
console.log(arrowFoo(5));
