import {AppState} from './reducer';
import {AppAction, getRequests} from './actions';
import {ThunkAction} from 'redux-thunk';
import userService from './user/user.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetRequests = (username: string): AppThunk => async dispatch => {
    const asyncResp = await userService.getReqByUsers(username);
    console.log('before thunk dispatch');
    dispatch(getRequests(asyncResp));
}