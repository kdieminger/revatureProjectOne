# REDUX
A state container for JavaScript Applications that implements the Flux Design Pattern
## Why?
* We are trying to implement Flux
* We want a single source of truth
* Our model is getting complicated
## Flux Design Pattern
Facebook designed React and they say that ideally your application would have a "single source of truth". i.e. one entity that manages the entire state of your application. They recommended that you accomplish this through state lifting. You lift the state of your lower-level components up into the parent components until all the state is in the parent.

Flux enables us to have a 'uni-directional data flow'. Data flows from the parent into the props of the children.

One-way Data binding: A component receives its data from somewhere and then binds it to the view. The component cannot directly change that data. (though can dispatch a change).

uni-directional flow: data flows from the store to the view to the dispatcher to the store.

### Dispatcher
In React, the dispatcher is a prop on a component that allows us to send an action to the store to be handled by a reducer.
#### Actions
An object with the key `type` that holds the payload of the dispatch.
### Stores
A JavaScript object hat contains the state of the application. The Store utilize a Reducer to update the state. The store should only be updated as part of a dispatch
#### Reducer
An object that can process the payload of a dispatch request. In Redux all dispatches are referred to as "Actions". The Reducer's job is the update the state according to what action was given to the dispatcher. Reducers must be "pure functions".

*petty rambling* Reducers are usually glorified switch statements. */petty rambling*
##### Pure Function
A function with no state that will always return the same result given the same inputs. No side-effects.

### Views
In React, the views are components. They should not store state. We'll not be utilizing the `useState` hook anymore.

## Setup
`npm install --save redux react-redux redux-thunk`
`npm install --save-dev @types/redux @types/react-redux @types/redux-thunk`