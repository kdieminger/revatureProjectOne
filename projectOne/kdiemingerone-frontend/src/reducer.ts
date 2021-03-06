import * as Actions from './actions';
import { AppRequest, RFI } from './request/request';
import { User } from './user/user';

// Define the items that are in our state
export interface RequestState {
    requests: AppRequest[];
    request: AppRequest;
    RFIs: RFI[];
    rfi: RFI;
}
export interface UserState {
    user: User;
    users: User[];
    targetUser: User;
}
export interface AppState extends UserState, RequestState { }

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

const initialState: AppState = {
    user: new User(),
    users: [],
    targetUser: new User(),
    requests: [],
    request: new AppRequest(),
    RFIs: [],
    rfi: new RFI()
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)
    switch (action.type) {    
        case Actions.RequestActions.GetRequests:
            newState.requests = action.payload as AppRequest[];
            return newState;
        case Actions.RequestActions.ChangeRequest:
            newState.request = action.payload as AppRequest;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            return newState;
        case Actions.UserActions.GetUsers:
            newState.users = action.payload as User[];
            return newState;
        case Actions.RequestActions.SwitchRequests:
            newState.requests = action.payload as AppRequest[];
            return newState;
        case Actions.UserActions.ChangeTarget:
            newState.targetUser = action.payload as User; 
            return newState;
        case Actions.UserActions.ChangeUsers:
            newState.users = action.payload as User[];
            return newState;
        case Actions.RequestActions.ChangeRFIs:
            newState.RFIs = action.payload as RFI[];
            return newState;
        case Actions.RequestActions.ChangeRFI:
            newState.rfi = action.payload as RFI;
            return newState;
        default: 
            return state;
    }
}

export default reducer;