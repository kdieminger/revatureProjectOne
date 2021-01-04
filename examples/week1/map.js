let map = new Map();

console.log(map);

map.set(13, {name: 'Richard', title: 'trainer'});

console.log(map);

console.log(map.get(13));
//console.log(map[13]);


map.set('hello', 'goodbye');
console.log(map);
console.log(map.get('hello'))
//console.log(map.hello);
console.log(map.size);
for(let obj of map) {
    console.log(obj);
}