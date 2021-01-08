import {Restaurant} from './restaurant/restaurant';
import {User} from './user/user';

export enum RestaurantActions {
    GetRestaurants = 'GET_RESTAURANTS',
    ChangeRestaurant = 'CHANGE_RESTAURANT'
}

export enum UserActions {
    GetUser = 'GET_USER'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
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

export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}