// 1 global - Exists everywhere after it is declared.
x = 5;
// 2 function - Exists anywhere inside of the nearest function. Hoisting
var y = 5;
// 3 local - It only exists inside of the scope it was defined in.
let z = 5;
// 4 constant - Locally scoped and cannot be modified.
const CONST = 5;

//console.log(global);

global = 3;

console.log(global);
do {
    let local = 3;
    console.log(local);
    var funcScope = 2;
    console.log(funcScope);
} while(false);
console.log(funcScope);
//console.log(local);

const LEGS = 4;
//LEGS = 2;


function hello() {
    var h = 5;
    console.log(h);
}

hello();

console.log(h);