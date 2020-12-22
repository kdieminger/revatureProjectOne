/**
 * oop in js
 * 
 * 4 pillars
 * 
 * encapsulation
 *      restricting direct access to data
 * inheritance
 *      js uses prototype inheritance. if we change the prototype, we change everything
 *          that uses the prototype.
 * polymorphism
 *      We can use function overriding in js to create multiple different implementations.
 * abstraction
 *       hiding implementation of certain functionality
 */


 //encapsulation
//  ///closure

//  function a(){
//      console.log('a');
//      return 'a';
//  }

//  const answer = a()
// //IIFE
// ///Immediately Invokable Function Expression
//  const answer2 = (function b(){
//      console.log('b');
//      return 'b';
//  })()

//  console.log(answer2);
/**
 * closure will allow you to fully encapsulate a variable.
 *      The first function is executed and the inner function, that 
 *      still has access to the parent functions scoped variable, is returned.
 */
 const haveBirthday = (function () {
     let age = 0;
    return function () {
        age++;
        return age;
    }
 })();

console.log(haveBirthday());
console.log(haveBirthday());
console.log(haveBirthday());
console.log(haveBirthday());


/**
 * can have getters and setters inside classes. these will let you
 *      treat the methods as actual properties instead of methods, while 
 *      still giving you the ability to restrict certain functionalities.
 */
class Human {
    constructor(name, age) {
        this._name=name;
        this._age=age;
    }

    get name(){
        return this._name;
    }

    set name(name){
        this._name=name;
    }

    get age(){
        return this._age;
    }
    
    set age(age){
        if(age<=this._age){
            return;
        }
        this._age=age;
    }
}

const human = new Human('sarah', 29);
console.log(human.name);
human.age=10;
console.log(human.age);


/**
 * Although not the only way, we can create a level of abstraction through exporting.
 *      Abstraction is the act of hiding implementation. By exporting an object for others
 *      to work with, we are keeping the under lying implementations hidden and only revealing 
 *      certain functions and objects to work with.
 */
module.exports=human;


const skeleton = {
    bones: 3200,
    scare: function () {
        console.log("I have too many bones in my body!!!!");
    }
}

skeleton.scare();
//we assign a new skeleton
const newSkeleton = Object.create(skeleton);
//we change the number of bones on the second skeleton
newSkeleton.bones=10;
//and we print the original skeleton bones, how many print?
console.log(skeleton.bones);

//does the new skeleton have the same property as the original?
newSkeleton.scare();
newSkeleton.__proto__.bones=99
//if we print the prototype, what prints? if we change something on the prototype, does
//      it change the original object?
console.log(newSkeleton.__proto__);
console.log(skeleton.bones);

//classes are sugar syntax for functions that create objects. if you print
//      typeof className, you get a function. classes will give you a new object with
//      the object prototype.
console.log(human.__proto__);