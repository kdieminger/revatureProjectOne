# Thunks
A functional programming concept where we delay the execution of an asynchronous operation until such time as we are ready for it. By thunking an async call, we can prevent side-effects (such as delays) from occuring until such time as the application is ready to handle the result. In React we like to thunk async calls and send the thunks to the dispatcher so that the dispatcher can handle the request when it is ready to create an action.

Instead of handling the promises in our components, let's let the dispatcher handle our promises.

UnThunked Call
```JavaScript
function add(a,b) {
    return a+b;
}
console.log(add(2,2)); // 4
```

Thunked Call
```JavaScript
function thunkedAdd(a,b) {
    return function thunk() {
        return a+b;
    }
}

const thunk = thunkedAdd(2,2); // no action is performed

console.log(thunk()) //4
```

In React, if we add the `react-thunk` middleware to our store, if we send a thunk to our `dispatch` it will call the thunk for us when it is ready to process it.