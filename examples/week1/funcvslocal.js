// function scope: variables only exist within the function
// local scope/ block scope: variables only exist within a block of code.

/*
{

}
*/

/*
var performs hoisting. The interpreter will do a "first pass" on any script and one of the things
it looks for is the "var" keyword. It takes any var declarations and "hoists" or redeclares those variables
at the top of their scope. Most JavaScript programmers consider the use of 'var' to be bad practice.

let does not perform hoisting.
*/
function ex() {
    console.log(l); // prints undefined, because l's declaration got hoisted to the top of the function.
    let i = 'i';
    var j = 'j';
    if(1) {
        // console.log(k); // doesn't exist because it hasn't been declared yet. let doesn't get hoisted.
        let k = 'k';
        var l = 'l';
        console.log(k);
        console.log(l);
        if(1) {
            console.log(k);
        }
    }
    console.log(i);
    console.log(j);
    //console.log(k);
    console.log(l);
}

ex();

//console.log(i);
//console.log(j);

ex();