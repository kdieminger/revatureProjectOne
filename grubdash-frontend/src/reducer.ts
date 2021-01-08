import * as Actions from './actions';
import { Restaurant } from './restaurant/restaurant';

// Define the items that are in our state
export interface RestaurantState {
    // The list of all restaurants, loaded from the db.
    restaurants: Restaurant[];
    // The specific restaurant we have selected for view, edit, or add
    restaurant: Restaurant;
}
export interface UserState {

}
export interface AppState extends UserState, RestaurantState { }

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

const initialState: AppState = {
    restaurants: [],
    restaurant: new Restaurant()
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: AppState = initialState, action: Actions.RestaurantAction): AppState => {
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {    
        case Actions.RestaurantActions.GetRestaurants:
            newState.restaurants = action.payload as Restaurant[];
            return newState;
        case Actions.RestaurantActions.ChangeRestaurant:
            newState.restaurant = action.payload as Restaurant;
            return newState;
        default: 
            return state;
    }
}

export default reducer;