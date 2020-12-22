function a (){
    for(let i = 1000; i>0; i--){
        console.log(i);

    }
}

async function b(){
    await setTimeout(() => {
        console.log('i am finished with the queue');
    }, 2000);
    console.log('this is done with b');
}

function main(){
    b();
    a();
    a();
    a();
    a()
    a()
    console.log('main is done');
}
main();


//default parameters
/**
 * If we take a function in js with multiple params, what happens when we give it
 * the wrong number? if we add too many they are ignored, if we dont add enough they
 * will be undefined. there are several things we can do to alleviate this
 * 
 */

 function def(a=0,b='something'){
     console.log(a,b);
 }

 def();
 def(1);
 // so forth and so on


 //too many args?
 function rest(...stuff){
     console.log(stuff);
 }
 

 //have an array you want to put into another array

 let arr = [2,3,4];
 let arr2 = [5,6,7];
 let arr3 = [arr, arr2]
 console.log(arr3.length);
 // -> 2
 // because it is a two dimensional

let arr4 = [...arr, ...arr4];
console.log(arr4.length);
// -> 6
// spread operator spreads or unwraps the arrays


// go over short circuiting to lead into default and guard operators