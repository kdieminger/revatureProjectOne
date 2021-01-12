import * as Actions from './actions';
import { Request } from './request/request';
import { User } from './user/user';

// Define the items that are in our state
export interface RequestState {
    // The list of all restaurants, loaded from the db.
    requests: Request[];
    // The specific restaurant we have selected for view, edit, or add
    request: Request;
}
export interface UserState {
    user: User;
    users: string[];
}
export interface AppState extends UserState, RequestState { }

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

const initialState: AppState = {
    user: new User(),
    users: [],
    requests: [],
    request: new Request()
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {    
        case Actions.RequestActions.GetRequests:
            newState.requests = action.payload as Request[];
            return newState;
        case Actions.RequestActions.ChangeRequest:
            newState.request = action.payload as Request;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            return newState;
        case Actions.UserActions.GetUsers:
            newState.users = action.payload as string[];
            return newState;
        default: 
            return state;
    }
}

export default reducer;