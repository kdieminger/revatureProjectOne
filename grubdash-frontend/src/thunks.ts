import {AppState} from './reducer';
import {AppAction, getRestaurants} from './actions';
import {ThunkAction} from 'redux-thunk';
import { Restaurant } from './restaurant/restaurant';
import restaurantService from './restaurant/restaurant.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetRestaurants = (): AppThunk => async dispatch => {
    const asyncResp = await restaurantService.getRestaurants();
    dispatch(getRestaurants(asyncResp));
}