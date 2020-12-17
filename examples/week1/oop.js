/**
 * oop in js
 * 
 * 4 pillars
 * 
 * encapsulation
 *      restricting direct access to data
 * inheritance
 *      
 * polymorphism
 * 
 * abstraction
 *      
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