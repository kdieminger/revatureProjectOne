import { inventory, itemString, restockItem } from '../src/inventory.js';

let testItem;

// Set up the environment before any test is run. This runs once.
beforeAll(() => {
    console.log('before all tests');
    inventory.splice(0, inventory.length);
});

// Tear down the environment after every test is run. This runs once.
afterAll(() => {
    console.log('after all tests');
    inventory.splice(0, inventory.length);
});

// Before each of my tests, set up the environment.
beforeEach(() => {
    console.log('before each test');
    testItem = {item: 'Snickers', price: 5, position: 'T56', stock: 5};
    inventory.push(testItem);
});

// Destroy everything we created after each test.
afterEach(() => {
    console.log('after each test');
    testItem = null;
    inventory.splice(0, inventory.length);
});

test('That the item string works with a real object', () => {
    console.log('snickers test');
    let str = 'T56. Snickers- $5';
    expect(itemString(testItem)).toBe(str);
});

test('That the item string works with an empty object', () => {
    console.log('null test');
    let obj = {};
    let str = 'undefined. undefined- $undefined';
    expect(itemString(obj)).toBe(str);
});

test('That stock of an item increases after restockItem', () => {
    console.log('restock test');
    expect(testItem.stock).toBe(5);
    restockItem('Snickers');
    expect(testItem.stock).toBe(6);
});