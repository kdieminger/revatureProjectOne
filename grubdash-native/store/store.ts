import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { Restaurant } from "../restaurant/restaurant";
import { User } from "../user/user";
import { AppAction } from "./actions";
import reducer from "./reducer";



// Define the items that are in our state
export interface RestaurantState {
    // The list of all restaurants, loaded from the db.
    restaurants: Restaurant[];
    // The specific restaurant we have selected for view, edit, or add
    restaurant: Restaurant;
}
export interface UserState {
    user: User;
    loginUser: User;
}
export interface GrubState extends UserState, RestaurantState { }
// <> is generics: Generic arguments allow us to define the type of a thing at runtime instead of when we write it,
// creating a reusable object.
const store: Store<GrubState, AppAction> = createStore(reducer, applyMiddleware(thunk));

export default store;