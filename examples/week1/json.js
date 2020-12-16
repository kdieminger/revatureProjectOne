let string = `[
    { "item": "Gatorade", "position": "Z67", "price": 5, "stock": 5 },
    { "item": "Pepsi Zero", "position": "Z68", "price": 5, "stock": 5 },
    { "item": "Water", "position": "Z69", "price": 8, "stock": 5  },
    { "item": "Chocolate chips", "position": "A23", "price": 2, "stock": 5  },
    { "item": "Snickers", "position": "B37", "price": 3, "stock": 5  },
    { "item": "Chips", "position": "S7", "price": 4, "stock": 5  }
]`

let arr = JSON.parse(string);
console.log(arr);
console.log(arr[2]);

console.log(JSON.stringify(arr[3]))