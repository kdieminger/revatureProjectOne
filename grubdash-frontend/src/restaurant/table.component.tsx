import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Restaurant } from './restaurant';
import restaurantService from './restaurant.service';
import RestRow from './rest-row';
import {RestaurantState} from '../reducer'
import { getRestaurants } from '../actions';

function groupIntoThrees(restaurants: Restaurant[]): Restaurant[][] {
    let arr: Restaurant[][] = [];
    for (let i = 0; i < restaurants.length / 3; i++) {
        arr.push(restaurants.slice(i * 3, (i + 1) * 3));
    }

    return arr;
}
export default function TableComponent() {
    // Create a constant that is of the type of state.restaurants
    const selectRestaurant = (state: RestaurantState) => state.restaurants;
    // Retrieve the restaurants array from redux.
    const restaurants = useSelector(selectRestaurant);
    // Get access to the dispatcher. Feed the dispatcher Actions for your Reducer.
    const dispatch = useDispatch();

    useEffect(() => {
        restaurantService.getRestaurants().then((data) => {
            dispatch(getRestaurants(data));
        });
    }, []);

    return (
        <section className='restaurants container' id='restaurants'>
            {groupIntoThrees(restaurants).map((value, index: number) => {
                return (
                    <RestRow
                        key={'rest-row-' + index}
                        restaurants={value}
                    ></RestRow>
                );
            })}
        </section>
    );
}
