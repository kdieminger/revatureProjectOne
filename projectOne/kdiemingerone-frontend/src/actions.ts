import {AppRequest} from './request/request';
import {User} from './user/user';
import userService from './user/user.service';

export enum RequestActions {
    GetRequests = 'GET_REQUESTS',
    ChangeRequest = 'CHANGE_REQUEST',
    SwitchRequests = 'SWITCH_REQUESTS'
}


export enum UserActions {
    GetUser = 'GET_USER',
    GetUsers = 'GET_USERS',
    ChangeTarget = 'CHANGE_TARGET',
    ChangeUsers = "CHANGE_USERS"
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
    payload: AppRequest | AppRequest[];
}

export function getRequests(reqs: AppRequest[]): RequestAction {
    const action: RequestAction = {
        type: RequestActions.GetRequests,
        payload: reqs
    }
    return action;
}

export function changeRequest(req: AppRequest): RequestAction {
    const action: RequestAction = {
        type: RequestActions.ChangeRequest,
        payload: req
    }
    return action;
}

export function SwitchRequests(req: AppRequest[]): RequestAction {
    const action: RequestAction = {
        type: RequestActions.SwitchRequests,
        payload: req
    }
    return action;
}

export function AsyncRequests(username: string) {
    return (dispatch:any, getState:any) => {
        userService.getReqByUsers(username).then((response) => {
            dispatch(SwitchRequests(response));
        })
    }
}

export function GetUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function getUsers(users: User[]): UserAction {
    const action: UserAction = {
        type: UserActions.GetUsers,
        payload: users
    }
    return action;
}

export function changeTarget(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.ChangeTarget,
        payload: user
    }
    return action;
}

export function changeUsers(users: User[]): UserAction {
    const action: UserAction = {
        type: UserActions.ChangeUsers,
        payload: users
    }
    return action;
}