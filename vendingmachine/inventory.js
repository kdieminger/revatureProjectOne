let inventory = [
    { item: 'Gatorade', position: 'Z67', price: 5, 'stock': 5 },
    { item: 'Pepsi Zero', position: 'Z68', price: 5, 'stock': 5 },
    { item: 'Water', position: 'Z69', price: 8, 'stock': 5  },
    { item: 'Chocolate chips', position: 'A23', price: 2, 'stock': 5  },
    { item: 'Snickers', position: 'B37', price: 3, 'stock': 5  },
    { item: 'Chips', position: 'S7', price: 4, 'stock': 5  }
]

export function restockItem(itemName){
    let selection = inventory.find(item => item.item === itemName); // function(item){return item.item === itemName}
    selection.stock++;
}

export function getByPosition(position) {
    return inventory.find(item => item.position === position);
}

function itemString(item) {
    return item.position + '. ' + item.item + '- $' + item.price;
}

export function displayContents() {
    inventory.forEach((item) => {console.log(itemString(item))});
}