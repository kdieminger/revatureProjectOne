let x = 1; //number
let y = "1"; //string

console.log(x == y); // performs type coercion. It makes the data types the same.
console.log(String(x) === y);
console.log(x === y); // checks the data type first.


let z = true;
console.log(x == z);


// truthy vs falsy
/*
Any non-zero number is true
0 and NaN are false
undefined is false
null is false
'', "", and `` are false
any non-empty string is true
Any object is true (arrays and functions are objects)
*/

if([]){
    console.log('true');
} else {
    console.log('false');
}