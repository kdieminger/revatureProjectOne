import {Restaurant} from './restaurant/restaurant';

export enum RestaurantActions {
    GetRestaurants = 'GET_RESTAURANTS',
    ChangeRestaurant = 'CHANGE_RESTAURANT'
}

// All of our restaurant actions need to follow this interface.
export interface RestaurantAction {
    type: RestaurantActions;
    payload: Restaurant | Restaurant[];
}

export function GetRestaurants(rests: Restaurant[]): RestaurantAction {
    const action: RestaurantAction = {
        type: RestaurantActions.GetRestaurants,
        payload: rests
    }
    return action;
}

export function GetRestaurant(rest: Restaurant): RestaurantAction {
    const action: RestaurantAction = {
        type: RestaurantActions.GetRestaurant,
        payload: rest
    }
    return action;
}