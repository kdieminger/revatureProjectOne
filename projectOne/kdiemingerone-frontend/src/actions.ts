import {Request} from './request/request';
import {User} from './user/user';

export enum RequestActions {
    GetRequests = 'GET_REQUESTS',
    ChangeRequest = 'CHANGE_REQUEST'
}

export enum UserActions {
    GetUser = 'GET_USER',
    GetUsers = 'GET_USERS',
    ChangeUser = 'CHANGE_USER'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User | User[] | string[];
}

// All of our restaurant actions need to follow this interface.
export interface RequestAction extends AppAction {
    type: RequestActions;
    payload: Request | Request[];
}

export function getRequests(reqs: Request[]): RequestAction {
    const action: RequestAction = {
        type: RequestActions.GetRequests,
        payload: reqs
    }
    return action;
}

export function changeRequest(req: Request): RequestAction {
    const action: RequestAction = {
        type: RequestActions.ChangeRequest,
        payload: req
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

export function getUsers(users: string[]): UserAction {
    const action: UserAction = {
        type: UserActions.GetUsers,
        payload: users
    }
    return action;
}

export function changeUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.ChangeUser,
        payload: user
    }
    return action;
}