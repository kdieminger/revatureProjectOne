var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    ;
    Person.prototype.greet = function () {
        console.log('Hello, my name is ' + this.name);
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, degree) {
        var _this = _super.call(this, name) || this;
        _this.degree = degree;
        return _this;
    }
    Student.prototype.walk = function () {
        console.log('timidly');
    };
    return Student;
}(Person));
var Professor = /** @class */ (function (_super) {
    __extends(Professor, _super);
    function Professor(name, study) {
        var _this = _super.call(this, name) || this;
        _this.study = study;
        return _this;
    }
    Professor.prototype.walk = function () {
        console.log('strut');
    };
    return Professor;
}(Person));
var c = new Student('Richard', 'Computer Science');
var p = new Professor('Kirsten', 'Full-Stack');
console.log(c);
c.walk();
console.log(p);
p.walk();
