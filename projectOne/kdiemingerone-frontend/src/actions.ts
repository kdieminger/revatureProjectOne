import {Request} from './request/request';
import {User} from './user/user';

export enum RequestActions {
    GetRequests = 'GET_REQUESTS',
    ChangeRequest = 'CHANGE_REQUEST'
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
export interface RequestAction extends AppAction {
    type: RequestActions;
    payload: Request | Request[];
}

export function getRestaurants(rests: Request[]): RequestAction {
    const action: RequestAction = {
        type: RequestActions.GetRequests,
        payload: rests
    }
    return action;
}

export function changeRestaurant(rest: Request): RequestAction {
    const action: RequestAction = {
        type: RequestActions.ChangeRequest,
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