let arr = [{name: 'Richard', years: 4}, {name: 'Adam', years: 3}]
arr.forEach( function(element) {
    element.years++;
});
console.log(arr);


const arr2 = [1, 2, 4]; // what's being stored in arr2 is the location of the array
arr2.pop();
console.log(arr2);
//arr2 = []; // won't let us reassign