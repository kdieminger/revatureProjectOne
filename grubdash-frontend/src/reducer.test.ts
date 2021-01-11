import reducer, {AppState} from './reducer';
import { Restaurant } from './restaurant/restaurant';
import { User } from './user/user';
import {RestaurantActions} from './actions';
test('reducer clears restaurant after changeRestaurant action', ()=> {
    const initialRestaurants: Restaurant[] = [];
    const initialRestaurant = new Restaurant();
    initialRestaurant.name = 'test';
    const initialUser = new User();
    const initialState: AppState = {
        restaurants: initialRestaurants,
        restaurant: initialRestaurant,
        user: initialUser,
        loginUser: initialUser
    };
    const newRestaurant = new Restaurant();
    const action = {
        type: RestaurantActions.ChangeRestaurant,
        payload: newRestaurant
    }
    // if the action is invalid, the new state is the old state
    let newState = reducer(initialState, {type: '', payload: null});
    expect(newState).toBe(initialState);
    // new restaurant needs to be in the state returned.
    newState = reducer(initialState, action);
    expect(newState.restaurant).toBe(newRestaurant);
    // make sure the rest of the state is unchanged
    expect(newState.restaurants).toBe(initialRestaurants);
    expect(newState.user).toBe(initialUser);
})