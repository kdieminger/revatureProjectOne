// Singleton - pre ES6 - Closure and IIFE (Immediately Invoked Function Expression)
var catDB = (function() {
    var _cats = [];
    function addCat(cat) {
        _cats.push(cat);
    }
    function getCat(id) {
        return _cats.find( (cat) => cat.id === id);
    }

    return {
        addCat: addCat,
        getCat: getCat
    }
}());

catDB.addCat({name: 'Sprankles', id: 0});
catDB.addCat({name:'Bean', id:1})
console.log(catDB.getCat(0));

// Singleton - post ES6 - Object.freeze(); and exports
const _data = [];

const dogDB = {
    add: item => _data.push(item),
    get: id => _data.find((data) => data.id === id)
}

Object.freeze(dogDB); // makes it no assignment can take place in the object.

dogDB.hello = 't90';
console.log(dogDB);
//export default dogDB;

// decorators are still a proposal in JS.

class Dog {
    constructor(name) {
        this.name = name || 'Fido';
    }
}

let d = new Dog();
console.log(d);
d.name = 'Turtle';
console.log(d);
Object.freeze(d);
d.name = 'Fido';
console.log(d);

// Factory

// NOT A FACTORY: Object Literal
const cat = {
    catName: '',
    age: 0,
    id: 0,
    setName(name) {
        this.catName = name;
        return this;
    },
    grow(){
        this.age++;
    }
}
cat.grow();
console.log(cat.setName('Sprankles'));

// Factory - Factory Function
const createCat = ({ catName, age, id}) => ({
    catName,
    age,
    id,
    setName(name) {
        this.catName = name;
        return this;
    },
    grow() {
        this.age++;
    }
});
console.log(createCat({catName: 'sprankles', age: 8, id: 0}));

console.log(createCat({catName: 'bean', age: 6, id: 2}));

// Factory - Factory class
class Toast {
    /*
        Toast Stuff
    */
    spreadButter(){
        console.log('yes, buttered toast');
    }
}

class Muffin {
    /*
        Muffin stuff
    */
    spreadButter(){
        console.log('yes, buttered muffin');
    }
}

// Factory function
function spreadable(type) {
    return type=='toast'? new Toast(): new Muffin();
}

spreadable('toast').spreadButter();
spreadable().spreadButter();