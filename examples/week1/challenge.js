var h = 3;
function bar() {
    console.log('bar h = ' + h);
    var h = 5;
    console.log('bar h = ' + h);
}
bar();
console.log(h);