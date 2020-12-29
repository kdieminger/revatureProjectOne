// JavaScript has no concept of overloading

function add(one, two) {
    return one + two + 3;
}

console.log(add(1,2));

function add(one, two, three) {
    return one+two+three+1;
}

console.log(add(1,2,3));

// Overriding in JavaScript
function Person(name, age, degree) {
    this.name = name;
    this.age = age;
    this.degree = degree;
    this.talk = function() {
        console.log('Hi');
    }
}

function Associate(name, age, degree, track) {
    this.constructor(name, age, degree);
    this.track = track;
    this.talk = function() {
        console.log(`My name is ${this.name}, I have a degree in ${this.degree}, and I am a Software Developer at Revature.`);
    }
}
Associate.prototype = new Person();
Associate.prototype.constructor = Person;


let x = new Associate('Jonathan', 98, 'China and Asia Pacific Studies', 'React');
x.talk();
x.__proto__.talk();

// What happens when a function does not get a parameter?
function foo(parameter) {
    console.log(parameter);
}

foo('shark');
foo();
console.log(typeof (1+2+undefined+1));