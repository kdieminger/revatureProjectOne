
abstract class Person {
    constructor(public name: string){};
    public greet() {
        console.log('Hello, my name is '+this.name);
    }
    abstract walk();
}

class Student extends Person {
    constructor(name: string, public degree: string) {
        super(name);
    }
    public walk(){
        console.log('timidly');
    }
}

class Professor extends Person {
    constructor(name: string, public study: string) {
        super(name);
    }
    public walk(){
        console.log('strut');
    }
}

let c = new Student('Richard', 'Computer Science');
let p = new Professor('Kirsten', 'Full-Stack');
console.log(c);
c.walk();
console.log(p);
p.walk();