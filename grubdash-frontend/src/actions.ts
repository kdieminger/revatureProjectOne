import {Restaurant} from './restaurant/restaurant';

export enum RestaurantActions {
    GetRestaurants = 'GET_RESTAURANTS',
    ChangeRestaurant = 'CHANGE_RESTAURANT'
}

export interface AppAction {
    type: string;
    payload: any;
}

// All of our restaurant actions need to follow this interface.
export interface RestaurantAction extends AppAction {
    type: RestaurantActions;
    payload: Restaurant | Restaurant[];
}

export function getRestaurants(rests: Restaurant[]): RestaurantAction {
    const action: RestaurantAction = {
        type: RestaurantActions.GetRestaurants,
        payload: rests
    }
    return action;
}

export function changeRestaurant(rest: Restaurant): RestaurantAction {
    const action: RestaurantAction = {
        type: RestaurantActions.ChangeRestaurant,
        payload: rest
    }
    return action;
}